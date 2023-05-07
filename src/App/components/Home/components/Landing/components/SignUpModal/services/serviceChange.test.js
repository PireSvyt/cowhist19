import serviceChange from "./serviceChange.js";

require("@jest/globals");

describe("TEST OF SERVICE : serviceChange", () => {
  let emptySignup = {
    pseudo: undefined,
    login: undefined,
    password1: undefined,
    password2: undefined,
  };
  describe("Assessment of invalid change", () => {
    // Invalid change target
    const invalidTarget = {
      name: "invalid",
    };
    describe("When target name is invalid", () => {
      test("then errors are provided", () => {
        const serviceOutcome = serviceChange(invalidTarget, emptySignup);
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
        const serviceOutcome = serviceChange(pseudoTarget, emptySignup);
        expect(serviceOutcome.stateChanges.pseudoError).toBeFalsy();
      });
      test("then the pseudo value is the event target value", () => {
        const serviceOutcome = serviceChange(pseudoTarget, emptySignup);
        expect(serviceOutcome.newValue.pseudo).toBe(pseudoTarget.value);
      });
    });
  });

  describe("Assessment of login change", () => {
    const loginTarget = {
      name: "login",
      value: "login",
    };
    describe("When login is changed", () => {
      test("then the error flag is removed via state change", () => {
        const serviceOutcome = serviceChange(loginTarget, emptySignup);
        expect(serviceOutcome.stateChanges.loginError).toBeFalsy();
      });
      test("then the pseudo value is the event target value", () => {
        const serviceOutcome = serviceChange(loginTarget, emptySignup);
        expect(serviceOutcome.newValue.login).toBe(loginTarget.value);
      });
    });
  });

  describe("Assessment of password1 change", () => {
    const password1Target = {
      name: "password1",
      value: "password1",
    };
    describe("When password1 is changed", () => {
      test("then the error flag is removed via state change", () => {
        const serviceOutcome = serviceChange(password1Target, emptySignup);
        expect(serviceOutcome.stateChanges.password1Error).toBeFalsy();
      });
      test("then the pseudo value is the event target value", () => {
        const serviceOutcome = serviceChange(password1Target, emptySignup);
        expect(serviceOutcome.newValue.password1).toBe(password1Target.value);
      });
    });
  });

  describe("Assessment of password2 change", () => {
    const password2Target = {
      name: "password2",
      value: "password2",
    };
    describe("When password2 is changed", () => {
      test("then the error flag is removed via state change", () => {
        const serviceOutcome = serviceChange(password2Target, emptySignup);
        expect(serviceOutcome.stateChanges.password2Error).toBeFalsy();
      });
      test("then the password2 value is the event target value", () => {
        const serviceOutcome = serviceChange(password2Target, emptySignup);
        expect(serviceOutcome.newValue.password2).toBe(password2Target.value);
      });
    });
  });
});
