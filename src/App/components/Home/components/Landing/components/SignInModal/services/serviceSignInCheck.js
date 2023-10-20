// Share
import { validateEmail } from "../../../../../../../services/toolkit";

async function serviceSignInCheck(signin) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignInCheck");
  }

  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks
  try {

    // Login is empty?
    if (signin.login === "" || signin.login === undefined) {
      proceed = false;
      errors.push("generic.error.missinglogin");
      stateChanges.loginError = true;
    } else {
      // Login is an email?
      if (!validateEmail(signin.login)) {
        proceed = false;
        errors.push("generic.error.invalidlogin");
        stateChanges.loginError = true;
      }
    }

    // Password is empty?
    if (signin.password === "" || signin.password === undefined) {
      proceed = false;
      errors.push("generic.error.missingpassword");
      stateChanges.passwordError = true;
    }

    // Outcome
    return {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
    };

  } catch (err) {
    console.error("serviceSignInCheck", err);
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

export default serviceSignInCheck;