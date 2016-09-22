var Twit = require('twit')
var fs = require("fs");
var config = require('./config');
var mongo = require('./mongoDB');
var logger = require('./logger');
var getIds = require('./getTwitterId');
var getTwitters = require('./getTwitterFromId');

getIds.getTwitterId('twitters_0107_0116');

//getTwitters.getTwitter('testId', 'testTwitters');

//getTwitters.getTwitter('testId', '1214_1222_Twitters');


