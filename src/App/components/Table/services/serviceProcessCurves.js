// Reducers
import appStore from "../../../store/appStore.js";
// Shared
import { random_id } from "../../../shared/services/toolkit.js";

async function serviceProcessCurves(graph) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProcessCurves");
  }

  try {  
    // getState
    let userid = appStore.getState().sliceUserDetails.id
    let players = appStore.getState().sliceTableDetails.players
    let focus = appStore.getState().sliceTableStats.graph.focus

    // Dates
    let dates = graph.map(game => {
        let date = new Date(game.date)
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        return ( dd + "/" + mm )
    })
    appStore.dispatch({
        type: "sliceTableStats/setdates",
        payload: {
            dates: dates
        },
    });

    // Process
    let playerids = players.map(player => player._id)
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
                color: '#1976d2',
                width: 3
            }
        }
        if (playerid === focus) {
            style = {
                color: '#9c27b0',
                width: 3
            }
        }
        // Dispatch outcome
        appStore.dispatch({
            type: "sliceTableStats/setserie",
            payload: {
                _id: playerid,
                serie: {
                    type: 'line',
                    //step: 'end',
                    data: stats,
                    lineStyle: style,
                    showSymbol: false
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

export default serviceProcessCurves;
