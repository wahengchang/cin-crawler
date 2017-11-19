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

var TARGET_HOST = casper.cli.get('TARGET_HOST')
var MOVIE_LIST_URL = casper.cli.get('MOVIE_LIST_URL')
var THREAD_ID = casper.cli.get('THREAD_ID')
var url = TARGET_HOST + MOVIE_LIST_URL + '/id=' + THREAD_ID

// add this to the top of the script, to show debug log
casper.on('remote.message', function(msg) {
    this.echo(JSON.stringify(msg));
})

casper.start().thenOpen(url, function() {
    console.log(colors.green("Browser is opened"))
});

casper.waitForSelector('.release_info',
    function success() {
        console.log(colors.green("Going to download threader html ..."))
        var fs = require('fs');
        var html = this.getHTML();
        var path = tempDataPath + '/html/' + THREAD_ID +'.html'
        fs.write(path, html, 'w');
        console.log(colors.green('html saved'))
    },
    function fail() {
        console.log(colors.green("oops"))
    },
    3000
);

casper.run();

