// Share
import { validateEmail } from "../../../services/_shared/toolkit";

function serviceProceedCheck(activate) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceedCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {
    errors: {},
  };

  // Checks

  // Login is empty?
  if (activate.login === "" || activate.login === undefined) {
    proceed = false;
    errors.push("generic.error.missinglogin");
    stateChanges.loginerror = true;
  } else {
    // Login is an email?
    if (!validateEmail(activate.login)) {
      proceed = false;
      errors.push("generic.error.invalidlogin");
      stateChanges.loginerror = true;
    }
  }

  // Token is empty?
  if (activate.token === "" || activate.token === undefined) {
    proceed = false;
    errors.push("activate.error.missingtoken");
    stateChanges.tokenerror = true;
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceProceedCheck;
