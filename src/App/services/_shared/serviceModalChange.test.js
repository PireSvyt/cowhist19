require("@jest/globals");
import serviceModalChange from "./serviceModalChange.js";

describe("TEST OF SERVICE : serviceModalChange", () => {
  let dictToChange = {};
  describe("Assessment of invalid change", () => {
    // Invalid change target
    const invalidTarget = {
      name: "invalid",
    };
    describe("When target name is invalid", () => {
      test("then errors are provided", () => {
        const serviceOutcome = serviceModalChange(invalidTarget, dictToChange);
        expect(serviceOutcome.errors).toContain("generic.error.invalidchange");
      });
    });
  });

  describe("Assessment of valid changes", () => {
    const testcases = [
      {
        label: "pseudo",
        inputs: {
          name: "pseudo",
          value: "pseudo",
        },
        outputs: {
          statechange: "pseudoError",
          newvalue: "pseudo",
        },
      },
      {
        label: "login",
        inputs: {
          name: "login",
          value: "login",
        },
        outputs: {
          statechange: "loginError",
          newvalue: "login",
        },
      },
      {
        label: "password",
        inputs: {
          name: "password",
          value: "password",
        },
        outputs: {
          statechange: "passwordError",
          newvalue: "password",
        },
      },
      {
        label: "repeatpassword",
        inputs: {
          name: "repeatpassword",
          value: "repeatpassword",
        },
        outputs: {
          statechange: "repeatpasswordError",
          newvalue: "repeatpassword",
        },
      },
      {
        label: "name",
        inputs: {
          name: "name",
          value: "name",
        },
        outputs: {
          statechange: "nameError",
          newvalue: "name",
        },
      },
      {
        label: "acknowledgement",
        inputs: {
          name: "acknowledgement",
          checked: true,
        },
        outputs: {
          statechange: "acknowledgementError",
          newvalue: true,
        },
      },
    ];
    describe.each(testcases)("When changing", (testcase, expected) => {
      test(
        testcase.label + ", then the error flag is removed via state change",
        () => {
          const serviceOutcome = serviceModalChange(
            testcase.inputs,
            dictToChange
          );
          expect(
            serviceOutcome.stateChanges[testcase.outputs.statechange]
          ).toBeFalsy();
        }
      );
      test(
        testcase.label + ", then the new value is the event target value",
        () => {
          const serviceOutcome = serviceModalChange(
            testcase.inputs,
            dictToChange
          );
          expect(serviceOutcome.newValue[testcase.outputs.newvalue]).toBe(
            testcase.inputs.value
          );
        }
      );
    });
  });
});
