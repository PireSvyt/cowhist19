// Share
import { validateEmail } from "../../../../../../../services/_shared/toolkit";

function serviceResetPasswordCheck(signin) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceResetPasswordCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {
    errors: {},
  };

  // Checks

  // Login is empty?
  if (signin.login === "" || signin.login === undefined) {
    proceed = false;
    errors.push("signin.error.missinglogin");
    stateChanges.errors.login = true;
  } else {
    // Login is an email?
    if (!validateEmail(signin.login)) {
      proceed = false;
      errors.push("signin.error.invalidlogin");
      stateChanges.errors.login = true;
    }
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceResetPasswordCheck;
