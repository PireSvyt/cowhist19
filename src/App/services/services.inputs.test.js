require("@jest/globals");
// Inputs
import {
  tableCreateInputs,
  tableSaveInputs,
  tableGetDetailsInputs,
  tableGetHistoryInputs,
  tableGetStatsInputs,
  tableDeleteInputs,
} from "./table/table.services.inputs.js";
import { gameCreateInputs } from "./game/game.services.inputs.js";

describe("TEST OF INPUTS : services.inputs", () => {
  let testInputs = {
    gameCreateInputs: gameCreateInputs,
    tableCreateInputs: tableCreateInputs,
    tableSaveInputs: tableSaveInputs,
    tableGetDetailsInputs: tableGetDetailsInputs,
    tableGetHistoryInputs: tableGetHistoryInputs,
    tableGetStatsInputs: tableGetStatsInputs,
    tableDeleteInputs: tableDeleteInputs,
  };
  let testLog = [];
  let input = undefined;
  Object.keys(testInputs).forEach((inputKey) => {
    input = testInputs[inputKey];
    test(inputKey + " / Mandatory inputs are available", () => {
      expect(Object.keys(input)).toContain("apicall");
      expect(Object.keys(input)).toContain("getmanageresponsefunction");
    });
    test(inputKey + " / Inputs meet expected format", () => {
      if (input.lockuifunction !== undefined) {
        expect(typeof input.lockuifunction).toBe("function");
      }
      if (input.unlockuifunction !== undefined) {
        expect(typeof input.unlockuifunction).toBe("function");
      }
      if (input.getinputsfunction !== undefined) {
        expect(typeof input.getinputsfunction).toBe("function");
      }
      if (input.wrappingfunction !== undefined) {
        expect(typeof input.wrappingfunction).toBe("function");
      }
      if (input.sercivechecks !== undefined) {
        expect(typeof input.sercivechecks).toBe("object");
      }
      if (input.getcheckoutcomedispatchfunction !== undefined) {
        expect(typeof input.getcheckoutcomedispatchfunction).toBe("function");
        expect(typeof input.getcheckoutcomedispatchfunction(testLog)).toBe(
          "string",
        );
      }
      if (input.repackagingfunction !== undefined) {
        expect(typeof input.repackagingfunction).toBe("function");
      }
      if (input.apicall !== undefined) {
        expect(typeof input.apicall).toBe("function");
      }
      if (input.getmanageresponsefunction !== undefined) {
        expect(typeof input.getmanageresponsefunction).toBe("function");
      }
    });
    test(inputKey + " / Checks meet expected format", () => {
      function testCheckFormat(check) {
        // Tests
        if (check.inputfield !== undefined) {
          expect(typeof check.inputfield).toBe("string");
        }
        expect(typeof check.error).toBe("string");
        if (check.fieldsinerror !== undefined) {
          expect(typeof check.fieldsinerror).toBe("object");
        }
        if (check.checkfunction !== undefined) {
          expect(typeof check.checkfunction).toBe("function");
        }
        if (check.confirmation !== undefined) {
          expect(typeof check.confirmation).toBe("string");
        }
        // Recursive management for subchecks
        if (check.subchecks !== undefined) {
          expect(typeof check.subchecks).toBe("object");
          check.subchecks.forEach((subcheck) => {
            testCheckFormat(subcheck);
          });
        }
      }
      input.sercivechecks.forEach((check) => {
        testCheckFormat(check);
      });
    });
  });
  //console.log("testLog",testLog)
});
