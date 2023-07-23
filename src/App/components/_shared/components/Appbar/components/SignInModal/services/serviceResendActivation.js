import { AES } from "crypto-js";

// Services
import apiResendActivation from "./apiResendActivation.js";
import serviceResendActivationCheck from "./serviceResendActivationCheck.js";
// Shared
import { random_id } from "../../../../../../../services/_shared/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function serviceResendActivation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceResendActivation");
  }

  try {
    // Lock UI
    appStore.dispatch({ 
      type: "sliceSignInModal/lock"
    });
    let resendActivationInputs = { ...appStore.getState().sliceSignInModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceResendActivationCheck(resendActivationInputs);
    appStore.dispatch({
      type: "sliceSignInModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Encryption
      if (process.env.NODE_ENV === "_production") {
        delete resendActivationInputs.password
        resendActivationInputs.login = AES.encrypt(
            resendActivationInputs.login,
          process.env.REACT_APP_ENCRYPTION
        ).toString();
        resendActivationInputs.encryption = true;
      } else {
        resendActivationInputs.encryption = false;
      }

      // API call
      const data = await apiResendActivation(resendActivationInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "auth.resentactivation.success":
            appStore.dispatch({
              type: "sliceSignInModal/change",
              payload: {
                disabled: false,
                loading: false
              },
            });
            appStore.dispatch({
              type: "sliceSnack/change",
              payload: {
                uid: random_id(),
                id: "signin.snack.successresendingactivation",
              },
            });
            break;
        case "auth.resentactivation.error.onfind":
        case "auth.resentactivation.error.accountnotfound":
        case "auth.resentactivation.error.updatingtoken":
          appStore.dispatch({
            type: "sliceSignInModal/change",
            payload: {
              disabled: false,
              loading: false
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signin.snack.errorresendingactivation",
            },
          });
          break;
        default:
          appStore.dispatch({
            type: "sliceSignInModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.api.unmanagedtype",
              details: data.type,
            },
          });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceSignInModal/change",
          payload: {
            disabled: false,
            loading: false,
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
        disabled: false,
        loading: false,
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

export default serviceResendActivation;