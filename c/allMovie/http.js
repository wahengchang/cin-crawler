var request = require('request')
var writeFile = require('../../lib/file').writeFile
var MVAuthorization = require('../../temp/s.json').MVAuthorization
var tempDataPath = require('../../config.json').tempDataPath

var TARGET_HOST = process.env.TARGET_HOST
var ALL_MOVIE_API = process.env.ALL_MOVIE_API
var url = TARGET_HOST+ALL_MOVIE_API

var headers = {
    'Content-Type': 'application/json',
    'MV-Authorization': MVAuthorization
};

var options = {
    url: url,
    method: 'GET',
    headers: headers
};

request(options, function (error, response, body) {    
    if (!error && response.statusCode === 200) {
        body = JSON.stringify(JSON.parse(body))
        var path = tempDataPath + '/data/all-movie.json'

        writeFile(path, body)
        .then( console.log(path + ' is saved ...'))
    } else {
        console.log('error: ', error)
    }
});