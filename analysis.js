var mongo = require('./mongoDB');
var logger = require('./logger');
var common = require('./common');
var fs = require('fs');
var json2csv = require('json2csv');


// saveJson();
saveJson2csv();
function test() {
    mongo.init(function (err) {
        if (err) throw err;
        mongo.findAll('twitter_one', {}, (err, docs) => {
            if (err) throw err;
            var length = docs.length;
            console.log('docs length: ', length);
            console.log('first id: ', docs[3381].twitter_id);

            mongo.findAll('twitterColl', {}, (err, docs) => {
                if (err) throw err;
                var length = docs.length;
                console.log('docs length: ', length);
                console.log('first id: ', docs[3381].created_at);

                common.saveJson('json.txt', docs[3380], null);
                console.log(typeof docs[3381].created_at);
                var createDate = new Date(docs[3381].created_at);
                console.log(createDate.getDate());
                mongo.stop();
            });
        });
    });
}

//save data in twitters.json
function saveJson() {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll('twitterColl', {}, (err, docs) => {
            if (err) throw err;

            var jsonSimp = new Array();

            docs.forEach(function (element) {
                jsonSimp.push(
                    {
                        'id': element.id_str,
                        'created_date': element.created_at,
                        'text': element.text,
                        'retweet_count': element.retweet_count,
                        'retweeted': element.retweeted
                    }
                );
            }, this);

            common.saveJsonArray('twitters.json', jsonSimp, (err) => {
                if (err) throw err;
            });

            mongo.stop();
        });

    });
}

function saveJson2csv() {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll('twitters_1214_1222', {}, (err, docs) => {
            if (err) throw err;

            var jsonSimp = new Array();

            docs.forEach(function (element) {
                jsonSimp.push(
                    {
                        'user': element.userName,
                        'text': element.content,
                        'date': element.time
                    }
                );
            }, this);

            var fields = ['user','text','date'];
            common.saveJson2csv('twitters_1214_1221.csv', jsonSimp, fields, (err) => {
                if (err) throw err;
            });

            mongo.stop();
        });

    });
}




