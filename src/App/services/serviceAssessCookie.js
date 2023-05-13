import Cookies from "js-cookie";

// Services
import apiAuthAssess from "./apiAuthAssess.js";

async function serviceAssessCookie() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAssessCookie");
  }

  try {
    // Prep
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    let token = Cookies.get("cowhist19-token");
    if (token !== undefined) {
      // API call
      const data = await apiAuthAssess(token);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "auth.assess.success.validtoken":
          return {
            type: "assesscookie.signin",
            token: data.data.token,
          };
        case "auth.assess.error.invalidtoken":
          return {
            type: "assesscookie.signout.invalidtoken",
            token: "",
          };
        case "auth.assess.error.nulltoken":
          return {
            type: "assesscookie.signout.missingcookie",
            token: "",
          };
        default:
          return {
            type: "assesscookie.error",
            token: "",
          };
      }
    } else {
      return {
        type: "assesscookie.signout.missingcookie",
        token: "",
      };
    }
  } catch (error) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(error);
    }
    return {
      type: "assesscookie.error",
      error: error,
    };
  }
}

export default serviceAssessCookie;
