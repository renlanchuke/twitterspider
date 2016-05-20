var mongo = require('./mongoDB');

/********
 * 数据库测试
 * ********/

var data = [
    {
        name: '12312',
        grade: '12'
    }, {
        name: '张三',
        grade: '88'
    }
]

mongo.init(function (err) {
    if (err) throw err;

    mongo.insertMany('students', data, (err, result) => {
        if (err) throw err;
        console.log('成功插入数据：',result.insertedCount);
        mongo.findAll('students', null, (err, docs) => {
            if (err) throw err;
            console.log(docs);
            mongo.stop();
        });
    });
});

// 'https://twitter.com/i/search/timeline?vertical=news&q=蔡英文 since:2016-01-14 until:2016-01-16&src=typd&composed_count=0&include_available_features=1&include_entities=1&include_new_items_bar=true&interval=30000&last_note_ts=1463306923&latent_count=0&min_position=TWEET-688143122870571008-688148609301229568-BD1UO2FFu9QAAAAAAAAETAAAAAcAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'