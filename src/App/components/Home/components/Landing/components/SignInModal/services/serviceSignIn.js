import Cookies from "js-cookie";
import { AES } from "crypto-js";

// Services
import apiSignIn from "./apiSignIn.js";
import serviceSignInCheck from "./serviceSignInCheck.js";
// Resources
import emptySignin from "../../../../../../../shared/resources/emptySignIn";
// Shared
import { random_id } from "../../../../../../../shared/services/toolkit.js";
// Reducers
import storeSignIn from "../store/sliceSignIn.js";

async function serviceSignIn(user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSignIn");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep
    // Password encryption
    /*
    let encryptedPassword = AES.encrypt(
      user.password.toString(),
      process.env.REACT_APP_ENCRYPTION_KEY.toString()
    ).toString();
    console.log(encryptedPassword);
    user.password = encryptedPassword;
    */
    user.encryption = false;

    // API call
    const data = await apiSignIn(user);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "auth.signin.success":
        // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
        Cookies.set("cowhist19_token", data.data.token);
        stateChanges.inputs = emptySignin;
        stateChanges.disabled = false;
        stateChanges.loading = false;
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
          uid: random_id(),
          id: "signin.snack.signedin",
        };
        /*
        callbacks.push({ key: "close" });
        callbacks.push({
          key: "signedin",
          option: data.data.token,
        });
        */
        break;
      case "auth.signin.error.notfound":
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
          uid: random_id(),
          id: "signin.snack.notfound",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.invalidpassword":
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
          uid: random_id(),
          id: "signin.snack.unauthorized",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onpasswordcompare":
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
          uid: random_id(),
          id: "generic.snack.error.wip",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      case "auth.signin.error.onfind":
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
          uid: random_id(),
          id: "generic.snack.error.wip",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        break;
      default:
        stateChanges.snackOpen = true;
        stateChanges.snackData = {
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
        snackOpen: true,
        snackData: {
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
