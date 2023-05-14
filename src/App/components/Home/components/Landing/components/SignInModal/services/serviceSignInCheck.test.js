require("@jest/globals");
import serviceSignInCheck from "./serviceSignInCheck.js";

// Resources
import emptySignin from "../../../../../../../shared/resources/emptySignIn.js";

describe("TEST OF SERVICE : serviceSignInCheck", () => {
  describe("Assessment of empty signin", () => {
    // Emptycase
    describe("When signin is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceSignInCheck(emptySignin);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceSignInCheck(emptySignin);
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
        expect(serviceOutcome.stateChanges.passwordError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceSignInCheck(emptySignin);
        expect(serviceOutcome.errors).toContain("signin.error.missinglogin");
        expect(serviceOutcome.errors).toContain("signin.error.missingpassword");
      });
    });
  });
  describe("Assessment of email check", () => {
    // Wrong email case
    const wrongEmailSignin = {
      login: "undefined",
      password: "undefined",
    };
    // Wrong email case
    const goodEmailSignin = {
      login: "exampleofemail@adomain.com",
      password: "undefined",
    };
    describe("When email is badly formed", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceSignInCheck(wrongEmailSignin);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceSignInCheck(wrongEmailSignin);
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceSignInCheck(wrongEmailSignin);
        expect(serviceOutcome.errors).toContain("signin-error.invalidlogin");
      });
    });
    describe("When email is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceSignInCheck(goodEmailSignin);
        expect(serviceOutcome.proceed).toBeTruthy();
      });
    });
  });
});
