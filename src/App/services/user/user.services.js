// Inputs
import {
  userGetDetailsInputs,
  userInviteInputs
} from "./user.service.inputs.js";
// Services
import serviceProceed from "../_miscelaneous/serviceProceed.js";

export async function serviceUserGetDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceUserGetDetails");
  }
  await serviceProceed(userGetDetailsInputs);
}

export async function serviceUserInvite() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceUserInvite");
  }
  await serviceProceed(userInviteInputs);
}
