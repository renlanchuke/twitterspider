//加载模块
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var logger = require('./logger');


// MongoDB地址，数据库mongoExp如果不存在则自动创建
var url = 'mongodb://localhost:27017/mongoExp';
// 连接数据库

var database;

var init = function (callback) {

    if (database) database.close();
    MongoClient.connect(url, function (err, db) {
        if (err) callback(err)
        logger.log('数据库连接成功');
        database = db;
        callback();
    });

}

exports.insertMany = function (collection, data, callback) {
    database.collection(collection).insertMany(data, function (err, r) {
        if (typeof callbaack == 'function') {
            callback(err);
        } else {
            assert.equal(null, err);
        }

        callback(null, r);
    });
}

exports.insertOne = function (collection, data, callback) {
    database.collection(collection).insertOne(data, function (err, r) {
        if (typeof callbaack == 'function') {
            callback(err);
        } else {
            assert.equal(null, err);
        }

        callback(null, r);
    });
}

exports.findAll = function (collection, filter, callbaack) {
    if (!filter) filter = {};
    database.collection(collection).find(filter).toArray(function (err, docs) {
        if (typeof callbaack == 'function') {
            callback(err);
        } else {
            assert.equal(null, err);
        }
        
        callbaack(null,docs);
    });
}


exports.test = function () {
    logger.log('okk');
    init((err) => {
        if (err) throw err;

        database.close();
        console.log(database);
    });
}

