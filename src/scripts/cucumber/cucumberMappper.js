const fs = require('fs-extra')
const stream = require('stream')
const path = require('path')

let appRootFolder = path.join(path.dirname(__dirname), '/src/App')
let outputFolder = path.join(path.dirname(__dirname), '/cucumber/features/')
let fileCollection = {}
let supportedTypes = [
    'page',
    'modal',
    'component',
    'box',
    'text',
    'button',
    'select',
    'input',
    'slider',
    'checkbox',
    'list',
    'listitem',
]

let debugSearchAndMapFiles = false
let debugMapFile = false
let debugMap = false
let debugPositions = false
let debugConsolidation = false

async function mapTestIdsIntoCucumberStepsAndObjects() {
    console.log('SCRIPT map.component')
    try {
        searchAndMapFiles('./src/App', '.js')
        console.log('SCRIPT done.')
    } catch (error) {
        console.error('SCRIPT.catch error : ', error)
        throw err
    }
}
function searchAndMapFiles(dir, fileName) {
    // https://medium.com/@fullstacktips/how-to-search-for-a-specific-file-recursively-using-node-js-a6318d31f2fc#:~:text=js%2C%20you%20can%20use%20the,through%20the%20directories%20and%20subdirectories.

    // read the contents of the directory
    fs.readdir(dir, async (error, files) => {
        if (error) {
            console.error('searchAndMapFiles.catch error : ', error)
            throw error
        }
        // search through the files
        for (const file of files) {
            // build the full path of the file
            const filePath = path.join(dir, file)
            // get the file stats
            fs.stat(filePath, async (error, fileStat) => {
                if (error) {
                    console.error('searchAndMapFiles.catch error : ', error)
                    throw error
                }
                // if the file is a directory, recursively search the directory
                if (fileStat.isDirectory()) {
                    if (debugSearchAndMapFiles) {
                        console.log('searching folder : ' + filePath)
                    }
                    searchAndMapFiles(filePath, fileName)
                } else if (file.endsWith(fileName)) {
                    // if the file is a match
                    if (debugSearchAndMapFiles) {
                        console.log('mapping file : ' + file)
                    }
                    mapFile(filePath, file)
                }
            })
        }
    })
}
function mapFile(filePath, fileName) {
    if (debugMapFile) {
        console.log('mapFile ', fileName)
    }

    let fileStream = fs.createReadStream(filePath)
    let fileData = ''
    fileStream.on('data', (chunk) => {
        fileData += chunk
    })
    fileStream.on('end', async () => {
        let mapping = mapFileData(fileData, fileName.split('.')[0])
        if (mapping.proceed) {
            // Object file
            let objectFileName = fileName.split('.')[0] + '.object.js'
            let objectFileLoc = path.join(
                outputFolder + 'steps/objects/',
                objectFileName
            )
            if (debugMapFile) {
                console.log('objectFileLoc', objectFileLoc)
            }
            await fs.ensureFile(objectFileLoc).catch((err) => console.log)
            let objectStream = fs.createWriteStream(objectFileLoc, {
                encoding: 'binary',
                flags: 'w',
            })
            let objectBuffer = Buffer.from(mapping.object)
            objectStream.write(
                objectBuffer,
                'binary'
                //e=>console.log('script mapped object ' + fileName.split(".")[0] + ' in ' + objectFileName + '\n')
            )

            // Steps file
            let stepsFileName = fileName.split('.')[0] + '.steps.js'
            let stepsFileLoc = path.join(outputFolder + 'steps/', stepsFileName)
            if (debugMapFile) {
                console.log('stepsFileLoc', stepsFileLoc)
            }
            await fs.ensureFile(stepsFileLoc).catch((err) => console.log)
            let stepsStream = fs.createWriteStream(stepsFileLoc, {
                encoding: 'binary',
                flags: 'w',
            })
            let stepsBuffer = Buffer.from(mapping.steps)
            stepsStream.write(
                stepsBuffer,
                'binary'
                //e=>console.log('script mapped steps ' + fileName.split(".")[0] + ' in ' + stepsFileName + '\n')
            )
        }
    })
}
function mapFileData(data, name) {
    if (debugMap && name === 'About') {
        console.log('\n' + 'map ', name)
    }

    // Enablers
    let functionList = []
    let objinst = name.charAt(0).toLowerCase() + name.slice(1)
    let obj = objectsHeader(name)
    let stp = stepsHeader(name, objinst)
    let testidPositions = getDataTestidPositions(data)

    // Identify all functions
    testidPositions.positions.forEach((idpos) => {
        functionList.push(getConsolidatedDataTestid(data, idpos))
    })
    if (debugMap && name === 'About') {
        console.log('\n' + name + '.functionList', functionList)
    }

    // Map all functions
    let automatedFunctions = automateFunctions(objinst, functionList)
    obj += automatedFunctions.objects
    stp += automatedFunctions.steps
    if (debugMap && name === 'About') {
        console.log('\n' + name + '.stp', stp)
    }

    // Footer
    obj += objectsFooter(name)

    return {
        proceed: testidPositions.proceed,
        object: obj,
        steps: stp,
    }
}
function objectsHeader(name) {
    return (
        'const { expect } = require("@playwright/test")' +
        '\nconst { setDefaultTimeout } = require("@cucumber/cucumber")' +
        '\nconst { scenari } = require("../../scenari.js")' +
        '\n\nsetDefaultTimeout(scenari.timeout("' +
        name +
        '") * 1000)' +
        '\n\n// Automated generation of functions from data-testid' +
        '\n' +
        'class ' +
        name +
        ' {\n'
    )
}
function objectsFooter(name) {
    return '}\n' + '\n\nmodule.exports = { ' + name + ' }'
}
function stepsHeader(name, objinst) {
    return (
        'const { Given, When, Then } = require("@cucumber/cucumber")' +
        //"\nconst env = require(\"../env.json\")" +
        '\nconst { ' +
        name +
        ' } = require("./objects/' +
        name +
        '.object.js")' +
        '\nconst { scenari } = require("../scenari.js")' +
        //"\nconst { random_id } = require(\"../../../../../src/App/_shared/_services/toolkit.js\")" +
        '\n\nconst ' +
        objinst +
        ' = new ' +
        name +
        '()' +
        //"\nObject.keys(env).forEach(k => {" +
        //"\n\t" + objinst + "[k] = env[k]" +
        //"\n})" +
        '\n\n// Automated generation of functions from data-testid\n'
    )
}
function getDataTestidPositions(data) {
    let dataidpos = []
    let proceed = true
    let idx = data.indexOf('data-testid=')
    while (idx !== -1) {
        dataidpos.push(idx)
        idx = data.indexOf('data-testid=', idx + 1)
    }
    if (dataidpos.length === 0) {
        proceed = false
    }
    if (debugPositions) {
        console.log('getDataTestidPositions.positions', dataidpos)
        console.log('getDataTestidPositions.proceed', proceed)
    }
    return {
        positions: dataidpos,
        proceed: proceed,
    }
}
function getConsolidatedDataTestid(data, idpos) {
    let datatestid = null
    let parametric = false
    let testidItems = []
    let parent = null

    // Extract test id
    let idend = data.indexOf('"', idpos + 14)
    datatestid = data.substring(idpos + 12, idend)
    if (datatestid.includes('{')) {
        idend = data.indexOf('}', idpos + 13)
        let idendCandidate = data.indexOf('"}', idpos + 13)
        if (idendCandidate < idend && idendCandidate > 0) {
            idend = idendCandidate
        }
        datatestid = data.substring(idpos + 14, idend)
        // Variability patterns
        // list-players#listitem-"+props.index+"#button-remove player
        // '+parameter+'
        datatestid = datatestid.replace('"+props.index+"', '"+parameter+"')

        parametric = true
    } else {
        datatestid = data.substring(idpos + 13, idend)
    }
    if (debugConsolidation) {
        console.log('datatestid', datatestid)
    }

    // Extract items
    testidItems = datatestid.split('#')
    let testidItem = []
    if (testidItems.length === 1) {
        testidItem = testidItems[0].split('-')
        parent = 'App'
    }
    if (testidItems.length === 2) {
        testidItem = testidItems[1].split('-')
        parent = testidItems[0].split('-')[1]
    }
    if (testidItems.length === 3 && parametric === true) {
        testidItem = testidItems[2].split('-')
        parent = testidItems[0].split('-')[1]
    }
    if (debugConsolidation) {
        console.log('testidItem', testidItem)
        console.log('parent', parent)
    }

    // id and tag management
    let componentTag = testidItem[1]
    let componentCapitalTag = uTag(componentTag)
    let componentType = null

    // Item management
    if (supportedTypes.includes(testidItem[0])) {
        componentType = testidItem[0]
    }

    return {
        type: componentType,
        parent: parent,
        datatestid: datatestid,
        parametric: parametric,
        tag: componentTag,
        uTag: componentCapitalTag,
    }
}
function automateFunctions(objinst, functionList) {
    //console.log("automateFunctions.functionList", objinst, functionList)

    let stp = ''
    let obj = ''

    let supportedTypeSteps = {
        page: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += pageSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        modal: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += modalSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        component: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += componentSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        box: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += boxSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        text: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += textSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        list: (objinst, supportedFunctions) => {
            let stepsContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                stepsContent += listSteps(objinst, supportedFunction)
            })
            return stepsContent
        },
        listitem: (supportedFunctions) => {
            return ''
        },
        input: (objinst, supportedFunctions) => {
            return inputsSteps(objinst, supportedFunctions)
        },
        checkbox: (objinst, supportedFunctions) => {
            return checkboxesSteps(objinst, supportedFunctions)
        },
        select: (objinst, supportedFunctions) => {
            return selectsSteps(objinst, supportedFunctions)
        },
        slider: (objinst, supportedFunctions) => {
            return slidersSteps(objinst, supportedFunctions)
        },
        button: (objinst, supportedFunctions) => {
            return buttonsSteps(objinst, supportedFunctions)
        },
    }

    let supportedTypeObject = {
        page: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += pageObject(supportedFunction)
            })
            return objectContent
        },
        modal: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += modalObject(supportedFunction)
            })
            return objectContent
        },
        component: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += componentObject(supportedFunction)
            })
            return objectContent
        },
        box: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += boxObject(supportedFunction)
            })
            return objectContent
        },
        text: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += textObject(supportedFunction)
            })
            return objectContent
        },
        list: (supportedFunctions) => {
            let objectContent = ''
            supportedFunctions.forEach((supportedFunction) => {
                objectContent += listObject(supportedFunction)
            })
            return objectContent
        },
        listitem: (supportedFunctions) => {
            return ''
        },
        input: (supportedFunctions) => {
            return inputsObject(supportedFunctions)
        },
        checkbox: (supportedFunctions) => {
            return checkboxesObject(supportedFunctions)
        },
        select: (supportedFunctions) => {
            return selectsObject(supportedFunctions)
        },
        slider: (supportedFunctions) => {
            return slidersObject(supportedFunctions)
        },
        button: (supportedFunctions) => {
            return buttonsObject(supportedFunctions)
        },
    }

    supportedTypes.forEach((supportedType) => {
        //console.log("automateFunctions.supportedType " + supportedType)
        let supportedFunctions = functionList.filter(
            (func) => func.type === supportedType
        )
        if (supportedFunctions.length > 0) {
            stp += supportedTypeSteps[supportedType](
                objinst,
                supportedFunctions
            )
            if (debugMap && objinst === 'about') {
                console.log(
                    '\n' + objinst + ' object .stp after ' + supportedType,
                    stp
                )
            }
            obj += supportedTypeObject[supportedType](supportedFunctions)
        }
    })

    return {
        steps: stp,
        objects: obj,
    }
}
function uTag(tag) {
    //console.log("uTag", tag)
    let tagPieces = tag.split(' ')
    tagPieces = tagPieces.map(
        (piece) => piece.charAt(0).toUpperCase() + piece.slice(1)
    )
    let uTag = ''
    tagPieces.forEach((captialPiece) => (uTag += captialPiece))
    return uTag
}

// PAGE & MODAL
// page
function pageObject(func) {
    return (
        '\n\t// Page\n' +
        '\tasync navigateToPage() {\n' +
        '\t\tawait global.page.goto(scenari.paths.root+scenari.paths["' +
        func.tag +
        '"])\n' +
        '\t}\n' +
        '\tasync assertPageIsVisible() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeVisible()\n' +
        '\t}\n' +
        '\tasync assertPageIsHidden() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeHidden()\n' +
        '\t}\n'
    )
}
function pageSteps(objinst, func) {
    return (
        '\n// Page' +
        '\nGiven("I open ' +
        func.tag +
        ' page", async () => {' +
        '\n\tawait ' +
        objinst +
        '.navigateToPage()' +
        '\n\tawait ' +
        objinst +
        '.assertPageIsVisible()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' page should be visible", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assertPageIsVisible()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' page should be hidden", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assertPageIsHidden()' +
        '\n})\n'
    )
}
// modal
function modalObject(func) {
    return (
        '\n\t// Modal visibility\n' +
        '\tasync assertModalIsVisible() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeVisible()\n' +
        '\t}\n' +
        '\tasync assertModalIsHidden() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeHidden()\n' +
        '\t}\n'
    )
}
function modalSteps(objinst, func) {
    return (
        '\n// Modal visibility' +
        '\nThen("' +
        func.tag +
        ' modal should be visible", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assertModalIsVisible()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' modal should be hidden", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assertModalIsHidden()' +
        '\n})\n'
    )
}

// BUTTONS
// button
function buttonsObject(funcs) {
    let obj = '\n\n\t// Buttons\n'
    funcs.forEach((func) => {
        if (func.parametric) {
            obj +=
                '\tasync click' +
                func.uTag +
                '(parameter, by) {\n' +
                '\t\tawait global.page.locator("[data-testid=\'' +
                func.datatestid +
                '\']").click()\n' +
                '\t}\n'
        } else {
            obj +=
                '\tasync click' +
                func.uTag +
                '() {\n' +
                '\t\tawait global.page.getByTestId("' +
                func.datatestid +
                '").click()\n' +
                '\t}\n'
        }
    })
    return obj
}
function buttonsSteps(objinst, funcs) {
    let obj = '\n\n// Buttons'
    funcs.forEach((func) => {
        let parameter = {
            when: '',
            param: '',
        }
        if (func.parametric !== undefined) {
            if (func.parametric) {
                parameter = {
                    when: ' {string} by {string}',
                    param: 'parameter, by',
                }
            }
        }
        obj +=
            '\nWhen("I click ' +
            func.tag +
            parameter.when +
            ' button from ' +
            func.parent +
            '", async (' +
            parameter.param +
            ') => {\n' +
            '\tawait ' +
            objinst +
            '.click' +
            func.uTag +
            '(' +
            parameter.param +
            ')\n' +
            '})'
    })
    return obj + '\n'
}

// INPUTS
// input
function inputsObject(funcs) {
    // Input fill
    let obj = '\n\t// Inputs\n' + '\tasync inputFill(inputs) {\n'
    funcs.forEach((func) => {
        obj +=
            '\t\tif (inputs.' +
            func.uTag +
            ' !== undefined) {\n' +
            '\t\t\tawait global.page\n' +
            '\t\t\t\t.locator("data-testid=' +
            func.datatestid +
            ' >> input")\n' +
            '\t\t\t\t.fill(inputs.' +
            func.uTag +
            ')\n' +
            '\t\t}\n'
    })
    obj += '\t}'

    // Input click
    funcs.forEach((func) => {
        obj +=
            '\n\tasync input' +
            func.uTag +
            'Click() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
        obj +=
            '\n\tasync input' +
            func.uTag +
            'ClickItem(index) {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
    })

    // Input error
    funcs.forEach((func) => {
        obj +=
            '\n\tasync assertInput' +
            func.uTag +
            'IsError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"[data-testid=\'' +
            func.datatestid +
            '\'] >> input"' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "true");' +
            '\n\t}'
        obj +=
            '\n\tasync assertInput' +
            func.uTag +
            'IsNotError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"[data-testid=\'' +
            func.datatestid +
            '\'] >> input"' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "false");' +
            '\n\t}'
    })
    obj += '\n'
    return obj
}
function inputsSteps(objinst, funcs) {
    let steps = ''
    if (funcs.length > 0) {
        // Input fill
        steps =
            '\n// Inputs\n' +
            'When("I fill ' +
            funcs[0].parent +
            ' inputs with {string}", async function (scenario) {' +
            '\n\tawait ' +
            objinst +
            '.inputFill(scenari["' +
            funcs[0].parent +
            '"][scenario]().inputs)' +
            '\n})'
        // Input clicks
        funcs.forEach((func) => {
            steps +=
                '\nWhen("I click ' +
                func.tag +
                ' input from ' +
                funcs[0].parent +
                '", async function () {' +
                '\n\tawait ' +
                objinst +
                '.input' +
                func.uTag +
                'Click()' +
                '\n})'
            steps +=
                '\nWhen("I click item {string} of ' +
                func.tag +
                ' input list from ' +
                funcs[0].parent +
                '", async function (index) {' +
                '\n\tawait ' +
                objinst +
                '.input' +
                func.uTag +
                'ClickItem(index)' +
                '\n})'
        })
        // Input error
        funcs.forEach((func) => {
            steps +=
                '' +
                '\nThen("' +
                func.tag +
                ' input should be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertInput' +
                func.uTag +
                'IsError()' +
                '\n})' +
                '\nThen("' +
                func.tag +
                ' input should not be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertInput' +
                func.uTag +
                'IsNotError()' +
                '\n})'
        })
        steps += '\n'
    }
    return steps
}
// checkbox
function checkboxesObject(funcs) {
    let obj = '\n\t// Checkboxes\n' + '\tasync checkboxFill(inputs) {\n'
    funcs.forEach((func) => {
        obj +=
            '\t\tif (inputs.' +
            func.uTag +
            ' !== undefined) {\n' +
            '\t\t\tawait global.page\n' +
            '\t\t\t\t.locator("[data-testid=\'' +
            func.datatestid +
            '\'] >> input")\n' +
            '\t\t\t\t.setChecked(inputs.' +
            func.uTag +
            ')\n' +
            '\t\t}\n'
    })
    obj += '\t}'

    // Input click
    funcs.forEach((func) => {
        obj +=
            '\n\tasync checkbox' +
            func.uTag +
            'Click() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"[data-testid=\'' +
            func.datatestid +
            '\'] >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).check();' +
            '\n\t}'
    })

    // Input error
    funcs.forEach((func) => {
        obj +=
            '\n\tasync assertCheckbox' +
            func.uTag +
            'IsError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"[data-testid=\'' +
            func.datatestid +
            '\'] >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "true");' +
            '\n\t}'
        obj +=
            '\n\tasync assertCheckbox' +
            func.uTag +
            'IsNotError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"[data-testid=\'' +
            func.datatestid +
            '\'] >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "false");' +
            '\n\t}'
    })
    obj += '\n'
    return obj
}
function checkboxesSteps(objinst, funcs) {
    let steps = ''
    if (funcs.length > 0) {
        // Input fill
        steps =
            '\n// Checkboxes\n' +
            'When("I fill ' +
            funcs[0].parent +
            ' checkboxes with {string}", async function (scenario) {' +
            '\n\tawait ' +
            objinst +
            '.checkboxFill(scenari["' +
            funcs[0].parent +
            '"][scenario]().checkboxes)' +
            '\n})'
        // Input clicks
        funcs.forEach((func) => {
            steps +=
                '\nWhen("I click ' +
                func.tag +
                ' checkbox from ' +
                funcs[0].parent +
                '", async function () {' +
                '\n\tawait ' +
                objinst +
                '.checkbox' +
                func.uTag +
                'Click()' +
                '\n})'
            /*steps += "\nWhen(\"I click item {string} of " + func.tag + " checkbox list in " + funcs[0].parent + "\", async function (index) {" + 
            "\n\tawait " + objinst + ".checkbox" + func.uTag + "ClickItem(index)" +
            "\n})"*/
        })
        // Input error
        funcs.forEach((func) => {
            steps +=
                '' +
                '\nThen("' +
                func.tag +
                ' checkbox should be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertCheckbox' +
                func.uTag +
                'IsError()' +
                '\n})' +
                '\nThen("' +
                func.tag +
                ' checkbox should not be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertCheckbox' +
                func.uTag +
                'IsNotError()' +
                '\n})'
        })
        steps += '\n'
    }
    return steps
}
// select
function selectsObject(funcs) {
    // Input fill
    let obj = '\n\t// Selects\n' + '\tasync selectFill(inputs) {\n'
    funcs.forEach((func) => {
        obj +=
            '\t\tif (inputs.' +
            func.uTag +
            ' !== undefined) {\n' +
            '\t\t\tawait global.page\n' +
            '\t\t\t\t.locator("data-testid=' +
            func.datatestid +
            ' >> input")\n' +
            '\t\t\t\t.fill(inputs.' +
            func.uTag +
            ')\n' +
            '\t\t}\n'
    })
    obj += '\t}'

    // Input click
    funcs.forEach((func) => {
        obj +=
            '\n\tasync select' +
            func.uTag +
            'Click() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
        /*obj += "\n\tasync select" + uTag + "ClickItem(index) {" +
            "\n\t\tconst element = await global.page.locator(" +
            "\n\t\t\t\"data-testid=" + func.datatestid + " >> data-testid=ArrowDropDownIcon\"," +
            "\n\t\t)" +
            "\n\t\tawait expect(element).click();" +
            "\n\t}"*/
        obj +=
            '\n\tasync select' +
            func.uTag +
            'ClickItem(index) {' +
            '\n\t\tawait global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> data-testid=ArrowDropDownIcon",' +
            '\n\t\t).click()' +
            '\n\t\tconst element = await global.page' +
            '\n\t\t\t.locator("div[id=\'menu-' +
            func.tag +
            '\']")' +
            '\n\t\t\t.locator("data-value="+index)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
    })

    // Input error
    funcs.forEach((func) => {
        obj +=
            '\n\tasync assertSelect' +
            func.uTag +
            'IsError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "true");' +
            '\n\t}'
        obj +=
            '\n\tasync assertSelect' +
            func.uTag +
            'IsNotError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "false");' +
            '\n\t}'
    })
    obj += '\n'
    return obj
}
function selectsSteps(objinst, funcs) {
    let steps = ''
    if (funcs.length > 0) {
        // Input fill
        steps +=
            '\n// Selects\n' +
            'When("I fill ' +
            funcs[0].parent +
            ' dropdowns with {string}", async function (scenario) {' +
            '\n\tawait ' +
            objinst +
            '.selectFill(scenari["' +
            funcs[0].parent +
            '"][scenario]().dropdowns)' +
            '\n})'
        // Input clicks
        funcs.forEach((func) => {
            steps +=
                '\nWhen("I click ' +
                func.tag +
                ' from dropdown list from ' +
                funcs[0].parent +
                '", async function () {' +
                '\n\tawait ' +
                objinst +
                '.select' +
                func.uTag +
                'Click()' +
                '\n})'
            steps +=
                '\nWhen("I click item {string} of ' +
                func.tag +
                ' dropdown list from ' +
                funcs[0].parent +
                '", async function (index) {' +
                '\n\tawait ' +
                objinst +
                '.select' +
                func.uTag +
                'ClickItem(index)' +
                '\n})'
            steps +=
                '' +
                '\nThen("' +
                func.tag +
                ' dropdown should be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertSelect' +
                func.uTag +
                'IsError()' +
                '\n})' +
                '\nThen("' +
                func.tag +
                ' dropdown should not be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertSelect' +
                func.uTag +
                'IsNotError()' +
                '\n})'
        })
        steps += '\n'
    }
    return steps
}
// slider
function slidersObject(funcs) {
    // Input fill
    let obj = '\n\t// Sliders\n' + '\tasync sliderFill(inputs) {\n'
    funcs.forEach((func) => {
        obj +=
            '\t\tif (inputs.' +
            func.uTag +
            ' !== undefined) {\n' +
            '\t\t\tawait global.page\n' +
            '\t\t\t\t.locator("data-testid=' +
            func.datatestid +
            ' >> input")\n' +
            '\t\t\t\t.fill(inputs.' +
            func.uTag +
            ')\n' +
            '\t\t}\n'
    })
    obj += '\t}'

    // Input click
    funcs.forEach((func) => {
        obj +=
            '\n\tasync slider' +
            func.uTag +
            'Click() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
        obj +=
            '\n\tasync slider' +
            func.uTag +
            'ClickItem(index) {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).click();' +
            '\n\t}'
    })

    // Input error
    funcs.forEach((func) => {
        obj +=
            '\n\tasync assertSlider' +
            func.uTag +
            'IsError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "true");' +
            '\n\t}'
        obj +=
            '\n\tasync assertSlider' +
            func.uTag +
            'IsNotError() {' +
            '\n\t\tconst element = await global.page.locator(' +
            '\n\t\t\t"data-testid=' +
            func.datatestid +
            ' >> input",' +
            '\n\t\t)' +
            '\n\t\tawait expect(element).toHaveAttribute("aria-invalid", "false");' +
            '\n\t}'
    })
    obj += '\n'
    return obj
}
function slidersSteps(objinst, funcs) {
    let steps = ''
    if (funcs.length > 0) {
        // Input fill
        steps =
            '\n// Sliders\n' +
            'When("I fill ' +
            funcs[0].parent +
            ' sliders with {string}", async function (scenario) {' +
            '\n\tawait ' +
            objinst +
            '.sliderFill(scenari["' +
            funcs[0].parent +
            '"][scenario]().sliders)' +
            '\n})'
        // Input clicks
        funcs.forEach((func) => {
            steps +=
                '\nWhen("I click ' +
                func.tag +
                ' from slider list from ' +
                funcs[0].parent +
                '", async function () {' +
                '\n\tawait ' +
                objinst +
                '.slider' +
                func.uTag +
                'Click()' +
                '\n})'
            /*steps += "\nWhen(\"I click item {string} of " + func.tag + " slider list in " + funcs[0].parent + "\", async function (index) {" + 
            "\n\tawait " + objinst + ".slider" + func.uTag + "ClickItem(index)" +
            "\n})"*/
        })
        // Input error
        funcs.forEach((func) => {
            steps +=
                '' +
                '\nThen("' +
                func.tag +
                ' slider should be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertSlider' +
                func.uTag +
                'IsError()' +
                '\n})' +
                '\nThen("' +
                func.tag +
                ' slider should not be in error from ' +
                funcs[0].parent +
                '", async () => {' +
                '\n\tawait ' +
                objinst +
                '.assertSlider' +
                func.uTag +
                'IsNotError()' +
                '\n})'
        })
        steps += '\n'
    }
    return steps
}

// CONTAINERS
// box
function boxObject(func) {
    return (
        '\n\t// Box ' +
        func.tag +
        ' visibility\n' +
        '\tasync assert' +
        func.uTag +
        'IsVisible() {\n' +
        '\t\tconst element = await global.page.locator("[data-testid=\'' +
        func.datatestid +
        '\']")\n' +
        '\t\tawait expect(element).toBeVisible()\n' +
        '\t}\n' +
        '\tasync assert' +
        func.uTag +
        'IsHidden() {\n' +
        '\t\tconst element = await global.page.locator("[data-testid=\'' +
        func.datatestid +
        '\']")\n' +
        '\t\tawait expect(element).toBeHidden()\n' +
        '\t}\n'
    )
}
function boxSteps(objinst, func) {
    return (
        '\n// Box ' +
        func.tag +
        ' visibility' +
        '\nThen("' +
        func.tag +
        ' should be visible", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsVisible()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' should be hidden", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsHidden()' +
        '\n})\n'
    )
}
// component
function componentObject(func) {
    return (
        '\n\t// Component ' +
        func.tag +
        '\n' +
        '\tasync assert' +
        func.uTag +
        'IsVisible() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeVisible()\n' +
        '\t}\n' +
        '\tasync assert' +
        func.uTag +
        'IsHidden() {\n' +
        '\t\tconst element = await global.page.getByTestId("' +
        func.datatestid +
        '")\n' +
        '\t\tawait expect(element).toBeHidden()\n' +
        '\t}\n'
    )
}
function componentSteps(objinst, func) {
    return (
        '\n// Component' +
        func.tag +
        '' +
        '\nThen("' +
        func.tag +
        ' should be visible", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsVisible()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' should be hidden", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsHidden()' +
        '\n})\n'
    )
}
// text
function textObject(func) {
    return (
        '\tasync assertText' +
        func.uTag +
        'Is(value) {' +
        '\n\t\tconst element = await global.page.locator("[data-testid=\'' +
        func.datatestid +
        '\']").innerText()' +
        '\n\t\tawait expect(element).toBe(value)' +
        '\n\t}'
    )
}
function textSteps(objinst, func) {
    return (
        '\nThen("' +
        func.tag +
        ' of ' +
        func.parent +
        ' should be {string}", async (value) => {' +
        '\n\tawait ' +
        objinst +
        '.assertText' +
        func.uTag +
        'Is(value)' +
        '\n})'
    )
}

// LIST & LISTITEM
// list
function listObject(func) {
    console.log('listObject.func', func)
    return (
        '\n\t// List ' +
        func.tag +
        '\n' +
        //"\tasync click" + func.uTag + "Item(parameter,by) {\n" +
        '\tasync click' +
        func.uTag +
        'Item(parameter) {\n' +
        /*"\t\tswitch (by) {\n" + 
        "\t\t\tcase \"index\":\n" + 
        "\t\t\t\tawait global.page.locator(\"div[data-testid='list-" + func.parent + "#listitem-\"+parameter+\"']\").click()\n" + 
        "\t\t\t\tbreak\n" + 
        "\t\t\tcase \"text\":\n" + */
        //"\t\t\t\tawait global.page.getByTestId('list-" + func.parent + "').getByText(parameter).click()\n" +
        //"\t\t\t\tawait global.page.locator('" + func.datatestid + "').getByText(parameter).click()\n" +
        //"\t\t\t\tawait global.page.locator(\"div[data-testid='" + func.datatestid + "']\").getByText(parameter).click()\n" +
        //"\t\tawait global.page.locator(\"div[data-testid='list-" + func.tag + "#listitem-\"+parameter+\"']\").click()\n" +
        '\t\tawait global.page.locator("[data-testid=\'list-' +
        func.tag +
        '#listitem-"+parameter+"\']").click()\n' +
        /*"\t\t\t\tbreak\n" + 
        "\t\t\tdefault:\n" + 
        "\t\t\t\tconsole.error('Click list item by ' + by + ' is not supported')\n" + 
        "\t\t\t\tbreak\n" + 
        "\t\t}\n" +*/
        '\t}\n' +
        '\tasync assert' +
        func.uTag +
        'IsEmpty() {\n' +
        "\t\tconst element = await global.page.getByTestId('list-" +
        func.tag +
        "#listitem-0')\n" +
        '\t\tawait expect(element).toBeHidden()\n' +
        '\t}\n' +
        '\tasync assert' +
        func.uTag +
        'IsNotEmpty() {\n' +
        "\t\tconst element = await global.page.getByTestId('list-" +
        func.tag +
        "#listitem-0')\n" +
        '\t\tawait expect(element).toBeVisible()\n' +
        '\t}\n' +
        '\tasync assert' +
        func.uTag +
        'ContainsItem(parameter,by) {\n' +
        '\t\tlet itemCount = -1\n' +
        '\t\tswitch (by) {\n' +
        '\t\t\tcase "index":\n' +
        "\t\t\t\titemCount = await global.page.getByTestId('list-" +
        func.tag +
        "#listitem-'+parameter+'').count()\n" +
        '\t\t\t\tbreak\n' +
        '\t\t\tcase "text":\n' +
        '\t\t\t\titemCount = await global.page.locator("div[data-testid=\'' +
        func.datatestid +
        '\']").getByText(parameter).count()\n' +
        '\t\t\t\tbreak\n' +
        '\t\t\tdefault:\n' +
        "\t\t\t\tconsole.error('assert list contains by ' + by + ' is not supported')\n" +
        '\t\t\t\tbreak\n' +
        '\t\t}\n' +
        '\t\tawait expect(itemCount).toBe(1)\n' +
        '\t}\n'
    )
}
function listSteps(objinst, func) {
    return (
        '\n// List ' +
        func.tag +
        '\nWhen("I click item {int} of ' +
        func.tag +
        ' list from ' +
        func.parent +
        '", async (item) => {\n' +
        '\tawait ' +
        objinst +
        '.click' +
        func.uTag +
        'Item(item)\n' +
        '})' +
        /*"\tawait " + objinst + ".click" + func.uTag + "Item(item, \"index\")\n" + 
        "})" + 
        "\nWhen(\"I click item {string} of " + func.tag + " list from " + func.parent + "\", async (item) => {\n" + 
        "\tawait " + objinst + ".click" + func.uTag + "Item(item, \"text\")\n" + 
        "})" + 
        "\nWhen(\"I click item {string} by {string} of " + func.tag + " list from " + func.parent + "\", async (item) => {\n" + 
        "\tawait " + objinst + ".click" + func.uTag + "Item(item, by)\n" + 
        "})" + */
        '\nThen("' +
        func.tag +
        ' list from ' +
        func.parent +
        ' should be empty", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsEmpty()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' list from ' +
        func.parent +
        ' should not be empty", async () => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'IsNotEmpty()' +
        '\n})' +
        '\nThen("' +
        func.tag +
        ' list from ' +
        func.parent +
        ' should contain {string} by {string}", async (item, by) => {' +
        '\n\tawait ' +
        objinst +
        '.assert' +
        func.uTag +
        'ContainsItem(item, by)' +
        '\n})' +
        '\n'
    )
}

module.exports = {
    mapTestIdsIntoCucumberStepsAndObjects,
    searchAndMapFiles,
    mapFile,
    mapFileData,
    objectsHeader,
    objectsFooter,
    stepsHeader,
    getDataTestidPositions,
    automateFunctions,
    uTag,
    getConsolidatedDataTestid,
    pageObject,
    pageSteps,
    modalObject,
    modalSteps,
    inputsObject,
    inputsSteps,
    checkboxesObject,
    checkboxesSteps,
    selectsObject,
    selectsSteps,
    slidersObject,
    slidersSteps,
    boxObject,
    boxSteps,
    componentObject,
    componentSteps,
    textObject,
    textSteps,
    listObject,
    listSteps,
}
