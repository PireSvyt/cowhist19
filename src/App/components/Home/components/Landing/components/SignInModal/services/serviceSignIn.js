import axios from "axios";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs-react";
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
// Resources
import emptySignin from "../../../../../../../shared/resources/emptySignIn";
// Shared
import { random_id } from "../../../../../../../shared/services/toolkit.js";

async function serviceSignIn(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignIn");
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
        .post(process.env.REACT_APP_SERVER_URL + "/auth/v1/signin", user)
        .then((res) => {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("res.data.type : " + res.data.type);
          }

          switch (res.data.type) {
            case "auth.signin.success":
              // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
              Cookies.set("cowhist19-token", res.data.token);
              stateChanges.signin = emptySignin;
              stateChanges.disabled = false;
              stateChanges.loading = false;
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "signin-snack-success",
              };
              callbacks.push({ key: "close" });
              callbacks.push({ key: "signedin", details: res.data.token });
              break;
            case "auth.signin.error.notfound":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "signin-snack-notfound",
              };
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signin.error.invalidpassword":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "signin-snack-unauthorized",
              };
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signin.error.onpasswordcompare":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "signin-snack-error",
              };
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            case "auth.signin.error.onfind":
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "signin-snack-error",
              };
              stateChanges.disabled = false;
              stateChanges.loading = false;
              break;
            default:
              stateChanges.openSnack = true;
              stateChanges.snack = {
                uid: random_id(),
                id: "generic-snack-errorunknown",
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
        });
    });
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceSignIn catch error");
      console.log(err);
    }
    return {
      stateChanges: {
        disabled: false,
        loading: false,
        snack: {
          uid: random_id(),
          id: "signin-snack-errorunknown",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceSignIn;
