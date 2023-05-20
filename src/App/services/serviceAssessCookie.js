import Cookies from "js-cookie";

// Services
import apiAuthAssess from "./apiAuthAssess.js";
import serviceGrantAccess from "../shared/services/serviceGrantAccess.js";
import serviceDenyAccess from "../shared/services/serviceDenyAccess.js";
// Reducers
import appStore from "../store/appStore.js";

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
          serviceGrantAccess(token).then((proceedOutcome) => {
            if (proceedOutcome.errors.length !== 0) {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("proceedOutcome errors");
                console.log(proceedOutcome.errors);
              }
            }
          });
          break;
        default:
          serviceDenyAccess();
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
