// Share
import { validateEmail } from "../_miscelaneous/toolkit.js";

async function serviceSendActivationCheck(sendActivationInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendActivationCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks
  try {
    // Login is empty?
    if (
      sendActivationInputs.login === "" ||
      sendActivationInputs.login === undefined
    ) {
      proceed = false;
      errors.push("generic.error.missinglogin");
      stateChanges.loginError = true;
    } else {
      // Login is an email?
      if (!validateEmail(sendActivationInputs.login)) {
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
    console.error("serviceSendActivationCheck", err);
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

export default serviceSendActivationCheck;
