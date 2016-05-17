var Twit = require('twit')
var fs = require("fs");
var config = require('./config');

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

twit.get('search/tweets', { q: '蔡英文 since:2011-07-11', count: 1, lang: 'zh', include_entities: false }, function (err, data, response) {

    console.log(data.statuses[0].user);
   
   
    // console.log(data);

});