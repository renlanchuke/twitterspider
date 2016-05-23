var mongo = require('./mongoDB');
var logger = require('./logger');
var common=require('./common');

mongo.init(function (err) {
    if (err) throw err;

    mongo.findAll('twitter_id_second', {}, (err, docs) => {
        if (err) throw err;
        var length = docs.length;
        console.log('docs length: ', length);
        console.log('first id: ', docs[3381].twitter_id);

        mongo.findAll('twitterColl', {}, (err, docs) => {
            if (err) throw err;
            var length = docs.length;
            console.log('docs length: ', length);
            console.log('first id: ', docs[3381].created_at);
            
            common.saveJson('json.txt',docs[3380],null);
            // console.log(typeof docs[3381].created_at);
            // var createDate = new Date(docs[3381].created_at);
            // console.log(createDate.getDate());
            mongo.stop();
        });
    });
});
