const {fileList, deleteFileByFolder} = require('../../lib/file');

const isExtension = (str, extension) => {
    return (
            ((str.indexOf(extension) + extension.length) === str.length)
            &&
            str.length > extension.length
        )
}

test('fileList() without _deleteTypeList', (done) => {
    fileList('./').then(
        (files) => {
            expect(typeof files).toEqual('object')
            done()
        }
    )
});


test('fileList() without js deleteTypeList', (done) => {
    fileList('./', ['.js']).then(
        (files) => {
            files.forEach( fn => isExtension(fn, '.js'))
            done()
        }
    ).catch(err => {
        expect(err).toEqual(null)
        done()
    })
});


test('deleteFileByFolder() without js deleteTypeList', (done) => {
    deleteFileByFolder('./temp/html', [])
    .then()
    .catch(err => {
        expect(err).toEqual(new Error('extension is required'))
        done()
    })
});

test.only('deleteFileByFolder() without js deleteTypeList', (done) => {
    deleteFileByFolder('./temp/html', ['.html'])
    .then(
        (result)=>fileList('./temp/html', ['.html'])
    ).then(
        fileList => {
            expect(fileList.length).toEqual(0)
            done()
        }
    )
});