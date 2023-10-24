// Services
import apiTableHistory from "../../api/OLD/apiTableHistory.js";
import { random_id } from "../../../shared/services/toolkit.js";

// Reducers
import appStore from "../../store/appStore.js";

async function serviceGetTableHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetTableHistory");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableHistory/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];
    let parameters = {
      need: "list",
      games: {
        index: 0,
        number: 20,
      },
    };

    // API call
    const data = await apiTableHistory(id, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.history.success":
        appStore.dispatch({
          type: "sliceTableHistory/set",
          payload: data.data.games,
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

export default serviceGetTableHistory;
