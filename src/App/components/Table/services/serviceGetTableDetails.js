// Services
import apiTableDetails from "./apiTableDetails.js";
import { random_id } from "../../../services/_shared/toolkit.js";

// Reducers
import appStore from "../../../store/appStore.js";

async function serviceTableDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDetails");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableDetails/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];

    // API call
    const data = await apiTableDetails(id);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.details.success":
        appStore.dispatch({
          type: "sliceTableDetails/set",
          payload: data.data.table,
        });
        break;
      case "table.details.error.onaggregate":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.details.error.onfind":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "table.details.error.deniedaccess":
        appStore.dispatch({
          type: "sliceTableDetails/deny",
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

export default serviceTableDetails;
