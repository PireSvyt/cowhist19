import { AES } from "crypto-js";

// Services
import apiSendPassword from "./apiSendPassword.js";
// Shared
import { random_id } from "../toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceSendPassword(sendPasswordInputs) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendPassword");
  }

  try {

    let stateChanges = {};
    let errors = [];
    
    // Encryption
    if (process.env.NODE_ENV === "_production") {
      delete sendPasswordInputs.password
      sendPasswordInputs.login = AES.encrypt(
          sendPasswordInputs.login,
        process.env.REACT_APP_ENCRYPTION
      ).toString();
      sendPasswordInputs.encryption = true;
    } else {
      sendPasswordInputs.encryption = false;
    }

    // API call
    const data = await apiSendPassword(sendPasswordInputs);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }
    
    // Response management
    switch (data.type) {
      case "auth.sendpassword.success":
        stateChanges.sendPasswordStatus = "sent"
        break;
      case "auth.sendpassword.error.onfind":
      case "auth.sendpassword.error.accountnotfound":
      case "auth.sendpassword.error.updatingtoken":
        stateChanges.sendPasswordStatus = "notfound"
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorsendingpassword",
          },
        });
        break;
      default:
        stateChanges.sendPasswordStatus = "error"
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
            details: data.type,
          },
        });
    }

    // Response
    return {
      stateChanges: stateChanges,
      errors: errors,
    };
  
  } catch (err) {
    console.error("serviceSendPassword", err);
    // Snack
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
    return {
      stateChanges: {
        sendPasswordStatus: "error",
      },
      errors: err,
    };
  }
}

export default serviceSendPassword;
