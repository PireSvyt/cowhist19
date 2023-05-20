import Cookies from "js-cookie";
import { AES } from "crypto-js";

// Services
import apiSignIn from "./apiSignIn.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../../../shared/services/toolkit.js";
import serviceAccessGrant from "../../../../../../../shared/services/serviceAccessGrant.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function serviceProceed() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceSignInModal/lock" });
    const signInInputs = { ...appStore.getState().sliceSignInModal.inputs };

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck(signInInputs);
    appStore.dispatch({
      type: "sliceSignInModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Prep
      // Password encryption
      /*
      signInInputs
      let encryptedPassword = AES.encrypt(
        user.password.toString(),
        process.env.REACT_APP_ENCRYPTION_KEY.toString()
      ).toString();
      console.log(encryptedPassword);
      user.password = encryptedPassword;
      */
      signInInputs.encryption = false;

      // API call
      const data = await apiSignIn(signInInputs);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "auth.signin.success":
          serviceAccessGrant(data.data.token).then((proceedOutcome) => {
            if (proceedOutcome.errors.length > 0) {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("proceedOutcome errors");
                console.log(proceedOutcome.errors);
              }
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
                  id: "generic.snack.error.wip",
                },
              });
            } else {
              // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
              Cookies.set("cowhist19_token", data.data.token);
              appStore.dispatch({
                type: "sliceSignInModal/change",
                payload: {
                  open: false,
                  inputs: {
                    login: "",
                    password: "",
                  },
                  disabled: false,
                  loading: false,
                },
              });
              appStore.dispatch({
                type: "sliceSnack/change",
                payload: {
                  uid: random_id(),
                  id: "signin.snack.signedin",
                },
              });
            }
          });
          break;
        case "auth.signin.error.notfound":
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
              id: "signin.snack.notfound",
            },
          });
          break;
        case "auth.signin.error.invalidpassword":
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
              id: "signin.snack.unauthorized",
            },
          });
          break;
        case "auth.signin.error.onpasswordcompare":
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
              id: "generic.snack.error.wip",
            },
          });
          break;
        case "auth.signin.error.onfind":
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
              id: "generic.snack.error.wip",
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

export default serviceProceed;
