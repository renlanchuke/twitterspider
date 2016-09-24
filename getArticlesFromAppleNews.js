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
//分页链接的表单数据
var formData2 = {
    searchMode: "",
    searchType: "text",
    ExtFilter: "[twapple+TO+twapple_sub]",
    sorttype: "1",
    ketword: "蔡英文",
    rangedate: "[20151214+TO+20160115999:99]",
    totalpage: "276",
    page: '7'
};


exports.getArticles = function () {
    common.getContent(url, formData, function (err, fileContent) {
        if (err) throw err;
        fs.writeFile("./testFile2", fileContent, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
        });


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
