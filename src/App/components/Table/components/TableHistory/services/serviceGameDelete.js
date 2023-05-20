// Services
import apiGameDelete from "./apiGameDelete.js";
// Shared
import { random_id } from "../../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../../store/appStore.js";

async function serviceGameDelete(gamieid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGameDelete");
  }

  try {
    // API call
    let data = await apiGameDelete(gamieid);
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
      case "game.delete.errorondelete":
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

export default serviceGameDelete;
