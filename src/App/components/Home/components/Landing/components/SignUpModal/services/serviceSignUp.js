import axios from "axios";
import bcrypt from "bcryptjs-react";
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
    bcrypt.hashSync(user.password).then((hash) => {
      user.password = hash;
      delete user.repeatpassword;

      // API call
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/auth/v1/signup", user)
        .then((res) => {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("res.data.type : " + res.data.type);
          }

          switch (res.data.type) {
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
                id: "signup-snack-existinguser",
              };
              errors.push("signup-snack-existinguser");
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signup.error.savingoncreate":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "generic-snack-errornetwork",
              };
              errors.push("signup-snack-errornetwork");
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signup.error.savingfrominvited":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "generic-snack-errornetwork",
              };
              errors.push("signup-snack-errornetwork");
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signup.error.notfound":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "generic-snack-errornetwork",
              };
              errors.push("generic-snack-errornetwork");
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            default:
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "generic-snack-errorunknown",
              };
              errors.push("generic-snack-errorunknown");
              stateChanges.disabled = false;
              stateChanges.loading = false;
          }

          // Response
          return {
            stateChanges: stateChanges,
            callbacks: callbacks,
            errors: errors,
          };
        });
    });
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceSignUp catch error");
      console.log(err);
    }
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
