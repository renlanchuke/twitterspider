var fs = require('fs');
var http = require("http");
var request = require('request');
var zlib = require('zlib');
var config = require("./config");
var logger = require("./logger");
var self = require('./common');



//////////////////网络访问部分

var maxretry = 3;//请求如果出错的话，最大重试次数

//使用cookie访问页面
exports.get = function (url, cookie, callback, retry) {
    if (!retry) retry = 0;
    var headers = {
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Accept-Language': 'zh-CN',
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip,deflate',
        'auth_token': '778DF829AAD63C67ED4CC77F63B0B4E5DA8064FA'
    };

    request({
        url: url,
        headers: headers,
        timeout: 15000,
        encoding: null
    },
        function (error, response, data) {
            // console.log("error: "+error);
            if (!error && response.statusCode == 200) {

                var buffer = new Buffer(data);
                var encoding = response.headers['content-encoding'];
                if (encoding == 'gzip') {
                    zlib.gunzip(buffer, function (err, decoded) {
                        //console.log("err: "+ err);
                        callback(err && ('unzip error' + err), decoded && decoded.toString());
                    });
                } else if (encoding == 'deflate') {
                    zlib.inflate(buffer, function (err, decoded) {
                        callback(err && ('deflate error' + err), decoded && decoded.toString());
                    })
                } else {

                    callback(null, buffer.toString());
                }
            }
            else {
                //小于错误次数则重试
                if (retry < maxretry) {
                    logger.log("retry getting url : " + url);
                    setTimeout(function () {
                        self.get(url, cookie, callback, retry + 1);
                    }, 3000);

                }
                else
                    callback(error || response.statusCode);
            }
        });
}

//时间格式化输出
exports.getDateString = function (date) {
    if (!date) {
        date = new Date();
    }

    var year = date.getFullYear().toString();
    var month = date.getMonth().toString();
    var day = date.getDate().toString();

    return year + '.' + month + '.' + day;
}
