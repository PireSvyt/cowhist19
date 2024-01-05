// Inputs
import {
  userGetDetailsInputs,
  userInviteInputs,
  userGetStatsInputs
} from "./user.services.inputs.js";
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

export async function serviceUserGetStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceUserGetStats");
  }
  await serviceProceed(userGetStatsInputs);
}

