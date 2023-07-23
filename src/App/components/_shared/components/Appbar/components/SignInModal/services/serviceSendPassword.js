import { AES } from "crypto-js";

// Services
import apiSendPassword from "./apiSendPassword.js";
import serviceSendPasswordCheck from "./serviceSendPasswordCheck.js";
// Shared
import { random_id } from "../../../../../../../services/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function serviceSendPassword() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSendPassword");
  }

  try {
    // Lock UI
    appStore.dispatch({ 
      type: "sliceSignInModal/change",
      payload: {
        sendingmail: true
      }
    });
    let sendPasswordInputs = { ...appStore.getState().sliceSignInModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceSendPasswordCheck(sendPasswordInputs);
    appStore.dispatch({
      type: "sliceSignInModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
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
            appStore.dispatch({
              type: "sliceSignInModal/change",
              payload: {
                sendingmail: false
              },
            });
            appStore.dispatch({
              type: "sliceSnack/change",
              payload: {
                uid: random_id(),
                id: "signin.snack.successsendingpassword"
              },
            });
            break;
        case "auth.sendpassword.error.onfind":
        case "auth.sendpassword.error.accountnotfound":
        case "auth.sendpassword.error.updatingtoken":
          appStore.dispatch({
            type: "sliceSignInModal/change",
            payload: {
              sendingmail: false
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signin.snack.errorsendingpassword",
            },
          });
          break;
        default:
          appStore.dispatch({
            type: "sliceSignInModal/change",
            payload: {
              sendingmail: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.api.unmanagedtype",
              details: [data.type],
            },
          });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceSignInModal/change",
          payload: {
            sendingmail: false,
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceSignInModal/change",
      payload: {
        sendingmail: false,
      },
    });
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}

export default serviceSendPassword;
