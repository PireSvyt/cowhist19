// Shared
import { validateEmail } from "../../../../Miscelaneous/toolkit.js"

function InviteServiceCheck(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("InviteServiceCheck");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Is pseudo empty?
  if (user.pseudo === null || user.pseudo === "") {
    proceed = false;
    errors.push("invite.error.missingpseudo");
    if (stateChanges.errors === undefined) {
      stateChanges.errors = {};
    }
    stateChanges.errors.pseudo = true;
  }

  // Is email empty?
  if (user.login === null || user.login === "") {
    proceed = false;
    errors.push("invite.error.missinglogin");
    if (stateChanges.errors === undefined) {
      stateChanges.errors = {};
    }
    stateChanges.errors.login = true;
  } else {
    // Login is an email?
    if (!validateEmail(user.login)) {
      proceed = false;
      errors.push("invite.error.invalidlogin");
      if (stateChanges.errors === undefined) {
        stateChanges.errors = {};
      }
      stateChanges.errors.login = true;
    }
  }

  // Is it acknowledged?
  if (user.acknowledgement !== true) {
    proceed = false;
    errors.push("invite.error.missingacknowledgement");
    if (stateChanges.errors === undefined) {
      stateChanges.errors = {};
    }
    stateChanges.errors.acknowledgement = true;
  }

  // Outcome
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default InviteServiceCheck;
