var mongo = require('./mongoDB');
var logger = require('./logger');
var common = require('./common');
var fs = require('fs');
var json2csv = require('json2csv');


// saveJson();
//saveJson2csv("twitters_byday", "twittes_1017");
//filterTwitter("twitters_byday", "twitters_filter");
twitter_saveJson2csv('twitters_api_all', 'twitters_api_all')
//twitter_usercsv('twitters_api', 'user_info')

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

//analysis users of twitter
function twitter_usercsv(collName, fileName) {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(collName, {}, (err, docs) => {
            if (err) throw err;

            var newDocs = new Array();
            var jsonSimp = new Array();
            var temArray = new Array();
            var fields = ['id', 'name', 'location', 'followers_count', 'friends_count', 'listed_count',
                'created_at', 'favourites_count', 'time_zone', 'verified', 'statuses_count', 'twitters_count'];

            //filters docs
            for (i in docs) {
                docs[i].text = docs[i].text.replace(/http(s){0,1}:\/\/[a-zA-Z0-9\-.]+(?::(\d+))?(?:(?:\/[a-zA-Z0-9\-._?,'+\&%$=~*!():@\\]*)+)?/g, "");
                if (docs[i].text.length >= 60 && docs[i].retweeted == false) (
                    newDocs.push(docs[i])
                )

            }
            console.log(newDocs.length);

            newDocs.forEach(function (element) {
                if (temArray.indexOf(element.user.id) == -1) {
                    temArray.push(element.user.id)
                    var twits_count = 0;
                    for (index in docs) {
                        if (element.user.id == docs[index].user.id)
                            twits_count++;
                    }
                    jsonSimp.push(
                        {
                            'id': element.user.id,
                            'name': element.user.name,
                            'location': element.user.location,
                            'followers_count': element.user.followers_count,
                            'friends_count': element.user.friends_count,
                            'listed_count': element.user.listed_count,
                            'created_at': element.user.created_at,
                            'favourites_count': element.user.favourites_count,
                            'time_zone': element.user.time_zone,
                            'verified': element.user.verified,
                            'statuses_count': element.user.statuses_count,
                            'twitters_count': twits_count
                        }
                    );
                }

            }, this);

            common.saveJson2csv(fileName + '.csv', jsonSimp, fields, (err) => {
                if (err) throw err;
            });

            mongo.stop();
        });

    });
}

function twitter_saveJson2csv(collName, fileName) {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(collName, {}, (err, docs) => {
            if (err) throw err;

            var jsonSimp = new Array();
            var temArray = new Array();
            var fields = ['user_id', 'name', 'location', 'followers_count', 'friends_count', 'listed_count',
                'created_at', 'favourites_count', 'time_zone', 'verified', 'statuses_count', 'twitters_count',
                'date', 'text', 'retweeted', 'retweet_count', 'urls'];
            docs.forEach(function (element) {
                var twits_count = 0;
                for (index in docs) {
                    if (element.user.id == docs[index].user.id)
                        twits_count++;
                }
                jsonSimp.push(
                    {
                        'user_id': element.user.id,
                        'name': element.user.name,
                        'location': element.user.location,
                        'followers_count': element.user.followers_count,
                        'friends_count': element.user.friends_count,
                        'listed_count': element.user.listed_count,
                        'created_at': element.user.created_at,
                        'favourites_count': element.user.favourites_count,
                        'time_zone': element.user.time_zone,
                        'verified': element.user.verified,
                        'statuses_count': element.user.statuses_count,
                        'twitters_count': twits_count,
                        'date': new Date(element.created_at).format('yyyy-MM-dd'),
                        'text': element.text,
                        'retweeted': element.retweeted,
                        'retweet_count': element.retweet_count,
                        'urls': element.entities.urls
                    }
                );
            }, this);


            //按日期排序
            var index = [];
            for (i in jsonSimp) {
                index[i] = new String(jsonSimp[i].date);
                index[i]._obj = jsonSimp[i]

            }
            index.sort()
            var jsonSimpSorted = [];
            for (i in index) {
                index[i]._obj.text = index[i]._obj.text.replace(/http(s){0,1}:\/\/[a-zA-Z0-9\-.]+(?::(\d+))?(?:(?:\/[a-zA-Z0-9\-._?,'+\&%$=~*!():@\\]*)+)?/g, "");
                // if (index[i]._obj.text.length >= 60 && index[i]._obj.retweeted == false) (
                //     jsonSimpSorted.push(index[i]._obj)
                // )
                jsonSimpSorted.push(index[i]._obj)
            }



            common.saveJson2csv(fileName + '.csv', jsonSimpSorted, fields, (err) => {
                if (err) throw err;
            });

            //get user information

            mongo.stop();
        });

    });
}


function saveJson2csv(collection, fileName) {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(collection, {}, (err, docs) => {
            if (err) throw err;

            // var jsonSimp = new Array();

            // docs.forEach(function (element) {
            //     jsonSimp.push(
            //         {
            //             'user': element.userName,
            //             'text': element.content,
            //             'date': element.time
            //         }
            //     );
            // }, this);
            var fields = [];
            for (property in docs[0]) {
                fields.push(property)
            }

            common.saveJson2csv(fileName + '.csv', docs, fields, (err) => {
                if (err) throw err;
            });

            mongo.stop();
        });

    });
}


//筛除用户是新闻机构的twitter
function filterTwitter(collection, collection2) {
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(collection, {}, (err, docs) => {
            if (err) throw err;

            var fields = [];
            for (property in docs[0]) {
                fields.push(property)
            }
            var filterDocs = [];

            for (var index in docs) {
                if (!/新聞|新闻|報|網|网|媒體|之聲|觀察|中文网|週刊|中國|電台|中国|论坛|电台|黨|视频|社/.test(docs[index].userName)) {
                    // console.log(docs[index]);
                    filterDocs.push(docs[index]);
                } else {

                }

            }

            // common.saveJson2csv(fileName + '.csv', filterDocs, fields, (err) => {
            //     if (err) throw err;
            // });

            mongo.insertMany(collection2, filterDocs, (err, result) => {
                if (err) throw err;
                logger.log('成功插入' + result.insertedCount + '条数据');
                mongo.stop();
            });

        });

    });
}




