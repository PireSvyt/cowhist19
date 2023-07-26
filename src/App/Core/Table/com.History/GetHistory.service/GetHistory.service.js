// Services
import GetHistoryAPI from "./GetHistoryAPI.js";
import { random_id } from "../../../services/toolkit.js";

// Reducers
import appStore from "../../../../store/appStore.js";

async function GetHistoryService(lastid) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("GetHistoryService lastid : " + lastid);
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceHistory/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];
    if (!lastid) {lastid = null}
    let parameters = {
      need: "list",
      games: {
        lastid: lastid,
        number: 15,
      },
    };

    // API call
    const data = await GetHistoryAPI(id, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.history.success":
        appStore.dispatch({
          type: "sliceHistory/set",
          payload: data.data,
        });
        break;
      case "table.history.accessdenied.noneed":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.history.accessdenied.needmissmatch":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.history.error.findinggames":
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
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.error.unknown",
      },
    });
  }
}

export default GetHistoryService;
