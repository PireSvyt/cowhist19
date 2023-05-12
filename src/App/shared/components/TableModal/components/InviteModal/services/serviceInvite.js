// Resources
import emptyUser from "../../../../../resources/emptyUser.js";
// Services
import apiUserInvite from "./apiUserInvite.js";
// Shared
import { random_id } from "../../../../../services/toolkit.js";

async function serviceInvite(token, user) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceInvite");
  }

  try {
    let callbacks = [];
    let errors = [];
    let stateChanges = {};

    // Prep
    user.password = user.password;
    delete user.repeatpassword;

    // API call
    let res = await apiUserInvite(token, user);
    switch (res.status) {
      case 201:
        // User creation
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceInvite user created");
        }
        stateChanges.user = emptyUser;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "invite-snack-success",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        callbacks.push({ key: "useradd", option: { ...res.user } });
        break;
      case 202:
        // User already existing
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceInvite user already existing");
        }
        stateChanges.user = emptyUser;
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "invite-snack-success",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
        callbacks.push({ key: "useradd", option: res.user });
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("serviceInvite error unknown");
        }
        stateChanges.openSnack = true;
        stateChanges.snack = {
          uid: random_id(),
          id: "generic-snack-errorunknown",
        };
        stateChanges.disabled = false;
        stateChanges.loading = false;
    }

    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("serviceInvite return");
    }
    return {
      stateChanges: stateChanges,
      callbacks: callbacks,
      errors: errors,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: "error on apiUserInvite",
      error: err,
      stateChanges: {
        disabled: false,
        loading: false,
      },
      callbacks: [],
      errors: ["generic-snack-errorunknown"],
    };
  }
}

export default serviceInvite;