// Services
import InviteAPI from "./InviteAPI.js";
import InviteServiceCheck from "./InviteServiceCheck.js";
// Shared
import { random_id } from "../../../Miscelaneous/toolkit.js"
// Reducers
import appStore from "../../../store/appStore.js";

async function InviteService() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("InviteService");
  }

  try {
    // Lock UI
    appStore.dispatch({ type: "sliceInviteModal/lock" });
    const inviteInputs = { ...appStore.getState().sliceInviteModal.inputs };

    // Check inputs
    let proceedCheckOutcome = InviteServiceCheck(inviteInputs);
    appStore.dispatch({
      type: "sliceInviteModal/change",
      payload: proceedCheckOutcome.stateChanges,
    });

    if (proceedCheckOutcome.proceed === true) {
      // Prep
      inviteInputs.password = inviteInputs.password;
      delete inviteInputs.repeatpassword;

      // API call
      let data = await InviteAPI(inviteInputs);
      switch (data.type) {
        case "user.invite.success.created":
          appStore.dispatch({
            type: "sliceInviteModal/change",
            payload: {
              open: false,
              inputs: {
                pseudo: "",
                login: "",
              },
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "invite.snack.invited",
            },
          });
          appStore.dispatch({
            type: "sliceTableModal/adduser",
            payload: data.data.user,
          });
          break;
        case "user.invite.success.alreadyexisting":
          appStore.dispatch({
            type: "sliceInviteModal/change",
            payload: {
              open: false,
              inputs: {
                pseudo: "",
                login: "",
              },
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "invite.snack.invited",
            },
          });
          appStore.dispatch({
            type: "sliceTableModal/adduser",
            payload: data.data.user,
          });
          break;
        case "user.invite.error.oncreate":
        case "user.invite.error.onfind":
          appStore.dispatch({
            type: "sliceInviteModal/change",
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
            type: "sliceInviteModal/change",
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
          type: "sliceInviteModal/change",
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
      type: "sliceInviteModal/change",
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

export default InviteService;
