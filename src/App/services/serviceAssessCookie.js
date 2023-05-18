import Cookies from "js-cookie";

// Services
import apiAuthAssess from "./apiAuthAssess.js";
import serviceSliceSignIn from "../shared/services/serviceSliceSignIn.js";
import serviceSliceSignOut from "../shared/services/serviceSliceSignOut.js";

// Reducers
import reduxStore from "../store/reduxStore.js";

async function serviceAssessCookie() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAssessCookie");
  }

  try {
    // Load token from cookies
    let token = Cookies.get("cowhist19-token");
    if (token === undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("serviceAssessCookie no token from cookies");
      }
    } else {
      // API call
      const data = await apiAuthAssess(token);

      // Response management
      switch (data.type) {
        case "auth.assess.success.validtoken":
          // Sign in token
          serviceSliceSignIn(token).then((proceedOutcome) => {
            if (proceedOutcome.errors.length !== 0) {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("proceedOutcome errors");
                console.log(proceedOutcome.errors);
              }
            }
          });
          break;
        default:
          serviceSliceSignOut();
          break;
      }
    }
  } catch (error) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(error);
    }
  }
}

export default serviceAssessCookie;
