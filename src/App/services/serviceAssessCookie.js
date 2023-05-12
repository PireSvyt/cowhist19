import Cookies from "js-cookie";

// Services
import apiAuthAssess from "./apiAuthAssess.js";

function serviceAssessCookie() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAssessCookie");
  }

  // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
  let token = Cookies.get("cowhist19-token");

  if (token !== undefined) {
    apiAuthAssess(token).then((assessment) => {
      if (assessment.status === 200) {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("App.componentDidMount token valid");
        }
        return {
          type: "assesscookie.signin",
          token: token,
        };
      }
      if (assessment.status === 404) {
        return {
          type: "assesscookie.signout.invalidtoken",
        };
      }
    });
  } else {
    return {
      type: "assesscookie.signout.missingcookie",
    };
  }
}

export default serviceAssessCookie;
