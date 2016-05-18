//加载模块
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var logger = require('./logger');


// MongoDB地址，数据库mongoExp如果不存在则自动创建
var url = 'mongodb://localhost:27017/mongoExp';
// 连接数据库

var database;

var init = function (callback) {
    if (database) {
        MongoClient.connect(url, function (err, db) {
            if (err) callback(err)
            logger.log('数据库连接成功');
            database = db;
        });
    }

    callback;
}

exports.test = function () {
    logger.log('okk');
    init((err) => {
        if (err) throw err;
        logger.log(database);
    });
}

