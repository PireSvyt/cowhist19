// Share
import { validateEmail } from "../toolkit.js"

async function serviceActivateCheck(activate) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceActivateCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks
  try {

    // Login is empty?
    if (activate.login === "" || activate.login === undefined) {
      proceed = false;
      errors.push("generic.error.missinglogin");
      stateChanges.loginError = true;
    } else {
      // Login is an email?
      if (!validateEmail(activate.login)) {
        proceed = false;
        errors.push("generic.error.invalidlogin");
        stateChanges.loginError = true;
      }
    }

    // Token is empty?
    if (activate.token === "" || activate.token === undefined) {
      proceed = false;
      errors.push("activate.error.missingtoken");
      stateChanges.tokenError = true;
    }

    // Outcome
    return {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
    };

  } catch (err) {
    console.error("serviceActivateCheck", err);
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

export default serviceActivateCheck;