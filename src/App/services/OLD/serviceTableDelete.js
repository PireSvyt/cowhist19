// Services
import apiTableDelete from "./apis/apiTableDelete.js";
// Shared
import { random_id } from "../../services/_miscelaneous/toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceTableDelete(tableid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDelete");
  }

  try {
    // API call
    let data = await apiTableDelete(tableid);
    switch (data.type) {
      case "table.delete.success":
        /*appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "table.snack.deleted",
          },
        });*/
        window.location = "/";
        break;
      case "table.delete.errorondelete":
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

export default serviceTableDelete;
