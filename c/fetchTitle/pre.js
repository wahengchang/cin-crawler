var links = [];
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


var TARGET_HOST = casper.cli.get('TARGET_HOST')
var TITLE_URL = casper.cli.get('TITLE_URL')

var url = TARGET_HOST + TITLE_URL
var MVAuthorization = ''


console.log('Going to process : ', url)
// add this to the top of the script, to show debug log
casper.on('remote.message', function(msg) {
    this.echo(JSON.stringify(msg));
})


function isAPI(url){
    return (url.indexOf('/api/v1') !== -1) 
}

var resources = []; // a resource contains at least 'url', 'status'

casper.on("resource.requested", function(resource){
    var headers = resource.headers
    if(isAPI(resource.url)) {
        for(var i=0; i<headers.length; i++){
            if(headers[i].name === 'MV-Authorization'){
                MVAuthorization = (headers[i].value && headers[i].value!=='')?
                                    headers[i].value:
                                    MVAuthorization
            }
        }
    }
});

casper.start().thenOpen(url, function() {
    console.log("Browser is opened");
});

casper.then(function() {
    var fs = require('fs');
    var data = JSON.stringify({MVAuthorization: MVAuthorization})
    var path = tempDataPath + '/s.json'
    fs.write(path, data, 'w');
    console.log(path, ' saved')
})

casper.run();

