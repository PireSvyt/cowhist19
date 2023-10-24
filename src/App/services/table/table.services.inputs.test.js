require("@jest/globals");
// Inputs
import {
  tableCreateInputs,
  tableSaveInputs,
  tableGetDetailsInputs,
  tableGetHistoryInputs,
  tableGetStatsInputs,
  tableDeleteInputs,
} from "./table.services.inputs.js";

describe("TEST OF INPUTS : table.services.inputs", () => {
    let inputs = [
        tableCreateInputs,
        tableSaveInputs,
        tableGetDetailsInputs,
        tableGetHistoryInputs,
        tableGetStatsInputs,
        tableDeleteInputs,
    ]
    inputs.forEach(input => {
        test("Mandatory inputs are available", () => {
            expect(Object.keys(input)).toContain("apicall");
            expect(Object.keys(input)).toContain("getmanageresponsefunction");            
        })
    });
});
