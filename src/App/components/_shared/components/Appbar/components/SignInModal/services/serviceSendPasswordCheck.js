// Share
import { validateEmail } from "../../../../../../../services/toolkit";

function serviceSendPasswordCheck(signin) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendPasswordCheck");
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
    errors.push("generic.error.missinglogin");
    stateChanges.errors.login = true;
  } else {
    // Login is an email?
    if (!validateEmail(signin.login)) {
      proceed = false;
      errors.push("generic.error.invalidlogin");
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

export default serviceSendPasswordCheck;
