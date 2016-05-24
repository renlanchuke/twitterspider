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

/****
 * @IdCollection 读取id的collection
 * @twitterCollection 将获取的twitter信息保存到此collection
 * *********** */
var IdCollection;
var twitterCollection;
exports.getTwitter = function (IdColl, twitterColl) {
    IdCollection = IdColl;
    twitterCollection = twitterColl;
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(IdCollection, { download: false }, (err, docs) => {
            if (err) throw err;
            var length = docs.length;
            console.log('docs length: ', length);
            var firstCursor = cursor.getCursor();
            getTwitter(firstCursor, docs, length);
            // console.log(docs);
        });
    });
}

function getTwitter(cur, docs, len) {
    if (cur < len) {
        var id = docs[cur].twitter_id;
        twit.get('statuses/show/:id', { id: id }, function (err, data, response) {

            if (err) {
                logger.log(err);
                setTimeout(function () {
                    getTwitter(cur, docs, len);
                }, 10000);

            } else {
                mongo.insertOne(twitterCollection, data, (err, result) => {
                    if (err) throw err;
                    mongo.updateOne(IdCollection,
                        { "twitter_id": id },
                        { "download": true },
                        (err, result, filter) => {
                            if (err) throw err;
                            console.log('成功获取第' + cur + '条数据');
                        });
                });
                var nextCursor = cursor.getCursor();
                getTwitter(nextCursor, docs, len);
            }
        });
    }
}

function GetCursor() {
    this._cursor = -1;
    this.getCursor = function () {
        this._cursor++;
        return this._cursor;
    }
}