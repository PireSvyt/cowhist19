import serviceSignUp from "./serviceSignUp.js";

require("@jest/globals");

describe("TEST OF SERVICE : serviceSignUp", () => {
  let invalidUser = {
    pseudo: "undefined",
    login: "undefined",
    password1: "undefined",
    password2: "undefined",
  };
  describe("Assessment of invalid signup", () => {
    // Invalid change target
    const invalidTarget = {
      name: "invalid",
    };
    describe("When target name is invalid", () => {
      test("then errors are provided", () => {
        const serviceOutcome = serviceSignUp(invalidUser);
        console.log(serviceOutcome);
        expect(serviceOutcome.errors).toContain("generic-error-invalidchange");
      });
    });
  });

  describe("Assessment of pseudo change", () => {
    const pseudoTarget = {
      name: "pseudo",
      value: "pseudo",
    };
    describe("When pseudo is changed", () => {
      test("then the error flag is removed via state change", () => {
        const serviceOutcome = serviceSignUp(pseudoTarget, emptySignup);
        expect(serviceOutcome.stateChanges.pseudoError).toBeFalsy();
      });
      test("then the pseudo value is the event target value", () => {
        const serviceOutcome = serviceSignUp(pseudoTarget, emptySignup);
        expect(serviceOutcome.newValue.pseudo).toBe(pseudoTarget.value);
      });
    });
  });
});

// 201 409 400 invalid
