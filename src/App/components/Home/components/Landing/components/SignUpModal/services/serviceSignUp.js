const bcrypt = require("bcrypt");
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
// Resources
import emptySignup from "../../../../../../../shared/resources/emptySignUp.js";
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
    user.password = await bcrypt.hash(user.password, 10);
    user.password = user.password;
    delete user.repeatpassword;

    // API call
    let res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signup",
      user
    );
    switch (res.data.status) {
      case "auth.signup.success.signedup":
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
      case "auth.signup.success.alreadysignedup":
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
      case "auth.signup.error.savingoncreate":
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
      case "auth.signup.error.savingfrominvited":
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
      case "auth.signup.error.notfound":
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
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    return {
      stateChanges: {
        disabled: false,
        loading: false,
        snack: {
          uid: random_id(),
          id: "signup-snack-errorunknown",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceSignUp;
