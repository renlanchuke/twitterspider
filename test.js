var mongo = require('./mongoDB');
var common = require('./common');
var Twit = require('twit');
var net = require('net')
var request = require('request')
var config = require('./config')

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
//     consumer_key:config.consumer_key, consumer_secret: config.consumer_secret, app_only_auth: true
// });

// T.get('statuses/show/:id', { id: '683435094720311297' }, function (err, data, response) {

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
// var dateArray = common.getDateArray('2015-01-20', '2015-01-21');
// console.log(dateArray);
// console.log(dateArray.length)

// var string1 = "新闻工作者";
// var string2="新聞工作者";
// var string3="新文闻心闻新1聞"
// console.log(/(新聞)|(新闻)/.test(string1));
// console.log(/新聞|新闻/.test(string2));
// console.log(/新聞|新闻/.test(string3));

//对象排序
// function obj(id, value) {
//     this.id = id
//     this.value = value
// }

// var testArray = new Array();
// testArray.push(new obj(12, "2016-01-11"));
// testArray.push(new obj(1, "2016-01-09"));
// testArray.push(new obj(12313, "2016-01-10"));
// testArray.push(new obj(123, "2016-01-15"));
// console.log(testArray)
// testArray.sort((a, b) => {
//     return a.value > b.value
// })

// console.log(testArray);

var string1 = "传蔡英文拥有英国国籍 伦敦市中心有豪宅(图) https://t.co/R3MxNCftZh https://t.co/QXSLN2rSlW";
string1 = string1.replace(/http(s){0,1}:\/\/[a-zA-Z0-9\-.]+(?::(\d+))?(?:(?:\/[a-zA-Z0-9\-._?,'+\&%$=~*!():@\\]*)+)?/g, "")
console.log(string1)