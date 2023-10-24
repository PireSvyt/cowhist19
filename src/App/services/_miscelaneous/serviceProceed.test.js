require("@jest/globals");
// Reducers
import appStore from "../../store/appStore.js";

// Services
import serviceProceed from "./serviceProceed.js";

describe("TEST OF SERVICE : serviceProceed", () => {
  describe("Assessment of unsupported scope", () => {
    describe("When scope is unsupported", () => {
      test("then only the unsupported scope log is available", async () => {
        let log = [];
        await serviceProceed("unknownscope", log);
        //console.log("log",log)
        expect(log.length).toBe(1);
        expect(log[0].tags).toContain("out of scope");
      });
    });
  });
  describe("Assessment proceeding", () => {
    describe("When proceeding is successful", () => {
      test("then all functions are called", async () => {
        let log = [];
        await serviceProceed("test", log);
        //console.log("log",log)
        expect(
          log.filter((l) => {
            return l.message.includes("serviceProceed.lockuifunction");
          }).length,
        ).toBe(1);
        //expect(log.filter(l => {return l.message.includes("serviceProceed.unlockuifunction")}).length).toBe(1)
        expect(
          log.filter((l) => {
            return l.message.includes("serviceProceed.getinputsfunction");
          }).length,
        ).toBe(1);
        expect(
          log.filter((l) => {
            return l.message.includes("serviceProceed.repackagingfunction");
          }).length,
        ).toBe(1);
        expect(
          log.filter((l) => {
            return l.message.includes(
              "serviceProceed.getcheckoutcomedispatchfunction",
            );
          }).length,
        ).toBe(1);
        expect(
          log.filter((l) => {
            return l.message.includes("serviceProceed.apicall");
          }).length,
        ).toBe(1);
        expect(
          log.filter((l) => {
            return l.message.includes(
              "serviceProceed.getmanageresponsefunction",
            );
          }).length,
        ).toBe(1);
        expect(
          log.filter((l) => {
            return l.message.includes("serviceProceed.manageresponse.success");
          }).length,
        ).toBe(1);
      });
    });
  });
});
