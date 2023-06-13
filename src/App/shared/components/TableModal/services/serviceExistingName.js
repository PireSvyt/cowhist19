// Services
import apiName from "./apiName.js";
// Reducers
import appStore from "../../../../store/appStore.js";

async function serviceExistingName(inputName) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceExistingName");
  }

  try {
    // API call
    const data = await apiName(inputName);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
        case "auth.existingname.true":
            appStore.dispatch({
                type: "sliceTableModal/change",
                payload: {
                    errors : {
                        existingname : true
                    }
                },
            });
            break;
        case "auth.existingname.false":
            appStore.dispatch({
                type: "sliceTableModal/change",
                payload: {
                    errors : {
                        existingname : false
                    }
                },
            });
        case "auth.existingname.error.onfind":
            null
            break;
        default:
            appStore.dispatch({
                type: "sliceSnack/change",
                payload: {
                    uid: random_id(),
                    id: "generic.snack.api.unmanagedtype",
                    details: data.type,
                },
            });
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}

export default serviceExistingName;
