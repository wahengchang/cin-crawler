
const timeStringToDate = str => {
    const [h, m] = str.split(':')
    let _d = new Date();  
    _d = _d.setUTCHours(h, m, 0, 0);
    return _d
}

module.exports = {
    timeStringToDate : timeStringToDate
}
