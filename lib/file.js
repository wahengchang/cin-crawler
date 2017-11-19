fs = require('fs')
const deleteTypeTable = ['.html', '.json', '.js']

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


const fileList = (filePath, _deleteTypeList) => new Promise((resolve, reject)=>{
    const isExtension = (str, extension) => {
        return (
                ((str.indexOf(extension) + extension.length) === str.length)
                &&
                str.length > extension.length
            )
    }

    const checkFileTypeTable = (__type) => deleteTypeTable.some( type => type === __type)

    const checkFileTypeList = _deleteTypeList? 
        _deleteTypeList.filter( _type => checkFileTypeTable(_type)):
        []

    const strContainedTypeFile = (fn) => {
        if(checkFileTypeList.length<=0) return false 
        return checkFileTypeList.some( _type => isExtension(fn, _type) )
    }

    fs.readdir(filePath, (err, files) => {
        if (err)
            resolve([]);
        else {
            if(checkFileTypeList.length<= 0) {
                resolve(files);
            }
            else {
                const returnFiles = files.filter( fn => {
                    return strContainedTypeFile(fn)
                })
                resolve(returnFiles)
            }
        }
            
    });
});

const deleteFile = (filePath) => new Promise((resolve, reject)=>{
    fs.unlink(filePath, (err) => {  
        if (err)
            reject(err)
        else
            resolve()
    });
})

const deleteFileByFolder = (filePath, _deleteTypeList) => new Promise((resolve, reject)=>{
    if(!_deleteTypeList || _deleteTypeList.length<=0) 
        throw new Error('extension is required')


    let deleteFilePath = []

    fileList(filePath, _deleteTypeList)
    .then((list)=>{
        deleteFilePath = list.map( _fn => `${filePath}/${_fn}`)
        return Promise.all(
                deleteFilePath.map( _fp => deleteFile(_fp))
            )
    }).then(()=>{
        console.log(`deleted ${deleteFilePath.length} files in path ${filePath}     with extension ${JSON.stringify(_deleteTypeList)}...`)
        resolve(deleteFilePath)
    })
});

module.exports = {
    readJson,
    readFile,
    writeFile,
    fileList,
    deleteFile,
    deleteFileByFolder
}
