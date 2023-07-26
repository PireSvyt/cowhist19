// Services
import DeleteAPI from "./Delete.api.js";
// Shared
import { random_id } from "../../../../../../../services/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function DeleteService(gamieid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("DeleteService");
  }

  try {
    // API call
    let data = await DeleteAPI(gamieid);
    switch (data.type) {
      case "game.delete.success":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "game.snack.deleted",
          },
        });
        break;
      case "game.delete.error.ondelete":
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
