// Services
import apiObjectCount from "./apiObjectCount.js";
// Shared
import { random_id } from "../../../../../services/toolkit.js";
// Reducers
import appStore from "../../../../../store/appStore.js";

async function serviceGetObjectCount() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetObjectCount");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceAdminStats/lock" });

    // API call
    const data = await apiObjectCount();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "admin.objectcount.success":
        appStore.dispatch({
          type: "sliceAdminStats/set",
          payload: { objectcount: data.data },
        });
        break;
      case "admin.objectcount.error.oncountusers":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
        case "admin.objectcount.error.oncounttables":
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
          break;
        case "admin.objectcount.error.oncountgames":
        appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
            },
        });
        break;
      case "admin.objectcount.error.deniedaccess":
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

export default serviceGetObjectCount;
