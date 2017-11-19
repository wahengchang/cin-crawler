(async function() {
    var pcMg = require('./lib/processManager');
    var {deleteFileByFolder} = require('./lib/file');
    var config = require('./config.json')
    var {fileNameTimeStamp} = require('./lib/utils')
    var colors = require('colors');
    
    var TARGET_HOST = process.env.TARGET_HOST
    var TITLE_URL = process.env.TITLE_URL
    var MOVIE_LIST_URL = process.env.MOVIE_LIST_URL
    

    /*_*_*_*_ Performance Init _*_*_*/
    var old_time = new Date();
    var m0 = process.memoryUsage()
    var c0 = process.cpuUsage()
    /*_*_*_*_ Performance Init _*_*_*/

    const {tempDataPath} = config
    const fetchTitleFileName = 'title-'+fileNameTimeStamp('json');
    const fetchTitlepath = tempDataPath + '/' + fetchTitleFileName

    const preTitle =    `npm run preTitle -- --TARGET_HOST=${TARGET_HOST} --TITLE_URL=${TITLE_URL}`
    const fetchTitle =  `npm run fetchTitle`
    const allMovie =    `npm run allMovie`
    const allChannel =  `npm run allChannel`
    
    await pcMg.execPromise(preTitle)
    await pcMg.execPromise(fetchTitle)
    await pcMg.execPromise(allMovie)
    await pcMg.execPromise(allChannel)

    const threadIds = require('./temp/data/all-cin.json').map( itme => {return {id: itme.y_theater_id}})

    for( let cin of threadIds){
        const {id} = cin
        const fetchThreaterHTML = `npm run fetchThreaterHTML -- --TARGET_HOST=${TARGET_HOST} --MOVIE_LIST_URL=${MOVIE_LIST_URL} --THREAD_ID=${id}`
        await pcMg.execPromise(fetchThreaterHTML)

        const processMovieTime = `npm run processMovieTime ${id} `
        await pcMg.execPromise(processMovieTime)
    }

    await deleteFileByFolder(tempDataPath, ['.json', '.html'])
    await deleteFileByFolder(`${tempDataPath}/data`, ['.json', '.html'])
    await deleteFileByFolder(`${tempDataPath}/html`, ['.json', '.html'])
    await deleteFileByFolder(`${tempDataPath}/_html`, ['.json', '.html'])


    /*_*_*_*_ Performance Finished _*_*_*/
    var new_time = new Date();
    var m1 = process.memoryUsage()
    var c1 = process.cpuUsage()
    var diffCPU = process.cpuUsage(c0)

    console.log(colors.green(`           *_*_*_ function  _*_*_*`))
    console.log(colors.green('           RAM         : ', (m1['rss'] - m0['rss']) / 1048576, 'mb'))
    console.log(colors.green('           HeapTotal   : ', (m1['heapTotal'] - m0['heapTotal']) / 1048576, 'mb'))
    console.log(colors.green('           HeapUsed    : ', (m1['heapUsed'] - m0['heapUsed']) / 1048576, 'mb'))
    console.log(colors.green('           External    : ', (m1['external'] - m0['external']) / 1048576, 'mb'))
    console.log(colors.green('           CPU         : ', (diffCPU.user + diffCPU.system) /1000000, 's'))
    console.log(colors.green('           Spend time  : ', (new_time - old_time)/1000, 's'))
    /*_*_*_*_ Performance Finished _*_*_*/
}());