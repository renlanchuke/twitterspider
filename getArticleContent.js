var common = require("./common")
var mongo = require('./mongoDB');
var cheerio = require('cheerio');
var logger = require('./logger');
var self = require('./getArticleContent')
var UrlCollection;
var articleCollection;
var cursor = new GetCursor();
exports.getArticle = function (IdColl, artcleColl) {
    urlCollection = IdColl;
    articleCollection = artcleColl;
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(urlCollection, { download: false }, (err, docs) => {
            if (err) throw err;
            var length = docs.length;
            console.log('docs length: ', length);
            var firstCursor = cursor.getCursor();
            getTwitter(firstCursor, docs, length);
            // console.log(docs);
        });
    });
}

function getTwitter(cur, docs, len) {
    if (cur < len) {
        var url = docs[cur].url;
        common.get(encodeURI(url), null, (err, data) => {
            if (err)
                throw err;
            // logger.log(err);
            // setTimeout(function () {
            //     self.getTwitter(cur, docs, len);
            // }, 10000);

            var $ = cheerio.load(data, { decodeEntities: false });
            var articleContent = "";
            var header1 = $('h1[id=h1]').text();
            var header2 = $('h2[id=h2]').text();
            var curDate = $('time').html();
            var content = $('.articulum');
            content.children("p,h2").each(function (i) {
                articleContent = articleContent + $(this).text() + "\n";
            });

            //console.log(articleContent);

            var article = {
                id: docs[cur].id,
                date: curDate,
                h1: header1,
                h2: header2,
                content: articleContent,
                url: docs[cur].url
            };

            mongo.insertOne(articleCollection, article, (err, result) => {
                if (err) throw err;
                mongo.updateOne(urlCollection,
                    { "id": article.id },
                    { "download": true },
                    (err, result, filter) => {
                        if (err) throw err;
                        console.log('成功获取第' + cur + '条数据');
                    });
            });
            var nextCursor = cursor.getCursor();
            getTwitter(nextCursor, docs, len);

        })

    } else {
        logger.log("所有文章都抓取完毕！");
        return;
    }
}

function GetCursor() {
    this._cursor = -1;
    this.getCursor = function () {
        this._cursor++;
        return this._cursor;
    }
}