// Services
import apiPseudo from "./apiPseudo.js";
// Reducers
import appStore from "../../store/appStore.js";

async function serviceExistingPseudo(inputPseudo) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceExistingPseudo");
  }

  try {
    // API call
    const data = await apiPseudo(inputPseudo);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("data.type : " + data.type);
    }

    // Response management
    switch (data.type) {
        case "auth.existingpseudo.true":
            appStore.dispatch({
                type: "sliceSignUpModal/change",
                payload: {
                    errors : {
                        existingpseudo : true
                    }
                },
            });
            appStore.dispatch({
                type: "sliceInviteModal/change",
                payload: {
                    errors : {
                        existingpseudo : true
                    }
                },
            });
            break;
        case "auth.existingpseudo.false":
            appStore.dispatch({
                type: "sliceSignUpModal/change",
                payload: {
                    errors : {
                        existingpseudo : false
                    }
                },
            });
            appStore.dispatch({
                type: "sliceInviteModal/change",
                payload: {
                    errors : {
                        existingpseudo : false
                    }
                },
            });
            break;
        case "auth.existingpseudo.error.onfind":
            null
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

export default serviceExistingPseudo;
