// Services
import GetFeedbacksAPI from "./GetFeedbacks.api.js";
// Shared
import { random_id } from "../../Miscelaneous/toolkit.js"
// Reducers
import appStore from "../../store/appStore.js";

async function GetFeedbacksService() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("GetFeedbacksService");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceAdminFeedbacks/lock" });

    // API parameters
    let parameters = {
        need : "allopen"
    }

    // API call
    const data = await GetFeedbacksAPI(parameters);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
      case "admin.feedbacklist.success":
        appStore.dispatch({
          type: "sliceAdminFeedbacks/set",
          payload: { feedbacks: data.data.feedbacks },
        });
        break;
      case "admin.feedbacklist.error.onfind":
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.wip",
          },
        });
        break;
      case "admin.feedbacklist.error.noneed":
        appStore.dispatch({
          type: "sliceAdminFeedbacks/deny",
        });
        break;
    case "admin.feedbacklist.error.deniedaccess":
        appStore.dispatch({
        type: "sliceAdminFeedbacks/deny",
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

export default GetFeedbacksService;
