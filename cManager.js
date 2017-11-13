(async function() {
    var pcMg = require('./lib/processManager');
    var {readJson} = require('./lib/file');
    var config = require('./config.json')
    var {fileNameTimeStamp} = require('./lib/utils')

    var TARGET_HOST = process.env.TARGET_HOST
    var TITLE_URL = process.env.TITLE_URL
    var MOVIE_LIST_URL = process.env.MOVIE_LIST_URL
    

    const {tempDataPath} = config
    const fetchTitleFileName = 'title-'+fileNameTimeStamp('json');
    const fetchTitlepath = tempDataPath + '/' + fetchTitleFileName

    // commandList.push(`npm run fetchTitle -- --TARGET_HOST=${TARGET_HOST} --TITLE_URL=${TITLE_URL}`)

    const preTitle = `npm run preTitle -- --TARGET_HOST=${TARGET_HOST} --TITLE_URL=${TITLE_URL}`
    const fetchTitle = `npm run fetchTitle`
    await pcMg.execPromise(preTitle)
    await pcMg.execPromise(fetchTitle)
    // const cinList = await readJson(fetchTitlepath)


    // for( let cin of cinList){

    //     const {id} = cin
        
    //     const fetchCinDetail = `npm run fetchCinDetail -- --TARGET_HOST=${TARGET_HOST} --MOVIE_LIST_URL=${MOVIE_LIST_URL} --MOVIE_ID=${id}`
        
    //     await pcMg.execPromise(fetchCinDetail)
                
    // }

    // pcMg.series(commandList , function(err){
    // //    console.log('executed many commands in a row'); 
    //     console.log('done')
    // });

}());