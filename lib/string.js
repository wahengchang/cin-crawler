
function removeSpace(str) {
    return str.replace(/\s/g, '');
}
function removeNewLine(str) {
    return  str.replace('\r', '').replace('\n', '');
}
function removeUnnessString(str) {
    return removeSpace(removeNewLine(str))
}
function extractIdByHref(str) {
    return str.substr(str.indexOf('/id=')+4, str.length)
}



module.exports = {
    removeSpace : removeSpace,
    removeNewLine : removeNewLine,
    removeUnnessString : removeUnnessString,
    extractIdByHref: extractIdByHref
}
