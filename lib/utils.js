function fileNameTimeStamp(_format){
    var format = _format || 'json'
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    return year + "-" + month + "-" + day+"."+_format
}

module.exports = {
    fileNameTimeStamp : fileNameTimeStamp
}
