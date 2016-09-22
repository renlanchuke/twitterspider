var common = require('./common');
var mongo = require('./mongoDB');
var cheerio = require('cheerio');
var logger = require('./logger');

var last_note_ts = 1463307756;

var queryOptions = {
    q: '蔡英文',
    lang: 'zh',
    since: '2016-01-07',
    until: '2016-01-16'
}

var max_position = 'max_position=TWEET-688139954212372484-688148609301229568-BD1UO2FFu9QAAAAAAAAETAAAAAcAAAASAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// var URL = 'https://twitter.com/i/search/timeline?vertical=default&' +
//     'q=%E8%94%A1%E8%8B%B1%E6%96%87%20lang%3Azh%20since%3A2016-01-14%20until%3A2016-01-17&src=typd&' +
//     'include_available_features=1&include_entities=1&last_note_ts=' + last_note_ts + '&' + max_position +
//     '&reset_error_state=false';

var query = 'https://twitter.com/i/search/timeline?vertical=default&' +
    handleQuery(queryOptions) + '&src=typd&' +
    'include_available_features=1&include_entities=1&last_note_ts=';
var lpara = '&reset_error_state=false';

//mongodb数据库collection，存放抓取的twitter Id
var IdCollection;

exports.getTwitterId = function (collection) {
    IdCollection = collection;
    mongo.init((err) => {
        if (err) throw err;
        gettwitterid(last_note_ts, max_position);

    });
}

//递归求search twitter信息
function gettwitterid(lastNoteTS, maxPosition) {
    var currURL = query + lastNoteTS + '&' + maxPosition + '&' + lpara;
    common.get(currURL, null, (err, data) => {
        if (err) throw err;
        var json = JSON.parse(data);
        if (json.new_latent_count < 1 || json.new_latent_count == undefined) {
            logger.log("获取用户ID结束");
            return;
        }

        var twitterIDArray = new Array();
        var $ = cheerio.load(json.items_html, { decodeEntities: false });
        var cards = $('.js-original-tweet');

        cards.each(function (i) {
            //console.log($(this).html());
            var id = $(this).data('tweet-id');
            //new attribute
            var userID = $(this).data('user-id');
            var userName = $(this).data('name');
            //var time=$(this).find('.time').text();
            var time_ms = $(this).find('._timestamp').data('time-ms');


            var time = new Date(time_ms);
            //console.log(time);
            //var content=$(this).children('.content').children('.js-tweet-text-container').text();
            var content = $(this).find('.js-tweet-text-container').text();


            content = content.trim();
            var record = {
                id: id,
                time: time,
                userID: userID,
                userName: userName,
                content: content,
                tag:false
            };

            //console.log(record);


            twitterIDArray.push(record);
        }),
            mongo.insertMany(IdCollection, twitterIDArray, (err, result) => {
                logger.log('成功插入' + result.insertedCount + '条数据');
            });

        var currLastNoteTS = lastNoteTS + 4;
        var currMaxPosition = 'max_position=' + json.min_position;

        //请求下一条记录
        gettwitterid(currLastNoteTS, currMaxPosition);
    });
}

//搜索信息编码成url
function handleQuery(query) {
    var urlString = new String();
    for (var key in query) {
        if (urlString.length !== 0) {
            urlString = urlString + ' ';
        }

        if (key == 'q') {
            urlString = query[key];
        } else {
            urlString = urlString + key + ":" + query[key];
        }

    }
    return 'q=' + encodeURIComponent(urlString)
}