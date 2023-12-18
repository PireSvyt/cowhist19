
// Services
import { appendObject } from "./toolkit.js";

describe("TEST OF SERVICE : toolkit", () => {
    describe("Assessment of appendObject", () => {
        describe("When appening an object with inexisting keys", () => {
            let aFirstObject = {
                fieldA: "A",
                field1: 1,
            }
            let aSecondObject = {
                fieldB: "B",
                field2: 2,
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test("then the resulting object the new keys", () => {
                expect(Object.keys(outcome).length).toBe(4);
            });
        });
        describe("When appening an object with a value being an object", () => {
            let aFirstObject = {
                fieldA: "A",
                field1: 1,
            }
            let aSecondObject = {
                fieldB: "B",
                fieldDict: {
                    field2 : 2
                },
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test("then the resulting object comes with a dict as child", () => {
                expect(outcome.fieldDict.field2).toBe(2);
            });
        });
        describe("When appening an object with multiple levels", () => {
            let aFirstObject = {
                level1: {
                    field1: 1,
                    level2: {
                        field2: 2
                    }
                }
            }
            let aSecondObject = {
                level1: {
                    field1: 11,
                    level2: {
                        field2: 12,
                        level3: {
                            field3: 13
                        }
                    }
                }
            }
            let outcome = appendObject(aFirstObject, aSecondObject)
            test("then the resulting object has values from second object", () => {
                expect(outcome.level1.field1).toBe(11);
                expect(outcome.level1.level2.field2).toBe(12);
            });
            test("then the resulting object comes with multiple levels", () => {
                expect(outcome.level1.level2.level3.field3).toBe(13);
            });
        });
    });
});