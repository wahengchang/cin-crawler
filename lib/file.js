fs = require('fs')

const readJson = (path, ) => new Promise((resolve, reject)=>{
    fs.readFile(path, 'utf8', function (err, data) {
        if (err)
            reject(err)
        else
            resolve(JSON.parse(data))
    })
})

const readFile = (path) => new Promise((resolve, reject)=>{
    fs.readFile(path, 'utf8', function (err, data) {
        if (err)
            reject(err)
        else
            resolve(data)
    })
})

const writeFile = (path, data) => new Promise((resolve, reject)=>{
    fs.writeFile(path, data, (err) => {  
        if (err)
            reject(err)
        else
            resolve()
    });
})

module.exports = {
    readJson,
    readFile,
    writeFile
}
