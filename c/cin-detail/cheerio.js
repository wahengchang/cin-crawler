(async function() {

    var cheerio = require('cheerio')
    var {readFile} = require('../../lib/file')
    var {removeSpace,removeNewLine,removeUnnessString} = require('../../lib/string')
    

    const html = await readFile('./temp/html/45.html')

    $ = cheerio.load(html);

        
    const b = $('.release_list li').children()

    console.log(b.length)



    
    b.each(function(i, elem) {

        console.log(i , ' : ')
        console.log(removeUnnessString($(this).text()))
    });


    // console.log($.html())


}());

