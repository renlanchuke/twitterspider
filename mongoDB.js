//加载模块
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var logger = require('./logger');


// MongoDB地址，数据库mongoExp如果不存在则自动创建
var url = 'mongodb://localhost:27017/mongoExp';
// 连接数据库

var database;

//初始化，创建连接
var init = function (callback) {

    if (database) database.close();
    MongoClient.connect(url, function (err, db) {
        if (err) callback(err)
        logger.log('数据库连接成功');
        database = db;
        callback();
    });

}

//插入多条数据
exports.insertMany = function (collection, data, callback) {
    database.collection(collection).insertMany(data, function (err, r) {
        if (err) {
            if (typeof callback == 'function') {
                callback(err);
            } else {
                assert.equal(null, err);
            }
        }
        callback(null, r);
    });
}

//插入一条document
exports.insertOne = function (collection, data, callback) {
    database.collection(collection).insertOne(data, function (err, r) {
        if (err) {
            if (typeof callback == 'function') {
                callback(err);
            } else {
                assert.equal(null, err);
            }
        }


        callback(null, r);
    });
}

//读取数据
exports.findAll = function (collection, filter, callback) {
    if (!filter) filter = {};
    database.collection(collection).find(filter).toArray(function (err, docs) {
        if (err) {
            if (typeof callback == 'function') {
                callback(err);
            } else {
                assert.equal(null, err);
            }
        }

        callback(null, docs);
    });
}

//修改数据单一数据
exports.updateOne = function (collection, filter, set, callback) {
    if (!filter) filter = {};
    database.collection(collection).updateOne(filter, { $set: set }, (err, result) => {
        if (err) {
            if (typeof callback == 'function') {
                callback(err);
            } else {
                assert.equal(null, err);
            }
        }
        callback(null, result,filter,set);
    });
}

//修改多条数据
exports.updateMany = function (collection, filter, set, callback) {
    if (!filter) filter = {};
    database.collection(collection).updateMany(filter, { $set: set }, (err, result) => {
        if (err) {
            if (typeof callback == 'function') {
                callback(err);
            } else {
                assert.equal(null, err);
            }
        }
        callback(null, result,filter,set);
    });
};

//关闭数据库
exports.stop = function () {
    database.close();
    logger.log('数据库已关闭');
};

exports.init = init;



