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
import { random_id } from "../_miscelaneous/toolkit.js";
import serviceProceed from "../_miscelaneous/serviceProceed.js";
// Store
import appStore from "../../store/appStore.js";

export async function serviceTableCreate() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableCreate");
  }
  await serviceProceed(tableCreateInputs);
}

export async function serviceTableSave() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableSave");
  }
  await serviceProceed(tableSaveInputs);
}

export async function serviceTableGetDetails() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetDetails");
  }
  await serviceProceed(tableGetDetailsInputs);
}

export async function serviceTableGetHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetHistory");
  }
  await serviceProceed(tableGetHistoryInputs);
}

export async function serviceTableGetStats(view = "ranking") {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableGetStats");
  }
  let directInputs = {
    need: view
  }
  await serviceProceed(tableGetStatsInputs, directInputs);
}

export async function serviceTableDelete() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableDelete");
  }
  await serviceProceed(tableDeleteInputs);
}


export async function serviceTableProcessCurves(graph) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceTableProcessCurves");
  }

  try {  
    // getState
    let userid = appStore.getState().userSlice.userid
    let players = appStore.getState().tableSlice.players
    let focus = appStore.getState().tableSlice.graph.focus

    // Dates
    let dates = graph.map(game => {
      let date = new Date(game.date)
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate();
      return ( dd + "/" + mm )
    })
    appStore.dispatch({
      type: "tableSlice/setGraph",
      payload: {
        field: "dates",
        values: dates
      },
    });

    // Process
    let playerids = players.map(player => player.userid)
    playerids.forEach(playerid => {
      // Create curve
      let stats = graph.map(game => {
      if (game.players[playerid] !== undefined) {
        return game.players[playerid]
      } else {
        return null
      }
      })
      // Adjust in case of null
      for (let p = 1; p < stats.length; p++) {
        if (stats[p] === null) {
          stats[p] = stats[p-1]
        }
      }
      // Style
      let style = {
        color: '#BDBDBD',
        width: 1
      }
      if (playerid === userid) {
        style = {
          color: '#ef6c00', // Secondary
          width: 3
        }
      }
      if (playerid === focus) {
        style = {
          color: '#2d7683', // Primary
          width: 3
        }
      }
      // Dispatch outcome
      appStore.dispatch({
        type: "tableSlice/setGraph",
        payload: {
          field: "serie",
          values: {
            userid: playerid,
            serie: {
              type: 'line',
              //step: 'end',
              data: stats,
              lineStyle: style,
              showSymbol: false
            }
          }
        },
      });
    });
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