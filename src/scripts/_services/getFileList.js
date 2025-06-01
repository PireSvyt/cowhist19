const fs = require('fs')

function getAllFiles(dir, allFilesList = []) {
    const files = fs.readdirSync(dir)
    files.map((file) => {
        const name = dir + '/' + file
        if (fs.statSync(name).isDirectory()) {
            // check if subdirectory is present
            getAllFiles(name, allFilesList) // do recursive execution for subdirectory
        } else {
            allFilesList.push(name) // push filename into the array
        }
    })
    return allFilesList
}

module.exports = function getFileList(rootFolder, filter = '') {
    let files = getAllFiles(rootFolder)
    if (filter !== '') {
        files = files.filter((file) => file.endsWith(filter))
    }

    // Display
    let displayFiles = files.map((file) => {
        return file.slice(rootFolder.length - 3)
    })
    //console.log(displayFiles);

    return files
}
