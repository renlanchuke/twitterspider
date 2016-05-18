var comm=require('./common');

exports.log=function (message) {
    console.log(comm.getDateString()+' '+message);
}