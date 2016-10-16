var mongo = require('./mongoDB');
var common = require('./common');
var Twit = require('twit');
var net = require('net')
var request = require('request')

/********
 * 数据库测试
 * ********/

// var data = [
//     {
//         name: '12312',
//         grade: '12'
//     }, {
//         name: '张三',
//         grade: '88'
//     }
// ]

// // var cursor = new GetCursor();
// mongo.init(function (err) {
//     if (err) throw err;

//     mongo.insertMany('students', data, (err, result) => {
//         if (err) throw err;
//         console.log('成功插入数据：', result.insertedCount);
//         mongo.findAll('students', null, (err, docs) => {
//             if (err) throw err;
//             var length = docs.length;
//             console.log('docs length: ',length);
//             while (length--) {
//                 var nextCursor = cursor.getCursor();
//                 console.log(docs[nextCursor]);
//             }
//             console.log(docs);
//             mongo.stop();
//         });
//     }),

//     // test updateMany
//     mongo.updateMany('twitter_id_second', { 'download': true }, { 'download': false }, (err, result) => {
//         console.log(result.matchedCount);
//         console.log(result.modifiedCount);
//         mongo.stop();
//     });
// });

/******************
 * 测试saveJsonArray
 * **************** */


// common.saveJsonArray('1q2.json',data,null);

// function GetCursor() {
//     this._cursor = -1;
//     this.getCursor = function () {
//         this._cursor++;
//         return this._cursor;
//     }
// }

/*****************
 * 测试twitt
 * ************** */
// var T = new Twit({
//     consumer_key: "**********", consumer_secret: "****", app_only_auth: true
// });

// T.get('statuses/show/:id', { id: '688517798804496384' }, function (err, data, response) {

//     if (err) {
//         console.log(err);

//     } else {
//         console.log(data);
//     }
// });


/*****************
 * 测试端口是否占用
 * ************** */

// function portIsOccupied(port) {
//     var server = net.createServer().listen(port)

//     server.on('listening', function () {
//         server.close()
//         console.log("The port :" + port + " is available")
//     })

//     server.on('error', function (err) {
//         if (err.code = 'EADDRINUSE') {
//             console.log('The port :' + port + ' is occupied change other port')
//         }
//     })
// }
/**************
 * 测试请求URL是否需要编码
 * ***************** */
// portIsOccupied(27017);
// var url = 'http://www.appledaily.com.tw/appledaily/article/headline/20160115/37012309/applesearch/決戰雙北今拚最後一夜';
// var newUrl = encodeURI(url);
// request(newUrl, function (err, response, body) {
//     if (!err && response.statusCode == 200) {
//         console.log(body);
//     } else {
//         console.log(response.statusCode)
//     }
// })

// var article = {
//     id: 23,
//     date: 4,
//     h1: 32,
//     h2: 12,
//     content: 123,
//     url: 123
// };

// for (i in article) {
//     console.log(i)
// }

/**************
 * 测试gerDateArray function
 * ***************** */
var dateArray = common.getDateArray('2015-01-20', '2015-01-21');
console.log(dateArray);
console.log(dateArray.length)


