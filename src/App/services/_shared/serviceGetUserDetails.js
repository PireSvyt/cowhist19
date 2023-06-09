// Services
import apiUserDetails from "./apiUserDetails.js";
// Shared
import { random_id } from "./toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceGetUserDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceGetUserDetails");
  }

  try {
    // API call
    const data = await apiUserDetails();
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "user.details.success":
        appStore.dispatch({
          type: "sliceUserDetails/set",
          payload: data.data.user,
        });
        break;
      case "user.details.error.notfound":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: ["home.snack.userdetailsnotfound"],
          },
        });
        break;
      case "user.details.error.onaggregate":
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
            details: data.type,
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

export default serviceGetUserDetails;
