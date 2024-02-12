// Services
import {
    appendObject,
    isDefined,
    isNonNull,
    isEmpty,
    isNotEmpty,
    validateEmail,
    validatePassword,
} from './toolkit.js'

describe('TEST OF SERVICE : toolkit', () => {
    describe('A. appendObject', () => {
        describe('1. When appening an object with inexisting keys', () => {
            let aFirstObject = {
                fieldA: 'A',
                field1: 1,
            }
            let aSecondObject = {
                fieldB: 'B',
                field2: 2,
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test('a. then the resulting object the new keys', () => {
                expect(Object.keys(outcome).length).toBe(4)
            })
        })
        describe('2. When appening an object with a value being an object', () => {
            let aFirstObject = {
                fieldA: 'A',
                field1: 1,
            }
            let aSecondObject = {
                fieldB: 'B',
                fieldDict: {
                    field2: 2,
                },
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test('a. then the resulting object comes with a dict as child', () => {
                expect(outcome.fieldDict.field2).toBe(2)
            })
        })
        describe('3. When appening an object with multiple levels', () => {
            let aFirstObject = {
                level1: {
                    field1: 1,
                    level2: {
                        field2: 2,
                    },
                },
            }
            let aSecondObject = {
                level1: {
                    field1: 11,
                    level2: {
                        field2: 12,
                        level3: {
                            field3: 13,
                        },
                    },
                },
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test('a. then the resulting object has values from second object', () => {
                expect(outcome.level1.field1).toBe(11)
                expect(outcome.level1.level2.field2).toBe(12)
            })
            test('b. then the resulting object comes with multiple levels', () => {
                expect(outcome.level1.level2.level3.field3).toBe(13)
            })
        })
    })
    describe('B. isDefined', () => {
        describe('1. When an item is undefined', () => {
            test('a. then the outcome is false', () => {
                expect(isDefined(undefined)).toBeFalsy()
                expect(isDefined()).toBeFalsy()
            })
        })
        describe('2. When an item is defined', () => {
            test('a. then the outcome is true', () => {
                expect(isDefined(123)).toBeTruthy()
                expect(isDefined('123')).toBeTruthy()
                expect(isDefined([123])).toBeTruthy()
                expect(isDefined({ a: 123 })).toBeTruthy()
            })
        })
    })
    describe('C. isNonNull', () => {
        describe('1. When an item is undefined', () => {
            test('a. then the outcome is false', () => {
                expect(isNonNull(undefined)).toBeUndefined()
                expect(isNonNull()).toBeUndefined()
            })
        })
        describe('2. When an item is null', () => {
            test('a. then the outcome is false', () => {
                expect(isNonNull(null)).toBeFalsy()
            })
        })
        describe('3. When an item is defined', () => {
            test('a. then the outcome is true', () => {
                expect(isNonNull(123)).toBeTruthy()
                expect(isNonNull('123')).toBeTruthy()
                expect(isNonNull([123])).toBeTruthy()
                expect(isNonNull({ a: 123 })).toBeTruthy()
            })
        })
    })
    describe('D. isEmpty', () => {
        describe('1. When an item is undefined', () => {
            test('a. then the outcome is false', () => {
                expect(isEmpty(undefined)).toBeUndefined()
                expect(isEmpty()).toBeUndefined()
            })
        })
        describe('2. When an item is null', () => {
            test('a. then the outcome is false', () => {
                expect(isEmpty(null)).toBeUndefined()
            })
        })
        describe('3. When an item is empty', () => {
            test('a. then the outcome is true', () => {
                expect(isEmpty(NaN)).toBeTruthy()
                expect(isEmpty('')).toBeTruthy()
                expect(isEmpty([])).toBeTruthy()
                expect(isEmpty({})).toBeTruthy()
            })
        })
        describe('4. When an item is not emtpy', () => {
            test('a. then the outcome is false', () => {
                expect(isEmpty(123)).toBeFalsy()
                expect(isEmpty('123')).toBeFalsy()
                expect(isEmpty([123])).toBeFalsy()
                expect(isEmpty({ a: 123 })).toBeFalsy()
            })
        })
    })
    describe('E. isNotEmpty', () => {
        describe('1. When an item is undefined', () => {
            test('a. then the outcome is false', () => {
                expect(isNotEmpty(undefined)).toBeUndefined()
                expect(isNotEmpty()).toBeUndefined()
            })
        })
        describe('2. When an item is null', () => {
            test('a. then the outcome is false', () => {
                expect(isNotEmpty(null)).toBeUndefined()
            })
        })
        describe('3. When an item is empty', () => {
            test('a. then the outcome is false', () => {
                expect(isNotEmpty(NaN)).toBeFalsy()
                expect(isNotEmpty('')).toBeFalsy()
                expect(isNotEmpty([])).toBeFalsy()
                expect(isNotEmpty({})).toBeFalsy()
            })
        })
        describe('4. When an item is not emtpy', () => {
            test('a. then the outcome is true', () => {
                expect(isNotEmpty(123)).toBeTruthy()
                expect(isNotEmpty('123')).toBeTruthy()
                expect(isNotEmpty([123])).toBeTruthy()
                expect(isNotEmpty({ a: 123 })).toBeTruthy()
            })
        })
    })
    describe('F. validateEmail', () => {
        describe('1. When email does not match constrains', () => {
            test('a. then the outcome is false', () => {
                expect(validateEmail('youplaATboum.bim')).toBeFalsy()
                expect(validateEmail('youpla@boumbim')).toBeFalsy()
                expect(validateEmail('youpla@boum.')).toBeFalsy()
                expect(validateEmail('@boum.bim')).toBeFalsy()
                expect(validateEmail('youpla@.bim')).toBeFalsy()
            })
        })
        describe('2. When email matches constrains', () => {
            test('a. then the outcome is true', () => {
                expect(validateEmail('youpla@boum.bim')).toBeTruthy()
            })
        })
    })
    describe('G. validatePassword', () => {
        describe('1. When password does not match constrains', () => {
            test('a. then the outcome is false', () => {
                // Length is not met
                expect(validatePassword('1bC&')).toBeFalsy()
                expect(
                    validatePassword(
                        "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&'()*+,"
                    )
                ).toBeFalsy()
                // Length + 1 constrain
                expect(validatePassword('1234567890')).toBeFalsy()
                expect(validatePassword('abcdefghij')).toBeFalsy()
                expect(validatePassword('ABCDEFGHIJ')).toBeFalsy()
                expect(validatePassword("#$%&'()*+,")).toBeFalsy()
                // Length + 2 constrain
                expect(validatePassword('12345fghij')).toBeFalsy()
                expect(validatePassword('12345FGHIJ')).toBeFalsy()
                expect(validatePassword('12345()*+,')).toBeFalsy()
                expect(validatePassword('abcdeFGHIJ')).toBeFalsy()
                expect(validatePassword('abcde()*+,')).toBeFalsy()
                expect(validatePassword('ABCDE()*+,')).toBeFalsy()
            })
        })
        describe('2. When password matches constrains', () => {
            test('a. then the outcome is true', () => {
                // Length + 3 constrains
                expect(validatePassword('12cdEFGHIJ')).toBeTruthy()
                expect(validatePassword("12cd'()*+,")).toBeTruthy()
                // Length + 4 constrains
                expect(validatePassword('12cdEF)*+,')).toBeTruthy()
            })
        })
    })
})
