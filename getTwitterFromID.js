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

var cursor = new GetCursor();
mongo.init(function (err) {
    if (err) throw err;

    mongo.findAll('twitterID', { download: false }, (err, docs) => {
        if (err) throw err;
        var length = docs.length;
        console.log('docs length: ', length);
        while (length--) {
            var nextCursor = cursor.getCursor();
            mongo.updateOne('twitterID', 
            {"twitter_id": docs[nextCursor].twitter_id}, 
            {"download": true }, 
            (err, result,filter) => {
                if (err) throw err;
                console.log('修改数据成功 ',filter);
            });
            console.log(docs[nextCursor]);
            console.log(nextCursor);
            if (nextCursor > 10)
                break;
        }
        // console.log(docs);

    });
});



function GetCursor() {
    this._cursor = -1;
    this.getCursor = function () {
        this._cursor++;
        return this._cursor;
    }
}