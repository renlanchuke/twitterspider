//时间格式化输出
exports.getDateString = function (date) {
    if (!date) {
        date = new Date();
    }

    var year = date.getFullYear().toString();
    var month = date.getMonth().toString();
    var day = date.getDate().toString();

    return year + '.' + month + '.' + day;
}