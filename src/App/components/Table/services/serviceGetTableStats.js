// Services
import apiTableStats from "./apiTableStats.js";
import serviceProcessCurves from "./serviceProcessCurves.js";
// Shared
import { random_id } from "../../../services/_shared/toolkit.js";

// Reducers
import appStore from "../../../store/appStore.js";

async function serviceGetTableStats(need) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetTableStats");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceTableStats/lock" });

    // Initialize
    let parameters = {
      need: "ranking",
    };
    let id = window.location.href.split("/table/")[1];
    if (need !== undefined) {   
      parameters.need = need
    }

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
          playerids.includes(rank._id)
        );
        if (parameters.need === "graph") {
          serviceProcessCurves(stats.graph)
          delete stats.graph
        }
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
