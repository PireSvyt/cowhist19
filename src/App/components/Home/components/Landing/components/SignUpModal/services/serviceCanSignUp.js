// Share
import { validateEmail } from "../../../../../../../shared/services/toolkit.js";

function serviceCanSignUp(signup) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceCanSignUp");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Pseudo is empty?
  if (signup.pseudo === null || signup.pseudo === "") {
    proceed = false;
    errors.push("signup-error-missingpseudo");
    stateChanges.pseudoError = true;
  }

  // Login is empty?
  if (signup.login === null || signup.login === "") {
    proceed = false;
    errors.push("signup-error-missinglogin");
    stateChanges.loginError = true;
  } else {
    // Login is an email?
    if (!validateEmail(signup.login)) {
      proceed = false;
      errors.push("signup-error-invalidlogin");
      stateChanges.loginError = true;
    }
  }

  // Password is empty?
  if (signup.password1 === null || signup.password1 === "") {
    proceed = false;
    errors.push("signup-error-missingpassword");
    stateChanges.passwordError = true;
  }

  // Repeated password is empty?
  if (signup.password2 === null || signup.password2 === "") {
    proceed = false;
    errors.push("signup-error-missingrepeatpassword");
    stateChanges.repeatPasswordError = true;
  } else {
    // Password match?
    if (signup.password1 !== signup.password2) {
      proceed = false;
      errors.push("signup-error-passwordmissmatch");
      stateChanges.repeatPasswordError = true;
    }
  }

  // Outcome
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("proceed " + proceed);
  }
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceCanSignUp;
