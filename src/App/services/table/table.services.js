// Inputs
import {
  tableCreateInputs,
  tableSaveInputs,
  tableGetDetailsInputs,
  tableGetHistoryInputs,
  tableGetStatsInputs,
  tableDeleteInputs,
} from "./table.services.inputs.js";
// Services
import serviceProceed from "../_miscelaneous/serviceProceed.js";

export async function serviceTableCreate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableCreate");
  }
  serviceProceed(tableCreateInputs);
}

export async function serviceTableSave() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableSave");
  }
  serviceProceed(tableSaveInputs);
}

export async function serviceTableGetDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetDetails");
  }
  serviceProceed(tableGetDetailsInputs);
}

export async function serviceTableGetHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetHistory");
  }
  serviceProceed(tableGetHistoryInputs);
}

export async function serviceTableGetStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetStats");
  }
  serviceProceed(tableGetStatsInputs);
}

export async function serviceTableDelete() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDelete");
  }
  serviceProceed(tableDeleteInputs);
}
