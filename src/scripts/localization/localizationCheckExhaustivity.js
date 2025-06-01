/**
 *
 * LOCALIZATION EXHAUSITIVY CHECK SCRIPT
 *
 * Provides for each alternative localizations
 *    - the percentage of missing keys compared to default localization
 *    - the percentage of no more relevant keys (since not defined in default localization)
 *    - the list of missing keys compared to default localization
 *    - the list of no more relevant keys (since not defined in default localization)
 *
 * Note : It is relevant to run the usage check script
 * and to replace the default localization file prior executing this script
 * (so that unused keys are not counted as missing localization)
 *
 * To run this script, come in the folder and execute "node localizationCheckUsage"
 *
 */

console.log('SCRIPT LOCALIZATION EXHAUSTIVITY CHECK')

// Helpers
const getKeyList = require('../_services/getKeyList.js')

// Localization folder
const rootFolder = 'C:/Users/pierre.savoyat/Documents/cowhist19/src/i18n'

// Get the default localization file
const defaultLocalizationFile = require(rootFolder + '/i18n-EN.json')
const defaultLocalizationKeys = getKeyList(defaultLocalizationFile, '', [])

// Get alternative localization files
let alternativeLocalizationKeys = {}
const alternativeLocalizations = ['FR']

const FRLocalizationFile = require(rootFolder + '/i18n-FR.json')
alternativeLocalizationKeys.FR = getKeyList(FRLocalizationFile, '', [])

// Loop for no more relevant keys
let ToDeleteKeyList = {}
alternativeLocalizations.forEach((localization) => {
    ToDeleteKeyList[localization] = []
    alternativeLocalizationKeys[localization].forEach((key) => {
        if (!defaultLocalizationKeys.includes(key)) {
            ToDeleteKeyList[localization].push(key)
        }
    })
})
console.log('* TO DELETE')
alternativeLocalizations.forEach((localization) => {
    console.log('  - ' + localization + ' file')
    ToDeleteKeyList[localization].forEach((key) => {
        console.log('     . ' + key)
    })
})

// Loop for missing keys
let MissingKeyList = {}
alternativeLocalizations.forEach((localization) => {
    MissingKeyList[localization] = []
    defaultLocalizationKeys.forEach((key) => {
        if (!alternativeLocalizationKeys[localization].includes(key)) {
            MissingKeyList[localization].push(key)
        }
    })
})
console.log('* TO ADD')
alternativeLocalizations.forEach((localization) => {
    console.log('  - ' + localization + ' file')
    MissingKeyList[localization].forEach((key) => {
        console.log('     . ' + key)
    })
})

// Summary
console.log('* SUMMARY')
console.log('  -  Missing keys :')
alternativeLocalizations.forEach((localization) => {
    console.log(
        '     . ' +
            localization +
            ' : ' +
            Math.floor(
                (MissingKeyList[localization].length /
                    defaultLocalizationKeys.length) *
                    100
            ) +
            '% (' +
            MissingKeyList[localization].length +
            ')'
    )
})
console.log('  -  To delete keys :')
alternativeLocalizations.forEach((localization) => {
    console.log(
        '     . ' +
            localization +
            ' : ' +
            Math.floor(
                (ToDeleteKeyList[localization].length /
                    alternativeLocalizationKeys[localization].length) *
                    100
            ) +
            '% (' +
            ToDeleteKeyList[localization].length +
            ')'
    )
})
