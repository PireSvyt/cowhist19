// Services
import apiTableStats from "./apis/apiTableStats.js";
import { random_id } from "../../services/_miscelaneous/toolkit.js";

// Reducers
import appStore from "../../store/appStore.js";

async function serviceGetTableStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetTableStats");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableStats/lock" });

    // Initialize
    let id = window.location.href.split("/table/")[1];
    let parameters = {
      need: "ranking",
    };

    // API call
    const data = await apiTableStats(id, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.stats.success":
        let stats = data.data.stats;
        let playerids = appStore
          .getState()
          .sliceTableDetails.players.map((p) => p._id);
        stats.ranking = stats.ranking.filter((rank) =>
          playerids.includes(rank._id),
        );
        // Outcome
        appStore.dispatch({
          type: "sliceTableStats/set",
          payload: stats,
        });
        break;
      case "table.stats.error":
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

export default serviceGetTableStats;
