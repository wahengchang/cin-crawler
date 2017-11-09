
var pcMg = require('./lib/processManager');

var TARGET_HOST = process.env.TARGET_HOST
var TITLE_URL = process.env.TITLE_URL

var commandList = []
commandList.push(`npm run fetchTitle -- --TARGET_HOST=${TARGET_HOST} --TITLE_URL=${TITLE_URL}`)

pcMg.series(commandList , function(err){
//    console.log('executed many commands in a row'); 
    console.log('done')
});