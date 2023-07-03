// Services
import apiFeedbackSend from "./apiFeedbackSend.js";
import serviceProceedCheck from "./serviceProceedCheck.js";
// Shared
import { random_id } from "../../../../../../../services/_shared/toolkit.js";
// Reducers
import appStore from "../../../../../../../store/appStore.js";

async function serviceProceed() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProceed");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceFeedbackModal/lock" });

    let feedbackInputs = { ...appStore.getState().sliceFeedbackModal.inputs };
    feedbackInputs.userid = appStore.getState().sliceUserDetails.id

    // Check inputs
    let proceedCheckOutcome = serviceProceedCheck( feedbackInputs );
    appStore.dispatch({
      type: "sliceFeedbackModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    console.log("feedbackInputs", feedbackInputs)
    console.log("proceedCheckOutcome", proceedCheckOutcome)
    if (proceedCheckOutcome.proceed === true) {
      // API call
      const data = await apiFeedbackSend(feedbackInputs);
      console.log("data", data)
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("data.type : " + data.type);
      }

      // Response management
      switch (data.type) {
        case "feedback.create.success":
          appStore.dispatch({
            type: "sliceFeedbackModal/change",
            payload: {
              open: false,
              disabled: false,
              loading: false,
              title: "",
              contents: [],
              inputs: {
                text: "",
                constent: false,
              },
              errors: {
                constent: false,
              },
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "feedback.snack.created",
            },
          });
          break;
        case "feedback.create.error.oncreate":
          appStore.dispatch({
            type: "sliceFeedbackModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
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
            type: "sliceGameModal/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.api.unmanagedtype",
            },
          });
      }
    } else {
      if (proceedCheckOutcome.errors.length > 0) {
        appStore.dispatch({
          type: "sliceFeedbackModal/change",
          payload: {
            disabled: false,
            loading: false,
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        });
      }
    }
  } catch (err) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("service caught error");
      console.log(err);
    }
    // Error network
    appStore.dispatch({
      type: "sliceGameModal/change",
      payload: {
        disabled: false,
        loading: false,
      },
    });
    appStore.dispatch({
      type: "sliceSnack/change",
      payload: {
        uid: random_id(),
        id: "generic.snack.api.errornetwork",
      },
    });
  }
}

export default serviceProceed;
