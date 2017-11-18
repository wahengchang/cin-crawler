(async function() {

    var cheerio = require('cheerio')
    var tempDataPath = require('../../config.json').tempDataPath    
    var {readFile, writeFile} = require('../../lib/file')
    var {extractIdByHref, removeUnnessString} = require('../../lib/string')
    
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
            id: movieId,
            img: movieImg,
            timeList: resultTimeList
        })
    });

    const filePath = `${tempDataPath}/data/threader${THREAD_ID}-movie-time.json`    
    await writeFile(filePath, JSON.stringify(movieData))
    console.log(`${b.length} movies are saved to ${filePath} ...`)
}());


// var cheerio = require('cheerio'),
// $ = cheerio.load(
//     `<ul id="fruits">
//         <li>
//             <ul>
//                 <li>a1</li>
//                 <li>a2</li>
//                 <li>a3</li>
//             </ul>
//         </li>
//         <li>
//             <ul>
//                 <li>b1</li>
//                 <li>b2</li>
//                 <li>b3</li>
//             </ul>
//         </li>
//     </ul>
// `);

// const b = $('#fruits').children()

// b.each(function(i, elem) {

//     console.log(i , ' : ')
//     console.log($(this).html())
// });
