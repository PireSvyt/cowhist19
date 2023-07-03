// Services
import apiTablesByPlayers from "./apiTablesByPlayers.js";
// Shared
import { random_id } from "../../../../../services/_shared/toolkit.js";
// Reducers
import appStore from "../../../../../store/appStore.js";

async function serviceGetTablesByPlayers() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetTablesByPlayers");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceAdminStats/lock" });

    // API call
    const data = await apiTablesByPlayers();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "admin.tablesbyplayers.success":
        appStore.dispatch({
          type: "sliceAdminStats/set",
          payload: { tablesbyplayers: data.data.tables },
        });
        break;
      case "admin.tablesbyplayers.error.onaggregate":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.tablesbyplayers.error.notfound":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.tablesbyplayers.error.deniedaccess":
        appStore.dispatch({
          type: "sliceAdminStats/deny",
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
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.error.unknown",
      },
    });
  }
}

export default serviceGetTablesByPlayers;
