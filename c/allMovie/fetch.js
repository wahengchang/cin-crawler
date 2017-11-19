var links = [];
var colors = require('colors');
var fileNameTimeStamp = require('../lib/utils').fileNameTimeStamp;
var tempDataPath = require('../config.json').tempDataPath
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
        logLevel: "debug",
        timeout: 10000

    }
});


// var TARGET_HOST = casper.cli.get('TARGET_HOST')
// var MOVIE_LIST_URL = casper.cli.get('MOVIE_LIST_URL')
// var MOVIE_ID = casper.cli.get('MOVIE_ID')

var TARGET_HOST = "https://tw.movies.yahoo.com"
var MOVIE_LIST_URL = "/theater_result.html"
var MOVIE_ID = 45
var url = TARGET_HOST + MOVIE_LIST_URL + '/id=' + MOVIE_ID
var MVAuthorization = ''

// add this to the top of the script, to show debug log
casper.on('remote.message', function(msg) {
    this.echo(JSON.stringify(msg));
})


function isAPI(url){
    return (url.indexOf('/api/v1') !== -1) 
}

var resources = []; // a resource contains at least 'url', 'status'
casper.on("resource.received", function(resource){
    // if(isAPI(resource.url)) {
    //     console.log(' resource.received .......')
    //     console.log(JSON.stringify(resource))
    // }
});
casper.on("resource.requested", function(resource){

    var headers = resource.headers

    if(isAPI(resource.url)) {
        for(var i=0; i<headers.length; i++){
            if(headers[i].name === 'MV-Authorization'){
                console.log('MV-Authorization: ', headers[i].value)
                MVAuthorization = (headers[i].value && headers[i].value!=='')?headers[i].value:MVAuthorization
            }
        }
    }
});
casper.on("resource.timeout", function(request){
    console.log(' resource.timeout .......')
});
casper.on("resource.error", function(resourceError){
    // console.log(' resource.error .......')
    // resourceError.status = -2;
    // resources.push(resourceError);
});



casper.start().thenOpen(url, function() {
    console.log(colors.green("Browser is opened"))
});

casper.then(function() {
    var fs = require('fs');
    var data = JSON.stringify({MVAuthorization: MVAuthorization})
    var path = tempDataPath + '/s.json'
    fs.write(path, data, 'w');
    console.log(colors.green('s.json saved'))
})

casper.run();

