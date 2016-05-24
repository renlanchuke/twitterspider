var Twit = require('twit')
var fs = require("fs");
var config = require('./config');
var mongo = require('./mongoDB');
var logger = require('./logger');
var getIds = require('./getTwitterId')
var getTwitters = require('./getTwitterFromId');

// getIds.getTwitterId('testId');

getTwitters.getTwitter('testId', 'testTwitters');




