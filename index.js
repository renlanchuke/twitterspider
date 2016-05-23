var Twit = require('twit')
var fs = require("fs");
var config = require('./config');
var mongo = require('./mongoDB');
var logger = require('./logger');

// var T = new Twit({
//     consumer_key: ,
//     consumer_secret: ,
//     access_token: ,
//     access_token_secret: ,
//     timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
// });

//application-only
var twit = new Twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    app_only_auth: true,
    timeout_ms: 6 * 1000,  // optional HTTP request timeout to apply to all requests.
});

//
//  tweet 'hello world!'
//
// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// })

var options = {
    q: '蔡英文',
    lang: 'zh',
    since: '2016-1-14',
    until: '2016-1-16'
}

var query = 'https://twitter.com/i/search/timeline?vertical=default&' +
    'q=%E8%94%A1%E8%8B%B1%E6%96%87%20lang%3Azh%20since%3A2016-01-14%20until%3A2016-01-17&src=typd'

// console.log(decodeURI(query));
var encodedurl = handleUrl(options);
console.log(encodedurl);
/*****************
mongo.init((err) => {
    if (err) throw err;

    twit.get('search/tweets', options, function (err, data, response) {
        if (err) throw err;
        // var nextURL = data.search_metadata.next_results;
        // var maxID = nextURL.substring(nextURL.indexOf('=') + 1, nextURL.indexOf('&'));
        // mongo.insertMany('collects', data.statuses)

        console.log(data.statuses);

        // console.log(maxID);

        console.log(data.search_metadata);
        // console.log(response);

        // console.log(data);
        mongo.stop();
    });
});
*********************/

function handleUrl(query) {
    var urlString = new String();
    for (var key in query) {
        if (urlString.length != 0) {
            urlString = urlString + ' ';
        }

        if (key == 'q') {
            urlString = query[key];
        } else {
            urlString = urlString + key + ":" + query[key];
        }


        // console.log(urlString);
    }
    return 'q=' + encodeURIComponent(urlString)
}