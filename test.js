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