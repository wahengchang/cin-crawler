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
var MOVIE_LIST_URL = casper.cli.get('MOVIE_LIST_URL')
var MOVIE_ID = casper.cli.get('MOVIE_ID')
var url = TARGET_HOST + MOVIE_LIST_URL + '/id=' + MOVIE_ID

// add this to the top of the script, to show debug log
casper.on('remote.message', function(msg) {
    this.echo(JSON.stringify(msg));
})

casper.start().thenOpen(url, function() {
    console.log("Browser is opened");
});

casper.waitForSelector('.release_info',
    function success() {
        console.log("Going to download movie title ...");
        var fs = require('fs');
        var html = this.getHTML();
        var path = tempDataPath + '/html/' + MOVIE_ID +'.html'
        fs.write(path, html, 'w');
        console.log('html saved')
    },
    function fail() {
        console.log("oops");
    },
    3000
);

casper.run();

