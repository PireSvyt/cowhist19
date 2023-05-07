require("@jest/globals");
import serviceCanInvite from "./serviceCanInvite.js";

// Resources
import emptyUser from "../../../../../resources/emptyUser.js";

describe("TEST OF SERVICE : serviceCanInvite", () => {
  describe("Assessment of empty user", () => {
    // Emptycase
    describe("When user is empty", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceCanInvite(emptyUser);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then state changes are provided", () => {
        const serviceOutcome = serviceCanInvite(emptyUser);
        expect(serviceOutcome.stateChanges.pseudoError).toBeTruthy();
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
        expect(serviceOutcome.stateChanges.acknowledgementError).toBeTruthy();
      });
      test("then errors are provided", () => {
        const serviceOutcome = serviceCanInvite(emptyUser);
        expect(serviceOutcome.errors).toContain("invite-error-missingpseudo");
        expect(serviceOutcome.errors).toContain("invite-error-missinglogin");
        expect(serviceOutcome.errors).toContain(
          "invite-error-missingacknowledgement"
        );
      });
    });
  });
  describe("Assessment of login check", () => {
    // Wrong login case
    const wrongEmailUser = {
      pseudo: "undefined",
      login: "undefined",
      acknowledgement: true,
    };
    // Wrong login case
    const goodEmailUser = {
      pseudo: "undefined",
      login: "exampleofemail@adomain.com",
      acknowledgement: true,
    };
    describe("When login is badly formed", () => {
      test("then the proceed field is false", () => {
        const serviceOutcome = serviceCanInvite(wrongEmailUser);
        expect(serviceOutcome.proceed).toBeFalsy();
      });
      test("then the state changes is provided", () => {
        const serviceOutcome = serviceCanInvite(wrongEmailUser);
        expect(serviceOutcome.stateChanges.loginError).toBeTruthy();
      });
      test("then the error changes is provided", () => {
        const serviceOutcome = serviceCanInvite(wrongEmailUser);
        expect(serviceOutcome.errors).toContain("invite-error-invalidlogin");
      });
    });
    describe("When login is well formed", () => {
      test("then the proceed field is true", () => {
        const serviceOutcome = serviceCanInvite(goodEmailUser);
        expect(serviceOutcome.proceed).toBeTruthy();
      });
    });
  });
});
