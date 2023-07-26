// Services
import DeleteAPI from "./Delete.api.js";
// Shared
import { random_id } from "../../../../../../../services/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function DeleteService(tableid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("DeleteService");
  }

  try {
    // API call
    let data = await DeleteAPI(tableid);
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

export default DeleteService;
