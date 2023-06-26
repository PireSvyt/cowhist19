// Services
import apiUserStats from "./apiUserStats.js";

// Reducers
import appStore from "../../../store/appStore.js";

async function serviceGetUserStats(need) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetUserStats");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceUserStats/lock" });

    // API call
    const data = await apiUserStats();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "user.stats.success":
        // Outcome
        appStore.dispatch({
          type: "sliceUserStats/set",
          payload: data.data.stats,
        });
        break;
      case "user.stats.error":
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

export default serviceGetUserStats;
