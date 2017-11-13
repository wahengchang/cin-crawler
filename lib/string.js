
function removeSpace(str) {
    return str.replace(/\s/g, '');
}

function removeNewLine(str) {
    return  str.replace('\r', '').replace('\n', '');
}
function removeUnnessString(str) {
    return removeSpace(removeNewLine(str))
}


module.exports = {
    removeSpace : removeSpace,
    removeNewLine : removeNewLine,
    removeUnnessString : removeUnnessString
}
