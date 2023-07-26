// Share
import { validateEmail } from "../../Miscelaneous/toolkit.js";

async function serviceSendPasswordCheck(sendPasswordInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendPasswordCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks
  try {

    // Login is empty?
    if (sendPasswordInputs.login === "" || sendPasswordInputs.login === undefined) {
      proceed = false;
      errors.push("generic.error.missinglogin");
      stateChanges.loginError = true;
    } else {
      // Login is an email?
      if (!validateEmail(sendPasswordInputs.login)) {
        proceed = false;
        errors.push("generic.error.invalidlogin");
        stateChanges.loginError = true;
      }
    }

    // Outcome
    return {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
    };

  } catch (err) {
    console.error("serviceSendPasswordCheck", err);
    // Snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return {
      stateChanges: {},
      proceed: false,
      errors: err,
    };

  }
}

export default serviceSendPasswordCheck;
