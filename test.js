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


var string = '<figure class="lbimg sgimg sglft"><a title="●天王挺朱<BR>●宋好彩頭　宋楚瑜昨到新北市板橋區拜票，民眾送上菜頭祝當選。吳貞慧攝 " href="http://twimg.edgesuite.net//images/twapple/640pix/20160115/LN02/LN02_004.jpg"><img src="http://twimg.edgesuite.net/images/thumbnail/20160115/37012309_3ab8ca8b6c9e1aff300945adb0016305_160x160.jpg"><span></span></a><span id="caption" class="cpt">●天王挺朱　朱立倫昨<br>●宋好彩頭　宋楚瑜昨到新北市板橋區拜票，民眾送上菜頭祝當選。吳貞慧攝 </span></figure><p id="introid">【綜合報導】決戰北台灣！總統、立委選舉明天投票，三黨總統候選人今把握選戰最後24小時掃街衝刺，選前之夜造勢晚會則在雙北尬場，對支持者強力催票。<br>國民黨候選人朱立倫今天上午在北市車隊地毯式拜票，下午到台中，晚上回大本營新北市，在板橋第一運動場辦晚會，力守北台票倉。民進黨候選人蔡英文今從台中出發，一路北上，晚上在距總統府最近的凱達格蘭大道辦晚會，號召支持者迎向勝利。親民黨候選人宋楚瑜白天在彰化掃街，晚上在台北田徑場辦晚會，預估上萬支持者力挺。 </p><hr class="clearman vanisher"><p id="bcontent">【綜合報導】總統、立委選舉今進入最後階段拼戰，為防範投票前夕發生突發事故影響選情，國安特勤、警政系統全面總動員，展開對三黨總統候選人「維安極大化」的維安計劃。國安官員昨指出，除建議候選人穿上防彈背心，候選人的防彈掃街車上也已配置長槍，若有人企圖傷害候選人，特勤人員將立即火力壓制。警政署也嚴陣以待，今晚三黨造勢晚會將加強舞台周邊管制，並出動防爆小組<br></p><div id="InRead" class="ads"><script type="text/javascript">googletag.cmd.push(function() {googletag.display("InRead");})</script></div><hr class="clearman"><figure class="lbimg sgimg sglft"><a title="警力護票<BR>新北市的961萬5915張選票昨凌晨開始運送，共出動145名警員荷槍實彈護送。李銘宏攝" href="http://twimg.edgesuite.net//images/twapple/640pix/20160115/LN02/LN02_001.jpg"><img src="http://twimg.edgesuite.net/images/thumbnail/20160115/37012309_275aa78d23ec61b30b6bbe303aee1f55_160x160.jpg"><span></span></a><span id="caption" class="cpt">警力護票<br>新北市的961萬5915張選票昨凌晨開始運送，共出動145名警員荷槍實彈護送。李銘宏攝</span></figure><p id="bcontent">國安官員表示，相關單位對可能不利選舉的情資都有掌握，目前列為潛在危險的因素是地下賭盤，因此警方早已開始強<br></p><hr class="clearman"><hr class="clearman"><figure class="lbimg sgimg sglft"><a title="清點封存<BR>各區選票送到區公所，清點後封存保管。陳啟明攝" href="http://twimg.edgesuite.net//images/twapple/640pix/20160115/LN02/LN02_002.jpg"><img src="http://twimg.edgesuite.net/images/thumbnail/20160115/37012309_eb09f09713c95984fe15568a6cedcdd0_160x160.jpg"><span></span></a><span id="caption" class="cpt">清點封存<br>各區選票送到區公所，清點後封存保管。陳啟明攝</span></figure><h2 id="bhead">候選人穿防彈背心</h2><p id="bcontent">警政署表示，已通令全國近6萬2千名外勤警力明天投票日全面停休，執勤戒備，其中1萬5千多個投開票所部署近1萬6千名警員，另有2萬3千名協勤民力幫忙維安。<br>由於三黨總統候選人今都將展開掃街衝刺，晚上在北市、新北市舉辦大型造勢晚會，國安人士透露，特勤人員已向候選人建議穿上防彈背心。其中民進黨總統候選人蔡英文配合度最高，一直有穿國安局提供的防彈背心；親民黨總統候選人宋楚瑜穿自己買的防彈背心；國民黨總統候選人朱立倫視情況穿著。<br>決戰前夕，國民黨總統候選人朱立倫今上午在北市陪立委候選人車隊掃街拜票，晚上連趕台中和新北市兩場造勢晚會，盼催出支持者熱情。國民黨人士預估新北會有五萬人參與，並指所以將「ONE台灣就是力量」團結之夜活動移到新北市板橋第一運動場前廣場舉辦，除了新北是朱的大本營，一<br></p><hr class="clearman"><hr class="clearman"><figure class="lbimg sgimg sglft"><a title="" href="http://twimg.edgesuite.net//images/twapple/640pix/20160115/LN02/LN02_003.jpg"><img src="http://twimg.edgesuite.net/images/thumbnail/20160115/37012309_748f48a6b87da05858db030bc7019b40_160x160.jpg"><span></span></a><span id="caption" class="cpt"></span></figure><h2 id="bhead">中部揮軍掃街催票</h2><p id="bcontent">國民黨人士分析，雖然大環境對國民黨不利，但還是要全力催出藍營支持者，北台灣是傳統藍營票倉，新北市立委的席次保衛戰更被視為朱立倫的競選重要成績，因此朱在選前3天全力衝北台選情。<br>民進黨總統候選人蔡英文今早從台中出發，以「最後這一里，不能沒有你」為訴求全面催票，一路北上到苗栗、新竹，再到桃園，下午抵達新北市，傍晚在北市車隊掃街。<br>綠營輔選人士說，民進黨把新北市視為區域立委席次能否過半的關鍵縣市，因此蔡的選前之夜第一場選在新北市板橋區舉辦，第二場是在總統府前凱達格蘭大道，「這是民進黨8年來首次申請到在凱道舉辦的『迎向勝利、點亮台灣』決戰之夜，別具象徵意義」，預估有十萬人到場力挺。<br>親民黨總統候選人宋楚瑜今一早到彰化鹿港天后宮參拜，隨即進行彰化大掃街。宋辦發言人陳怡潔指出，從中南部出發，是告訴民眾宋是真正關注全台。晚上的選前之夜，宋回到台北田徑場，號召希望台灣改變的民眾站出來，預<br></p><hr class="clearman"><h2 id="bhead">天冷投票率料下滑</h2><p id="bcontent">中央氣象局表示，明投票日各地溫度仍低，北部、東北部約攝氏15至18度，中部約攝氏15至21度、南部約16至25度、東部約18至21度。<br>中選會表示，這次大選具投票資格的選舉人數達1878萬6808人，比2012年總統選舉增加70萬353人，首投族129萬406人，佔選舉人總數6.8%，比上次大選多了近1<br></p><iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fappledaily.tw&amp;width&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=256196617882521" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:62px;" allowtransparency="true"></iframe><br><div id="goldenhorse"><script type="text/javascript">googletag.cmd.push(function() {googletag.display("goldenhorse");})</script><br></div><div id="textlink"><script type="text/javascript">googletag.cmd.push(function() {googletag.display("textlink");})</script><br></div><br><a _moz_dirty="" href="mailto:onlineopinions@appledaily.com.tw?subject=有話要說投稿「即時論壇」" style="font-size:20px; color:#12A230; font-weight:bold;">有話要說 投稿「即時論壇」</a>'

var newStr = string.replace(/^<*>$/g, "\n");
console.log(newStr);