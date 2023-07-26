// Services
import apiPopulate from "./apiPopulate.js";
// Shared
import { random_id } from "../../Miscelaneous/toolkit.js"
// Reducers
import appStore from "../../store/appStore.js";

async function servicePopulate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("servicePopulate");
  }

  try {
    // API call
    const data = await apiPopulate();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "admin.populate.success":
        break;
      case "admin.populate.error.unauthorized":
        break;
      case "admin.populate.error.deniedaccess":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.populate.error.failedpopulation":
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
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.api.unmanagedtype",
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

export default servicePopulate;
