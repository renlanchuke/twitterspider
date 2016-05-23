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

var cursor = new GetCursor();
mongo.init(function (err) {
    if (err) throw err;

    // mongo.insertMany('students', data, (err, result) => {
    //     if (err) throw err;
    //     console.log('成功插入数据：', result.insertedCount);
    //     mongo.findAll('students', null, (err, docs) => {
    //         if (err) throw err;
    //         var length = docs.length;
    //         console.log('docs length: ',length);
    //         while (length--) {
    //             var nextCursor = cursor.getCursor();
    //             console.log(docs[nextCursor]);
    //         }
    //         console.log(docs);
    //         mongo.stop();
    //     });
    // });

    //test updateMany
    mongo.updateMany('twitter_id_second', { 'download': true }, { 'download': false }, (err, result) => {
        console.log(result.matchedCount);
        console.log(result.modifiedCount);
        mongo.stop();
    })
});


function GetCursor() {
    this._cursor = -1;
    this.getCursor = function () {
        this._cursor++;
        return this._cursor;
    }
}