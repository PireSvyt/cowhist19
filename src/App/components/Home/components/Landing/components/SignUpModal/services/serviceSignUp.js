import axios from "axios";
import bcrypt from "bcryptjs-react";
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
// Services
import apiSignUp from "./apiSignUp.js";
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
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
    delete user.repeatpassword;

    // API call
    const data = await apiSignUp(user);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    switch (data.type) {
      case "auth.signup.success.signedup":
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
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signup-snack-success",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signup.error.savingoncreate":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic-snack-error",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signup.error.savingfrominvited":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic-snack-error",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signup.error.notfound":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic-snack-error",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic-snack-api-unmanagedtype",
        };
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    return {
      stateChanges: {
        disabled: false,
        loading: false,
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic-snack-api-errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceSignUp;
