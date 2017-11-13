var links = [];
var fileNameTimeStamp = require('../lib/utils').fileNameTimeStamp;
var tempDataPath = require('../config.json').tempDataPath
var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
    }
});


var TARGET_HOST = casper.cli.get('TARGET_HOST')
var TITLE_URL = casper.cli.get('TITLE_URL')
var url = TARGET_HOST + TITLE_URL

// add this to the top of the script, to show debug log
casper.on('remote.message', function(msg) {
    this.echo(msg);
})

casper.start().thenOpen(url, function() {
    console.log("Browser is opened");
});

casper.then(function(){
    console.log("Going to fetch cinema title ...");
    this.capture('cinemaTitle.png');    
    var links = this.evaluate(function(){
        function removeSpace(str) {
            return str.replace(/\s/g, '');
        }
        
        function removeNewLine(str) {
            return  str.replace('\r', '').replace('\n', '');
        }
        function removeUnnessString(str) {
            return removeSpace(removeNewLine(str))
        }

        var results = []; 
        var elts = document.getElementsByClassName("name");
        for(var i = 0; i < elts.length; i++){
            var link = elts[i].getElementsByTagName("a")[0].getAttribute("href");
            var title = elts[i].textContent;
            title = removeUnnessString(title)
            var id = link.substr(link.indexOf('id=') + 3, link.length);
            results.push({
                link: link, 
                title: title,
                id: id
            });
        }
        return results; 
    });

    console.log("There were "  + links.length + " cinemas.");
    // for(var i = 0; i < links.length; i++){
    //     console.log(links[i].id, links[i].link, links[i].title);
    // }

    var defaultPath = tempDataPath;
    var fileName = 'title-'+fileNameTimeStamp('json');
    var myfile = defaultPath +'/'+ fileName;
    
    var fs = require('fs');
    fs.write(myfile, JSON.stringify(links), 'w');
});

casper.run();

