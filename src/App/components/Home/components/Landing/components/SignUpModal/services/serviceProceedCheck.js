// Share
import { validateEmail } from "../../../../../../../shared/services/toolkit.js";

function serviceProceedCheck(signup) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceedCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {
    errors: {},
  };

  // Checks

  // Pseudo is empty?
  if (signup.pseudo === null || signup.pseudo === "") {
    proceed = false;
    errors.push("signup.error.missingpseudo");
    stateChanges.errors.pseudo = true;
  }

  // Login is empty?
  if (signup.login === null || signup.login === "") {
    proceed = false;
    errors.push("signup.error.missinglogin");
    stateChanges.errors.login = true;
  } else {
    // Login is an email?
    if (!validateEmail(signup.login)) {
      proceed = false;
      errors.push("signup.error.invalidlogin");
      stateChanges.errors.login = true;
    }
  }

  // Password is empty?
  if (signup.password === null || signup.password === "") {
    proceed = false;
    errors.push("signup.error.missingpassword");
    stateChanges.errors.password = true;
  }

  // Repeated password is empty?
  if (signup.repeatpassword === null || signup.repeatpassword === "") {
    proceed = false;
    errors.push("signup.error.missingrepeatpassword");
    stateChanges.errors.repeatpassword = true;
  } else {
    // Password match?
    if (signup.password !== signup.repeatpassword) {
      proceed = false;
      errors.push("signup.error.passwordmissmatch");
      stateChanges.errors.repeatpassword = true;
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceProceedCheck;
