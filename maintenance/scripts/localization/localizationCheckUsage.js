/**
 * 
 * LOCALIZATION USAGE CHECK SCRIPT
 * 
 * Provides 
 *    - the percentage of unused keys from default localization file
 *    - an alternative files content getting rid of unused keys
 * 
 * To run this script, come in the folder and execute "node localizationCheckUsage"
 * 
 */

console.log("SCRIPT LOCALIZATION USAGE CHECK")

const rootFolder = 'C:/Users/pierre.savoyat/Documents/cowhist19/src/App/components'

const fs=require('fs');
const getFileList = require("../../services/getFileList.js");
const getKeyList = require("../../services/getKeyList.js");

// Get the default localization file 
const defaultLocalizationFile = require("../../../src/i18n/i18n-EN.json");
const defaultLocalizationKeys = getKeyList(defaultLocalizationFile, "", [])

// Get list of files potentially using localization keys
let fileList = getFileList(rootFolder, ".js")
const filesNumber = fileList.length


// Loop for non relevant keys
let UnusedKeyList = defaultLocalizationKeys
try {
    shortenKeyList(fileList, UnusedKeyList).then(remainingKeys => {
        console.log("* UNUSED KEYS")
        remainingKeys.forEach(key => {
            console.log("  - " + key)            
        })
        console.log("* SUMMARY")
        console.log("  - Total files : " + filesNumber)
        console.log("  - Total keys : " + defaultLocalizationKeys.length)
        console.log("  - Total unsued keys : " + Math.floor(remainingKeys.length / defaultLocalizationKeys.length * 100) + 
        "% (" + remainingKeys.length + ")")
        console.log("    (note : usused keys might be related to constructed keys)")
    })
}
catch(error) {
    console.log (error)
}

async function loadFileContent(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'binary', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

async function shortenKeyList (fileList, keyList) {
    let presentKeys = []
    return new Promise((resolve, reject) => {
        //console.log("shortenKeyList ", fileList[0])
        //console.log("  initial keys : ", keyList.length)
        loadFileContent(fileList[0]).then(data => {
            keyList.forEach(key => {
                if (data.includes(key)) {
                    presentKeys.push(key)
                }
            })
            let remainingKeys = keyList.filter(key => !presentKeys.includes(key))
            //console.log("  remaining keys : ", remainingKeys.length)
            if (fileList.length > 1) {
                resolve( shortenKeyList(fileList.splice(1), remainingKeys) )
            } else {
                resolve (remainingKeys)
            }
        })
    })
}
