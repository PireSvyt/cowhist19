// Resources
import emptySignup from "../../../../../../../shared/resources/emptySignUp.js";
// Services
import apiSignUp from "./apiSignUp.js";
// Shared
import { random_id } from "../../../../../../../shared/services/toolkit.js";

async function serviceSignUp(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignUp");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep
    user.password = user.password;
    delete user.repeatpassword;

    // API call
    let res = await apiSignUp(user);
    switch (res.status) {
      case 201:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignUp account created");
        }
        stateChanges.signup = emptySignup;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-success",
        };
        stateChanges.disabled = true;
        stateChanges.loading = true;
        callbacks.push({ key: "close" });
        break;
      case 409:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignUp account already existing");
        }
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
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignUp error network");
        }
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
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignUp error unknown");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-errorunknown",
        };
        errors.push("signup-snack-errorunknown");
        stateChanges.disabled = false;
        stateChanges.loading = false;
    }

    // Response
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceSignUp return");
    }
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiSignUp",
      error: err,
      stateChanges: {
        disabled: false,
        loading: false,
      },
      callbacks: [],
      errors: ["generic-snack-errorunknown"],
    };
  }
}

export default serviceSignUp;
