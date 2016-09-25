var common = require("./common")
var mongo = require('./mongoDB');
var cheerio = require('cheerio');
var logger = require('./logger');

var UrlCollection;
var articleCollection;
var cursor = new GetCursor();
exports.getArticle = function (IdColl, artcleColl) {
    UrlCollection = IdColl;
    articleCollection = artcleColl;
    mongo.init(function (err) {
        if (err) throw err;

        mongo.findAll(UrlCollection, { id: 1, download: false }, (err, docs) => {
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
            if (err) throw err;

            var $ = cheerio.load(data, { decodeEntities: false });
            console.log($('h1[id=h1]').text());
            console.log($('h2[id=h2]').text());
            console.log($('time').html());
            var content = $('.articulum');
            console.log(content.children("h2").text())

        })

    }
}

function GetCursor() {
    this._cursor = -1;
    this.getCursor = function () {
        this._cursor++;
        return this._cursor;
    }
}