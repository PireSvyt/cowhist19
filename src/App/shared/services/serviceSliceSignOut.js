import Cookies from "js-cookie";

// Reducers
import reduxStore from "../../store/reduxStore.js";

function serviceSliceSignOut() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSliceSignOut");
  }
  let callbacks = [];
  let errors = [];
  let stateChanges = {};

  // State management
  reduxStore.dispatch({
    type: "user/signout",
  });

  // Remove cookies
  Cookies.remove("cowhist19_token");

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export default serviceSliceSignOut;
