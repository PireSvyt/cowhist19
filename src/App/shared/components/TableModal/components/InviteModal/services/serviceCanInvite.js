function serviceCanInvite(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceCanInviteUser");
  }
  let proceed = true;
  let errors = [];
  let stateChanges = {};

  // Checks

  // Is pseudo empty?
  if (user.pseudo === undefined || user.pseudo === "") {
    proceed = false;
    errors.push("invite-error-missingpseudo");
    stateChanges.pseudoError = true;
  }

  // Is email empty?
  if (user.login === undefined || user.login === "") {
    proceed = false;
    errors.push("invite-error-missinglogin");
    stateChanges.loginError = true;
  } else {
    // Login is an email?
    if (!validateEmail(user.login)) {
      proceed = false;
      errors.push("invite-error-invalidlogin");
      stateChanges.loginError = true;
    }
  }

  // Is it acknowledged?
  if (user.acknowledgement !== true) {
    proceed = false;
    errors.push("invite-error-missingacknowledgement");
    stateChanges.acknowledgementError = true;
  }

  // Outcome
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("proceed " + proceed);
  }
  return {
    stateChanges: stateChanges,
    proceed: proceed,
    errors: errors,
  };
}

export default serviceCanInvite;
