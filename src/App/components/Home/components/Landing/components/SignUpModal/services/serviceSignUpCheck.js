// Share
import { validateEmail } from "../../../../../../../shared/services/toolkit.js";

function serviceSignUpCheck(signup) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignUpCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Pseudo is empty?
  if (signup.pseudo === null || signup.pseudo === "") {
    proceed = false;
    errors.push("signup.error.missingpseudo");
    stateChanges.pseudoError = true;
  }

  // Login is empty?
  if (signup.login === null || signup.login === "") {
    proceed = false;
    errors.push("signup.error.missinglogin");
    stateChanges.loginError = true;
  } else {
    // Login is an email?
    if (!validateEmail(signup.login)) {
      proceed = false;
      errors.push("signup.error.invalidlogin");
      stateChanges.loginError = true;
    }
  }

  // Password is empty?
  if (signup.password === null || signup.password === "") {
    proceed = false;
    errors.push("signup.error.missingpassword");
    stateChanges.passwordError = true;
  }

  // Repeated password is empty?
  if (signup.repeatpassword === null || signup.repeatpassword === "") {
    proceed = false;
    errors.push("signup.error.missingrepeatpassword");
    stateChanges.repeatpasswordError = true;
  } else {
    // Password match?
    if (signup.password !== signup.repeatpassword) {
      proceed = false;
      errors.push("signup.error.passwordmissmatch");
      stateChanges.repeatpasswordError = true;
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceSignUpCheck;
