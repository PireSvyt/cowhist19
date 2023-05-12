import Cookies from "js-cookie";
const bcrypt = require("bcrypt");
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
    user.password = await bcrypt.hash(user.password, 10);
    delete user.repeatpassword;

    // API call
    let res = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/auth/v1/signin",
      user
    );
    switch (res.data.type) {
      case "auth.signin.success":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn sign in");
        }
        // Store token
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
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn not found");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin-snack-notfound",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.invalidpassword":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn invalid password");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin-snack-unauthorized",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onpasswordcompare":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn error on password compare");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin-snack-error",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onfind":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn not found");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin-snack-error",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceSignIn default error");
        }
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
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceSignIn catch error");
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
