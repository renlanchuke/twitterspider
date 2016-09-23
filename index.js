// var Twit = require('twit')
// var fs = require("fs");
// var config = require('./config');
// var mongo = require('./mongoDB');
var logger = require('./logger');
var getIds = require('./getTwitterId');
var getTwitFP = require("./getTwitterFromPage")
var getTwitters = require('./getTwitterFromId');
var exec = require("child_process").exec;
var spawn = require("child_process").spawn;
var net = require("net")
var http_proxy = "http://127.0.0.1:8787"

checkHttpProxy(function () {
    checkDatabase(function () {
        getTwitFP.getTwitters('twitters_0107_0116');
        //getTwitters.getTwitter('testId', 'testTwitters');
        //getTwitters.getTwitter('testId', '1214_1222_Twitters');
    })
})






function isPortOccupied(port, handle1, handle2) {
    var server = net.createServer().listen(port)

    server.on('listening', function () {
        server.close();
        handle1()
    })

    server.on('error', function (err) {
        if (err.code = 'EADDRINUSE') {
            handle2()
        } else {
            throw err;
        }
    })
}

function checkDatabase(next) {
    //检查数据库是否启动
    isPortOccupied(27017, function () {
        //启动数据库
        var database_child = spawn('mongod', ['--config', '/etc/mongod.conf'])
        if (database_child) {
            logger.log("数据库启动成功");
            setTimeout(3, next());

        } else {
            logger.log("无法启动数据库");
        }
    }, function () {
        next();
    })
}

function checkHttpProxy(next) {
    isPortOccupied(8787, function () {
        //打开lantern
        var http_proxy_child = spawn('lantern')
        if (http_proxy_child) {
            logger.log("成功打开代理");
            exec('export http_proxy=' + http_proxy, (err, stdout, stderr) => {
                if (err) throw err;
            })
            next()
        } else {
            logger.log("无法启动代理");
        }
    }, function () {
        next();
    })
}