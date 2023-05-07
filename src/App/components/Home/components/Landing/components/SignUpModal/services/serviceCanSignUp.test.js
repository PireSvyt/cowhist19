require("@jest/globals");
import serviceCanSignUp from "./serviceCanSignUp.js";

// Resources
import emptySignup from "../../../../../../../shared/resources/emptySignUp.js";

describe("TEST OF SERVICE : serviceCanSignUp", () => {
  describe("Assessment of empty signup", () => {
    // Emptycase
    describe("When signup us empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceCanSignUp(emptySignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceCanSignUp(emptySignup);
        expect(serviceOutcome.stateChanges.pseudoError).toBeTruthy();
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
        expect(serviceOutcome.stateChanges.passwordError).toBeTruthy();
        expect(serviceOutcome.stateChanges.repeatpasswordError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceCanSignUp(emptySignup);
        expect(serviceOutcome.errors).toContain("signup-error-missingpseudo");
        expect(serviceOutcome.errors).toContain("signup-error-missinglogin");
        expect(serviceOutcome.errors).toContain("signup-error-missingpassword");
        expect(serviceOutcome.errors).toContain(
          "signup-error-missingrepeatpassword"
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
        const serviceOutcome = serviceCanSignUp(wrongEmailSignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceCanSignUp(wrongEmailSignup);
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceCanSignUp(wrongEmailSignup);
        expect(serviceOutcome.errors).toContain("signup-error-invalidlogin");
      });
    });
    describe("When email is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceCanSignUp(goodEmailSignup);
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
        const serviceOutcome = serviceCanSignUp(passwordMissmatchSignup);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceCanSignUp(passwordMissmatchSignup);
        expect(serviceOutcome.stateChanges.repeatpasswordError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceCanSignUp(passwordMissmatchSignup);
        expect(serviceOutcome.errors).toContain(
          "signup-error-passwordmissmatch"
        );
      });
    });
    describe("When email is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceCanSignUp(passwordMatchSignup);
        expect(serviceOutcome.proceed).toBeTruthy();
      });
    });
  });
});
