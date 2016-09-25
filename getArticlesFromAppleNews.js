var common = require("./common")
var mongo = require('./mongoDB');
var cheerio = require('cheerio');
var logger = require('./logger');

var fs = require('fs')
var url = "http://search.appledaily.com.tw/appledaily/search";
//第一次搜索的表单
var formData = {
    searchMode: "Adv",
    searchType: "text",
    querystrA: "蔡英文",
    select: "AND",
    source: "twapple",
    sdate: "2015-12-14",
    edate: "2016-01-15"
};

var page = 1;
var maxPage = 28;
var articleID = 0;
//分页链接的表单数据
var formData2 = {
    searchMode: "",
    searchType: "text",
    ExtFilter: "[twapple TO twapple_sub]",
    sorttype: "1",
    keyword: "蔡英文",
    rangedate: "[20151214 TO 20160115999:99]",
    totalpage: "276",
    page: "1"
};

//mongodb数据库collection，存放抓取的papers
var paperCollection

exports.getArticles = function (collection) {
    paperCollection = collection;
    mongo.init((err) => {
        if (err) throw err;
        getArticlesUrl(1);
    });
}


var getArticlesUrl = function (pageCount) {
    common.getContent(url, formData2, function (err, data) {
        if (err) throw err;
        // fs.writeFile("./testFile2", fileContent, (err) => {
        //     if (err) throw err;
        //     console.log('It\'s saved!');
        // })
        var articleURLArray = new Array();
        var $ = cheerio.load(data, { decodeEntities: false });
        var cards = $('.tbb');
        cards.each(function (i) {
            articleID = articleID + 1;
            var url = $(this).find('a').attr('href')
            articleURLArray.push({ id: articleID, url: url, download: false });

        }), mongo.insertMany(paperCollection, articleURLArray, (err, result) => {
            if (err) throw err;
            logger.log('成功插入' + result.insertedCount + '条数据');
        });

        if (pageCount < maxPage) {
            pageCount++;
            formData2.page = pageCount.toString();
            getArticlesUrl(pageCount);
        }
    })

    // fs.readFile('./testFile.html', 'UTF-8', function (err, data) {
    //     if (err) throw err;
    //     var $ = cheerio.load(data, { decodeEntities: false });
    //     var cards = $('.tbb');
    //     cards.each(function (i) {
    //         console.log($(this).find('a').attr('href'))
    //     })
    // });

}
