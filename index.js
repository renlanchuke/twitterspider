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
    count: 10,
    //  since: '2016-1-14',
    //  until: '2016-1-16',
    lang: 'zh',
    max_id:688143122870571008,
    include_entities: true
}

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
//688510937892929536
//688507798804496384
twit.get('statuses/show/:id', { id: '688490957004746753' }, function (err, data, response) {
  console.log(data)
})
