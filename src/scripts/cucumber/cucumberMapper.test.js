const fs = require('fs-extra')
const stream = require('stream')
const path = require('path')

const {
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
    componentObject,
    componentSteps,
    boxObject,
    boxSteps,
    textObject,
    textSteps,
    inputsObject,
    inputsSteps,
    checkboxesObject,
    checkboxesSteps,
    selectsObject,
    selectsSteps,
    slidersObject,
    slidersSteps,
    listObject,
    listSteps,
} = require('./cucumberMappper.js')

describe('TEST OF SERVICE : cucumberMappper', () => {
    describe('A. getDataTestidPositions', () => {
        describe('1. When data test id is found', () => {
            test('a. then its position is send back in a list', () => {
                let astirng = '<Box \n        data-testid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                //console.log("astringpos",astringpos)
                expect(astringpos.proceed).toBeTruthy()
                expect(astringpos.positions.length).toBe(1)
                expect(astringpos.positions[0]).toBe(14)
            })
        })
        describe('2. When no data test id is found', () => {
            test('a. then no position is provided and no need to proceed', () => {
                let astirng = '<Box \n        tada-bestid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                //console.log("astringpos",astringpos)
                expect(astringpos.proceed).toBeFalsy()
                expect(astringpos.positions.length).toBe(0)
            })
        })
    })

    describe('B. getConsolidatedDataTestid', () => {
        describe('1. When position is empty', () => {
            test('a. then type shall be null', () => {
                let astirng = '<Box \n        tada-bestid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                //console.log("consolidatedDataTestid",consolidatedDataTestid)
                expect(consolidatedDataTestid.type).toBeNull()
            })
        })
        describe('2. When position is relevant', () => {
            test('a. then appropriate information are captured', () => {
                let astirng = '<Box \n        data-testid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                //console.log("consolidatedDataTestid",consolidatedDataTestid)
                expect(consolidatedDataTestid.type).toBe('page')
                expect(consolidatedDataTestid.parent).toBe('App')
                expect(consolidatedDataTestid.datatestid).toBe('page-home')
                expect(consolidatedDataTestid.parametric).toBeFalsy()
                expect(consolidatedDataTestid.tag).toBe('home')
                expect(consolidatedDataTestid.uTag).toBe('Home')
            })
        })
    })

    describe('C. steps', () => {
        describe('1. pageSteps', () => {
            describe('a. When page steps are created', () => {
                let astirng = '<Box \n        data-testid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringPageSteps = pageSteps('test', consolidatedDataTestid)
                //console.log("stringPageSteps",stringPageSteps)

                test('then it enables navigating to page', () => {
                    expect(
                        stringPageSteps.includes('navigateToPage')
                    ).toBeTruthy()
                })
                test('then it enables asserting page is visible', () => {
                    expect(
                        stringPageSteps.includes('assertPageIsVisible')
                    ).toBeTruthy()
                })
                test('then it enables asserting page is not visible', () => {
                    expect(
                        stringPageSteps.includes('assertPageIsHidden')
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringPageSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('2. modalSteps', () => {
            describe('a. When modal steps are created', () => {
                let astirng = '<Box \n        data-testid="modal-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringModalSteps = modalSteps(
                    'test',
                    consolidatedDataTestid
                )
                //console.log("stringModalSteps",stringModalSteps)

                test('then it enables asserting modal is visible', () => {
                    expect(
                        stringModalSteps.includes('assertModalIsVisible')
                    ).toBeTruthy()
                })
                test('then it enables asserting modal is not visible', () => {
                    expect(
                        stringModalSteps.includes('assertModalIsHidden')
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringModalSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('3. componentSteps', () => {
            describe('When component steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringComponentSteps = componentSteps(
                    'test',
                    consolidatedDataTestid
                )
                //console.log("stringComponentSteps",stringComponentSteps)

                test('then it enables asserting modal is visible', () => {
                    expect(
                        stringComponentSteps.includes(
                            'assertComponentNameIsVisible'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting modal is not visible', () => {
                    expect(
                        stringComponentSteps.includes(
                            'assertComponentNameIsHidden'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(
                        stringComponentSteps.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('4. boxSteps', () => {
            describe('When box steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#box-box name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringBoxSteps = boxSteps('test', consolidatedDataTestid)
                //console.log("stringBoxSteps",stringBoxSteps)

                test('then it enables asserting modal is visible', () => {
                    expect(
                        stringBoxSteps.includes('assertBoxNameIsVisible')
                    ).toBeTruthy()
                })
                test('then it enables asserting modal is not visible', () => {
                    expect(
                        stringBoxSteps.includes('assertBoxNameIsHidden')
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringBoxSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('5. textSteps', () => {
            describe('When text steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#text-text name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringTextSteps = textSteps('test', consolidatedDataTestid)
                //console.log("stringTextSteps",stringTextSteps)

                test('then it enables asserting text content', () => {
                    expect(
                        stringTextSteps.includes('test.assertTextTextNameIs')
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringTextSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('6. inputsSteps', () => {
            describe('When input steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#input-input name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringInputsSteps = inputsSteps('test', [
                    consolidatedDataTestid,
                ])
                //console.log("stringInputsSteps",stringInputsSteps)

                test('then it enables filling input', () => {
                    expect(
                        stringInputsSteps.includes('test.inputFill')
                    ).toBeTruthy()
                })
                test('then it enables clicking input', () => {
                    expect(
                        stringInputsSteps.includes('test.inputInputNameClick')
                    ).toBeTruthy()
                })
                test('then it enables asserting input is in error', () => {
                    expect(
                        stringInputsSteps.includes(
                            'test.assertInputInputNameIsError'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringInputsSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('7. checkboxesSteps', () => {
            describe('When checkbox steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#input-input name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringCheckboxesSteps = checkboxesSteps('test', [
                    consolidatedDataTestid,
                ])
                //console.log("stringCheckboxesSteps",stringCheckboxesSteps)

                test('then it enables filling checkbox', () => {
                    expect(
                        stringCheckboxesSteps.includes('test.checkboxFill')
                    ).toBeTruthy()
                })
                test('then it enables clicking checkbox', () => {
                    expect(
                        stringCheckboxesSteps.includes(
                            'test.checkboxInputNameClick'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting checkbox is in error', () => {
                    expect(
                        stringCheckboxesSteps.includes(
                            'test.assertCheckboxInputNameIsError'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting checkbox is not in error', () => {
                    expect(
                        stringCheckboxesSteps.includes(
                            'test.assertCheckboxInputNameIsNotError'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(
                        stringCheckboxesSteps.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('8. selectsSteps', () => {
            describe('When checkbox steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#select-select name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringSelectsSteps = selectsSteps('test', [
                    consolidatedDataTestid,
                ])
                //console.log("stringSelectsSteps",stringSelectsSteps)

                test('then it enables filling select', () => {
                    expect(
                        stringSelectsSteps.includes('test.selectFill')
                    ).toBeTruthy()
                })
                test('then it enables clicking select', () => {
                    expect(
                        stringSelectsSteps.includes(
                            'test.selectSelectNameClick'
                        )
                    ).toBeTruthy()
                })
                test('then it enables clicking an item from the select', () => {
                    expect(
                        stringSelectsSteps.includes(
                            'test.selectSelectNameClickItem'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting select is in error', () => {
                    expect(
                        stringSelectsSteps.includes(
                            'test.assertSelectSelectNameIsError'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting select is not in error', () => {
                    expect(
                        stringSelectsSteps.includes(
                            'test.assertSelectSelectNameIsNotError'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringSelectsSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('9. slidersSteps', () => {
            describe('When checkbox steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#slider-slider name"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringSlidersSteps = slidersSteps('test', [
                    consolidatedDataTestid,
                ])
                //console.log("stringSlidersSteps",stringSlidersSteps)

                test('then it enables filling slider', () => {
                    expect(
                        stringSlidersSteps.includes('test.sliderFill')
                    ).toBeTruthy()
                })
                test('then it enables clicking slider', () => {
                    expect(
                        stringSlidersSteps.includes(
                            'test.sliderSliderNameClick'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting slider is in error', () => {
                    expect(
                        stringSlidersSteps.includes(
                            'test.assertSliderSliderNameIsError'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting slider is not in error', () => {
                    expect(
                        stringSlidersSteps.includes(
                            'test.assertSliderSliderNameIsNotError'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringSlidersSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('10. listSteps', () => {
            describe('When checkbox steps are created', () => {
                let astirng =
                    '<Box \n        data-testid="component-component name#list-LISTNAME"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringListSteps = listSteps('test', consolidatedDataTestid)
                //console.log("stringListSteps",stringListSteps)

                test('then it enables clicking a list item', () => {
                    expect(
                        stringListSteps.includes('test.clickLISTNAMEItem')
                    ).toBeTruthy()
                })
                test('then it enables asserting list is empty', () => {
                    expect(
                        stringListSteps.includes('test.assertLISTNAMEIsEmpty')
                    ).toBeTruthy()
                })
                test('then it enables asserting list is not empty', () => {
                    expect(
                        stringListSteps.includes(
                            'test.assertLISTNAMEIsNotEmpty'
                        )
                    ).toBeTruthy()
                })
                test('then it enables asserting list contains an item', () => {
                    expect(
                        stringListSteps.includes(
                            'test.assertLISTNAMEContainsItem'
                        )
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringListSteps.includes('undefined')).toBeFalsy()
                })
            })
        })
    })

    describe('D. objects', () => {
        describe('1. pageObject', () => {
            describe('When a page object is created', () => {
                let astirng = '<Box \n        data-testid="page-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringPageObject = pageObject(consolidatedDataTestid)
                //console.log("stringPageObject",stringPageObject)

                test('then it enables navigating to page', () => {
                    expect(
                        stringPageObject.includes('navigateToPage')
                    ).toBeTruthy()
                })
                test('then it enables asserting page is visible', () => {
                    expect(
                        stringPageObject.includes('assertPageIsVisible')
                    ).toBeTruthy()
                })
                test('then it enables asserting page is not visible', () => {
                    expect(
                        stringPageObject.includes('assertPageIsHidden')
                    ).toBeTruthy()
                })

                test('then it does not come with undefined fields', () => {
                    expect(stringPageObject.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('2. modalObject', () => {
            describe('When a modal object is created', () => {
                let astirng = '<Box \n        data-testid="modal-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringModalObject = modalObject(consolidatedDataTestid)
                //console.log("stringModalObject",stringModalObject)

                test('then it does not come with undefined fields', () => {
                    expect(stringModalObject.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('3. boxObject', () => {
            describe('When a box object is created', () => {
                let astirng = '<Box \n        data-testid="box-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringBoxObject = boxObject(consolidatedDataTestid)
                //console.log("stringBoxObject",stringBoxObject)

                test('then it does not come with undefined fields', () => {
                    expect(stringBoxObject.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('4. componentObject', () => {
            describe('When a component object is created', () => {
                let astirng = '<Box \n        data-testid="modal-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringComponentObject = componentObject(
                    consolidatedDataTestid
                )
                //console.log("stringComponentObject",stringComponentObject)

                test('then it does not come with undefined fields', () => {
                    expect(
                        stringComponentObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('5. textObject', () => {
            describe('When a text object is created', () => {
                let astirng = '<Box \n        data-testid="modal-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringTextObject = textObject(consolidatedDataTestid)
                //console.log("stringTextObject",stringTextObject)

                test('then it does not come with undefined fields', () => {
                    expect(stringTextObject.includes('undefined')).toBeFalsy()
                })
            })
        })
        describe('6. inputsObject', () => {
            describe('When an input object is created', () => {
                let astirng = '<Box \n        data-testid="input-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringInputsObject = inputsObject([consolidatedDataTestid])
                //console.log("stringInputsObject",stringInputsObject)

                let cleanedStringInputsObject = stringInputsObject.replace(
                    '!== undefined',
                    ' ISDEFINED'
                )
                //console.log("cleanedStringInputsObject",cleanedStringInputsObject)

                test('then it does not come with undefined fields', () => {
                    expect(
                        cleanedStringInputsObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('7. checkboxesObject', () => {
            describe('When a checkbox object is created', () => {
                let astirng =
                    '<Box \n        data-testid="checkbox-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringCheckboxesObject = checkboxesObject([
                    consolidatedDataTestid,
                ])
                //console.log("stringCheckboxesObject",stringCheckboxesObject)

                let cleanedStringCheckboxesObject =
                    stringCheckboxesObject.replace(
                        '!== undefined',
                        ' ISDEFINED'
                    )
                //console.log("cleanedStringCheckboxesObject",cleanedStringCheckboxesObject)

                test('then it does not come with undefined fields', () => {
                    expect(
                        cleanedStringCheckboxesObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('8. selectsObject', () => {
            describe('When a select object is created', () => {
                let astirng =
                    '<Box \n        data-testid="select-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringSelectsObject = selectsObject([
                    consolidatedDataTestid,
                ])
                //console.log("stringSelectsObject",stringSelectsObject)

                let cleanedStringSelectsObject = stringSelectsObject.replace(
                    '!== undefined',
                    ' ISDEFINED'
                )
                //console.log("cleanedStringSelectsObject",cleanedStringSelectsObject)

                test('then it does not come with undefined fields', () => {
                    expect(
                        cleanedStringSelectsObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('9. slidersObject', () => {
            describe('When a slider object is created', () => {
                let astirng =
                    '<Box \n        data-testid="slider-home"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringSlidersObject = slidersObject([
                    consolidatedDataTestid,
                ])
                //console.log("stringSlidersObject",stringSlidersObject)

                let cleanedStringSlidersObject = stringSlidersObject.replace(
                    '!== undefined',
                    ' ISDEFINED'
                )
                //console.log("cleanedStringSlidersObject",cleanedStringSlidersObject)

                test('then it does not come with undefined fields', () => {
                    expect(
                        cleanedStringSlidersObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
        describe('1O listObject', () => {
            describe('When a list object is created', () => {
                let astirng =
                    '<Box \n        data-testid="box-home#list-LISTNAME"\n      >'
                let astringpos = getDataTestidPositions(astirng)
                let consolidatedDataTestid = getConsolidatedDataTestid(
                    astirng,
                    astringpos.positions[0]
                )
                let stringListObject = listObject(consolidatedDataTestid)
                //console.log("consolidatedDataTestid",consolidatedDataTestid)
                //console.log("stringListObject",stringListObject)

                let cleanedStringListObject = stringListObject.replace(
                    '!== undefined',
                    ' ISDEFINED'
                )
                //console.log("cleanedStringListObject",cleanedStringListObject)
                test('then it does not come with undefined fields', () => {
                    expect(
                        cleanedStringListObject.includes('undefined')
                    ).toBeFalsy()
                })
            })
        })
    })

    describe.skip('E. mapped files', () => {
        describe('1. step files', () => {
            describe('When step files are mapped', () => {
                const dir = './src/scripts/cucumber/features/steps/'
                async function checkIfFileContainsUndefined(file) {
                    console.log('checkIfFileContainsUndefined', file)
                    // build the full path of the file
                    const filePath = await path.join(dir, file)
                    // get the file stats
                    await fs.stat(filePath, async (error, fileStat) => {
                        if (error) {
                            console.error('catch error : ', error)
                            throw error
                        }
                        // if the file is a directory, recursively search the directory
                        if (fileStat.isDirectory()) {
                            // nothing
                        } else if (file.endsWith('*steps.js')) {
                            // if the file is a match
                            let fileStream = fs.createReadStream(filePath)
                            let fileData = ''
                            fileStream.on('data', (chunk) => {
                                fileData += chunk
                            })
                            await fileStream.on('end', async () => {
                                let cleanedFileData = await fileData.replace(
                                    '!== undefined',
                                    ' ISDEFINED'
                                )
                                console.log('cleanedFileData', cleanedFileData)
                                await expect(
                                    cleanedFileData.includes('undefined')
                                ).toBeFalsy()
                                return
                            })
                        }
                        return
                    })
                    return
                }
                //
                test("then files don't come with undefined fields", async () => {
                    await fs.readdir(dir, async (error, files) => {
                        if (error) {
                            console.error('catch error : ', error)
                            throw error
                        }
                        // search through the files
                        for await (const file of files) {
                            console.log('checkIfFileContainsUndefined', file)
                            await checkIfFileContainsUndefined(file)
                        }
                        return
                    })
                })
            })
        })
        describe('2. object files', () => {
            describe('When object files are mapped', () => {
                test.skip("then they don't come with undefined fields", () => {
                    expect(stringPageObject.includes('undefined')).toBeFalsy()
                })
            })
        })
    })
})
