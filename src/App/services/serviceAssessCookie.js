import Cookies from "js-cookie";

// Services
import apiAuthAssess from "./apiAuthAssess.js";
import serviceAccessGrant from "../shared/services/serviceAccessGrant.js";
import serviceAccessDeny from "../shared/services/serviceAccessDeny.js";

async function serviceAssessCookie() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAssessCookie");
  }

  try {
    // Load token from cookies
    let token = Cookies.get("cowhist19_token");
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
          serviceAccessGrant(token).then((proceedOutcome) => {
            if (proceedOutcome.errors.length !== 0) {
              if (process.env.REACT_APP_DEBUG === "TRUE") {
                console.log("proceedOutcome errors");
                console.log(proceedOutcome.errors);
              }
            }
          });
          break;
        default:
          serviceAccessDeny();
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
