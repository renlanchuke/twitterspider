var common = require('./common');
var mongo = require('./mongoDB');
var cheerio = require('cheerio');
var logger = require('./logger');

var last_note_ts = 1463307756;
var max_position = 'max_position=TWEET-688517798804496384-688520937892929536-BD1UO2FFu9QAAAAAAAAETAAAAAcAAAASAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
var URL = 'https://twitter.com/i/search/timeline?vertical=default&' +
    'q=%E8%94%A1%E8%8B%B1%E6%96%87%20lang%3Azh%20since%3A2016-01-14%20until%3A2016-01-17&src=typd&' +
    'include_available_features=1&include_entities=1&last_note_ts=' + last_note_ts + '&' + max_position +
    '&reset_error_state=false';

var query = 'https://twitter.com/i/search/timeline?vertical=default&' +
    'q=%E8%94%A1%E8%8B%B1%E6%96%87%20lang%3Azh%20since%3A2016-01-14%20until%3A2016-01-17&src=typd&' +
    'include_available_features=1&include_entities=1&last_note_ts=';
var lpara = '&reset_error_state=false';


mongo.init((err) => {
    if (err) throw err;
    gettwitterid(last_note_ts, max_position);

});

function gettwitterid(lastNoteTS, maxPosition) {
    var currURL = query + lastNoteTS + '&' + maxPosition + '&' + lpara;
    common.get(currURL, null, (err, data) => {
        if (err) throw err;
        var json = JSON.parse(data);
        if (json.new_latent_count < 1 || json.new_latent_count==undefined){
            logger.log("获取用户ID结束");
            return;
        }
            
        var twitterIDArray = new Array();
        var $ = cheerio.load(json.items_html, { decodeEntities: false });
        var cards = $('.js-original-tweet');

        cards.each(function (i) {
            var id = $(this).data('tweet-id');
            twitterIDArray.push({ twitter_id: id, download: false });
        }),
            mongo.insertMany('twitter_id_three', twitterIDArray, (err, result) => {
                logger.log('成功插入' + result.insertedCount + '条数据');
            });
        // console.log(twitterIDArray)
        var currLastNoteTS = lastNoteTS + 4;
        var currMaxPosition = 'max_position=' + json.min_position;
        // console.log(currLastNoteTS);
        // console.log(currMaxPosition);
        gettwitterid(currLastNoteTS, currMaxPosition);
    });
}
