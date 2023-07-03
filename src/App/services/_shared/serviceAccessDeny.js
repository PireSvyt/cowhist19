import Cookies from "js-cookie";

// Reducers
import appStore from "../../store/appStore.js";

function serviceAccessDeny() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAccessDeny");
  }
  let callbacks = [];
  let errors = [];
  let stateChanges = {};

  // State management
  appStore.dispatch({
    type: "sliceUserAuth/signout",
  });

  // Remove cookies
  Cookies.remove("cowhist19_token");

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export default serviceAccessDeny;
