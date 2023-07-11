import bcrypt from "bcryptjs-react";
// BCRYPT https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/
import { AES } from "crypto-js";

// Services
import apiChangePassword from "./apiChangePassword.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../services/_shared/toolkit.js"
// Reducers
import appStore from "../../../../../store/appStore.js";

async function serviceProceed() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceChangePasswordModal/lock" });
    const changePasswordInputs = { ...appStore.getState().sliceChangePasswordModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(changePasswordInputs);
    appStore.dispatch({
      type: "sliceChangePasswordModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
        // Prep

        // Encrypt one way new password
        changePasswordInputs.newpassword = bcrypt.hashSync(changePasswordInputs.new);
        // Encrypt two ways current password
        if (process.env.NODE_ENV === "_production") {
            changePasswordInputs.currentpassword = AES.encrypt(
                changePasswordInputs.current,
            process.env.REACT_APP_ENCRYPTION
            ).toString();
            changePasswordInputs.encryption = true;
        } else {
            changePasswordInputs.currentpassword = changePasswordInputs.current
            changePasswordInputs.encryption = false;
        }
        // Clean up payload
        delete changePasswordInputs.current;
        delete changePasswordInputs.new;
        delete changePasswordInputs.repeat;

        // API call
        let data = await apiChangePassword(changePasswordInputs);
        switch (data.type) {
            case "user.changepassword.success":
                appStore.dispatch({
                    type: "sliceChangePasswordModal/close",
                });
                appStore.dispatch({
                    type: "sliceSnack/change",
                    payload: {
                        uid: random_id(),
                        id: "account.snack.changedpassword",
                    },
                });
                break;
            case "user.changepassword.error.onfind":
            case "user.changepassword.error.notfound":
            case "user.changepassword.error.onsave":
            case "user.changepassword.error.missingnewpassword":
                appStore.dispatch({
                    type: "sliceChangePasswordModal/change",
                    payload: {
                        disabled: false,
                        loading: false,
                    },
                });
                appStore.dispatch({
                    type: "sliceSnack/change",
                    payload: {
                        uid: random_id(),
                        id: "generic.snack.error.wip",
                    },
                });
                break;
            default:
                appStore.dispatch({
                    type: "sliceChangePasswordModal/change",
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
                    },
                });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
            type: "sliceChangePasswordModal/change",
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
        type: "sliceChangePasswordModal/change",
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

export default serviceProceed;
