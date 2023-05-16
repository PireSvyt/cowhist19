// Services
import apiTableStats from "./apiTableStats.js";

async function serviceTableStats(table, parameters, players) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableStats");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // API call
    const data = await apiTableStats(table, parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "table.stats.success":
        let stats = data.data.stats;
        let playerids = players.map((p) => p._id);
        stats.ranking = stats.ranking.filter((rank) =>
          playerids.includes(rank._id)
        );
        // Outcome
        stateChanges.tableStats = stats;
        stateChanges.tableStatsLoaded = true;
        break;
      case "table.stats.error":
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.error",
        };
        break;
      default:
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic.snack.api.unmanagedtype",
          details: data.type,
        };
    }

    // Response
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    return {
      stateChanges: {
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic.snack.api.errornetwork",
        },
      },
      callbacks: [],
      errors: [],
    };
  }
}

export default serviceTableStats;
