import Cookies from "js-cookie";
// Services
import apiSignIn from "./apiSignIn.js";
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

    // API call
    const data = await apiSignIn(user);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.signin.success":
        // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
        Cookies.set("cowhist19-token", data.data.token);
        stateChanges.signin = emptySignin;
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin.snack.signedin",
        };
        callbacks.push({ key: "close" });
        callbacks.push({
          key: "signedin",
          option: data.data.token,
        });
        break;
      case "auth.signin.error.notfound":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin.snack.notfound",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.invalidpassword":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "signin.snack.unauthorized",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onpasswordcompare":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error.wip",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onfind":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error.wip",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.api.unmanagedtype",
          details: data.type,
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
          id: "generic.snack.api.errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceSignIn;
