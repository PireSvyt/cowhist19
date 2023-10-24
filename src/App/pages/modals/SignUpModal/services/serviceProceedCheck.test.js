require("@jest/globals");
import serviceProceedCheck from "./serviceProceedCheck.js";

// Resources
//import emptySignup from "../../../../../../../shared/resources/emptySignUp.js";

let emptySignup = {};

describe.skip("TEST OF SERVICE : serviceProceedCheck", () => {
  describe("Assessment of empty signup", () => {
    // Emptycase
    describe("When signup is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(emptySignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceProceedCheck(emptySignup);
        expect(serviceOutcome.stateChanges.pseudoError).toBeTruthy();
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
        expect(serviceOutcome.stateChanges.passwordError).toBeTruthy();
        expect(serviceOutcome.stateChanges.repeatpasswordError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceProceedCheck(emptySignup);
        expect(serviceOutcome.errors).toContain("signup.error.missingpseudo");
        expect(serviceOutcome.errors).toContain("signup.error.missinglogin");
        expect(serviceOutcome.errors).toContain("signup.error.missingpassword");
        expect(serviceOutcome.errors).toContain(
          "signup.error.missingrepeatpassword",
        );
      });
    });
  });
  describe("Assessment of email check", () => {
    // Wrong email case
    const wrongEmailSignup = {
      pseudo: "undefined",
      login: "undefined",
      password: "undefined",
      repeatpassword: "undefined",
    };
    // Wrong email case
    const goodEmailSignup = {
      pseudo: "undefined",
      login: "exampleofemail@adomain.com",
      password: "undefined",
      repeatpassword: "undefined",
    };
    describe("When email is badly formed", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(wrongEmailSignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(wrongEmailSignup);
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(wrongEmailSignup);
        expect(serviceOutcome.errors).toContain("signup.error.invalidlogin");
      });
    });
    describe("When email is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceProceedCheck(goodEmailSignup);
        expect(serviceOutcome.proceed).toBeTruthy();
      });
    });
  });
  describe("Assessment of password match", () => {
    // Inconsistent password
    const passwordMissmatchSignup = {
      pseudo: "undefined",
      login: "exampleofemail@adomain.com",
      password: "password1",
      repeatpassword: "password2",
    };
    // Wrong email case
    const passwordMatchSignup = {
      pseudo: "undefined",
      login: "exampleofemail@adomain.com",
      password: "undefined",
      repeatpassword: "undefined",
    };
    describe("When passwords missmatch", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceProceedCheck(passwordMissmatchSignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(passwordMissmatchSignup);
        expect(serviceOutcome.stateChanges.repeatpasswordError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceProceedCheck(passwordMissmatchSignup);
        expect(serviceOutcome.errors).toContain(
          "signup.error.passwordmissmatch",
        );
      });
    });
    describe("When email is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceProceedCheck(passwordMatchSignup);
        expect(serviceOutcome.proceed).toBeTruthy();
      });
    });
  });
});
