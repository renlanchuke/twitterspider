var mongo = require('./mongoDB');
var logger = require('./logger');
var common = require('./common');
var fs = require('fs');
var json2csv = require('json2csv');

// mongo.init(function (err) {
//     if (err) throw err;

//     mongo.findAll('twitter_id_second', {}, (err, docs) => {
//         if (err) throw err;
//         var length = docs.length;
//         console.log('docs length: ', length);
//         console.log('first id: ', docs[3381].twitter_id);

//         mongo.findAll('twitterColl', {}, (err, docs) => {
//             if (err) throw err;
//             var length = docs.length;
//             console.log('docs length: ', length);
//             console.log('first id: ', docs[3381].created_at);

//             common.saveJson('json.txt', docs[3380], null);
//             // console.log(typeof docs[3381].created_at);
//             // var createDate = new Date(docs[3381].created_at);
//             // console.log(createDate.getDate());
//             mongo.stop();
//         });
//     });
// });

//save data in twitters.json

// mongo.init(function (err) {
//     if (err) throw err;

//     mongo.findAll('twitterColl', {}, (err, docs) => {
//         if (err) throw err;

//         var jsonSimp = new Array();

//         docs.forEach(function (element) {
//             jsonSimp.push(
//                 {
//                     'id': element.id_str,
//                     'created_date': element.created_at,
//                     'text': element.text,
//                     'retweet_count': element.retweet_count,
//                     'retweeted': element.retweeted
//                 }
//             );
//         }, this);

//         common.saveJsonArray('twitters.json', jsonSimp, (err) => {
//             if (err) throw err;
//         });

//         mongo.stop();
//     });

// });

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

        var fields = ['id', 'created_date', 'retweet_count', 'retweeted', 'text']
        common.saveJson2csv('twitters.csv', jsonSimp, fields, (err) => {
            if (err) throw err;
        });

        mongo.stop();
    });

});



