(async function() {
    var colors = require('colors');    
    var cheerio = require('cheerio')
    var tempDataPath = require('../../config.json').tempDataPath    
    var {readFile, writeFile} = require('../../lib/file')
    var {extractIdByHref, removeUnnessString} = require('../../lib/string')
    const filePath = `${tempDataPath}/data/all-time.json`    
    
    const THREAD_ID = process.argv[2]

    const html = await readFile(`${tempDataPath}/html/${THREAD_ID}.html`)

    if(!THREAD_ID) throw new Error('THREAD_ID is not defined')

    $ = cheerio.load(html);
        
    const b = $('.release_list').children()
    const movieData = []

    // process data of each movie
    b.each(async function(i, elem) {
        const resultTimeList = []
        const movieUrl = $(this).find('.release_foto a').attr('href')
        const movieImg = $(this).find('.release_foto img').attr('src')
        const movieId = extractIdByHref(movieUrl)

        // process time of movie
        $(this)
            .find('.theater_time').find('li')
            .each(function(i, el) {
                resultTimeList.push(removeUnnessString($(this).text()))
            })

        movieData.push({
            cinId: THREAD_ID,
            movieId: movieId,
            img: movieImg,
            timeList: resultTimeList
        })
    });

    let buf = await readFile(filePath)
    buf = JSON.parse(buf)
    buf = buf.concat(movieData);
    await writeFile(filePath, JSON.stringify(buf))
    console.log(colors.green(`${b.length} movies are saved to ${filePath} ...`))
}());