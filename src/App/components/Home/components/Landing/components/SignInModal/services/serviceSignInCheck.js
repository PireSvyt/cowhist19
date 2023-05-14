// Share
import { validateEmail } from "../../../../../../../shared/services/toolkit.js";

function serviceSignInCheck(signin) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignInCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Login is empty?
  if (signin.login === "" || signin.login === undefined) {
    proceed = false;
    errors.push("signin.error.missinglogin");
    stateChanges.loginError = true;
  } else {
    // Login is an email?
    if (!validateEmail(signin.login)) {
      proceed = false;
      errors.push("signin.error.invalidlogin");
      stateChanges.loginError = true;
    }
  }

  // Password is empty?
  if (signin.password === "" || signin.password === undefined) {
    proceed = false;
    errors.push("signin.error.missingpassword");
    stateChanges.passwordError = true;
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceSignInCheck;
