//加载模块
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// MongoDB地址，数据库mongoExp如果不存在则自动创建
var url = 'mongodb://localhost:27017/mongoExp';
// 连接数据库

var mongo = function (data, recall) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(err, null);
        console.log("连接成功！");
        // 获取集合，如果集合不存在则创建集合
        var collection = db.collection("students");
        // 插入一条数据
        collection.insertOne(data, function (err, result) {
            if (err) {
                recall(err);
            }
            console.log("插入记录成功");
            // 查找集合信息
            // collection.find({}).toArray(function (err, docs) {
            //     if (err) {
            //         recall(err);
            //     }
            //     console.log("找到:");
            //     console.log(docs);
            //     db.dropCollection("students", function (err, result) {
            //         if (err) {
            //             recall(err);
            //         }
            //         console.log("删除成功");
            //         collection.find({}).toArray(function (err, docs) {
            //             if (err) {
            //                 recall(err);
            //             }
            //             console.log("找到:");
            //             console.log(docs);
            //             // 关闭数据库
            //             db.close();
            //         });
            //     });
            // });

            db.close();
        });
    });
}

module.exports = mongo;
