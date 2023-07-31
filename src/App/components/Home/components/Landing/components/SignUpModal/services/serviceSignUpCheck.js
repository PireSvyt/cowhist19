// Share
import { validateEmail } from "../toolkit";

async function serviceSignUpCheck(signup) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignUpCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks
  try {

    // Pseudo is empty?
    if (signup.pseudo === null || signup.pseudo === "") {
      proceed = false;
      errors.push("signup.error.missingpseudo");
      stateChanges.pseudoError = true;
    }

    // Login is empty?
    if (signup.login === null || signup.login === "") {
      proceed = false;
      errors.push("generic.error.missinglogin");
      stateChanges.loginError = true;
    } else {
      // Login is an email?
      if (!validateEmail(signup.login)) {
        proceed = false;
        errors.push("generic.error.invalidlogin");
        stateChanges.loginError = true;
      }
    }

    // Password is empty?
    if (signup.password === null || signup.password === "") {
      proceed = false;
      errors.push("generic.error.missingpassword");
      stateChanges.passwordError = true;
    }

    // Repeated password is empty?
    if (signup.passwordRepeat === null || signup.passwordRepeat === "") {
      proceed = false;
      errors.push("signup.error.missingpasswordrepeat");
      stateChanges.passwordRepeatError = true;
    } else {
      // Password match?
      if (signup.password !== signup.passwordRepeat) {
        proceed = false;
        errors.push("signup.error.passwordmissmatch");
        stateChanges.passwordRepeatError = true;
      }
    }

    // Outcome
    return {
      stateChanges: stateChanges,
      proceed: proceed,
      errors: errors,
    };

  } catch (err) {
    console.error("serviceSignUpCheck", err);
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

export default serviceSignUpCheck;