require("@jest/globals");
import serviceTableSaveCheck from "./serviceTableSaveCheck.js";

// Resources
import emptyTable from "../resources/emptyTable.js";

describe("TEST OF SERVICE : serviceTableSaveCheck", () => {
  describe("Assessment of empty table", () => {
    // Emptycase
    describe("When signup is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceTableSaveCheck(emptyTable);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceTableSaveCheck(emptyTable);
        expect(serviceOutcome.stateChanges.nameError).toBeTruthy();
        expect(serviceOutcome.stateChanges.playersError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceTableSaveCheck(emptyTable);
        expect(serviceOutcome.errors).toContain("table.error.missingname");
        expect(serviceOutcome.errors).toContain(
          "table.error.creationwithoutplayers"
        );
      });
    });
  });
});
