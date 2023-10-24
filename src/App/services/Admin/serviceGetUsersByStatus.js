// Services
import apiUsersByStatus from "../../api/OLD/apiUsersByStatus.js";
// Shared
import { random_id } from "../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceGetUsersByStatus() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetUsersByStatus");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceAdminStats/lock" });

    // API call
    const data = await apiUsersByStatus();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "admin.usersbystatus.success":
        appStore.dispatch({
          type: "sliceAdminStats/set",
          payload: { usersbystatus: data.data.users },
        });
        break;
      case "admin.usersbystatus.error.onaggregate":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.usersbystatus.error.notfound":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.usersbystatus.error.deniedaccess":
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

export default serviceGetUsersByStatus;
