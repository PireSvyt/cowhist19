// Resources
import emptySignup from "../resources/emptySignUp.js";
// Services
import apiSignUp from "./apiSignUp.js";
// Shared
import { random_id } from "../../../../../../../shared/services/toolkit.js";

function serviceSignUp(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignUp");
  }
  let callbacks = [];
  let errors = [];
  let stateChanges = {};

  // Prep
  user.password = user.password;
  delete user.repeatpassword;

  // API call
  apiSignUp(user).then((res) => {
    switch (res.status) {
      case 201:
        stateChanges.signup = emptySignup;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-success",
        };
        stateChanges.disabled = true;
        stateChanges.loading = true;
        callbacks.push("close");
        break;
      case 409:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-existinguser",
        };
        errors.push("signup-snack-existinguser");
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case 400:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-errornetwork",
        };
        errors.push("signup-snack-errornetwork");
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-errorunknown",
        };
        errors.push("signup-snack-errorunknown");
        stateChanges.disabled = false;
        stateChanges.loading = false;
    }
  });

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export default serviceSignUp;
