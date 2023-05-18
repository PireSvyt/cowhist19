import jwt_decode from "jwt-decode";

// Services
import serviceSliceSignOut from "./serviceSliceSignOut.js";

// Reducers
import reduxStore from "../../store/reduxStore.js";

function serviceSliceSignIn(token) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceSliceSignIn");
  }
    let callbacks = [];
  let errors = [];
  let stateChanges = {};


  


if (token === null || token === "") {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("empty token");
  }
  errors.push("generic.error.emptytoken");
      serviceSliceSignOut()
} else {
  let decodedtoken = jwt_decode(token);
    // User status tollgate
    if (
      decodedtoken.status === "registered" ||
      decodedtoken.status === "signedup"
    ) {
      // Then update variables to signed in
      reduxStore.dispatch({
        type: "user/signin",
        payload: {
          token: token,
          decodedtoken: decodedtoken,
        },
      });
    } else {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("invalid status");
  }
  errors.push("generic.error.invalidstatus");
      serviceSliceSignOut()
    }
    }

  return {
    stateChanges: stateChanges,
    callbacks: callbacks,
    errors: errors,
  };
}

export default serviceSliceSignIn;
