// Reducers
import appStore from "../../../store/appStore.js";

async function serviceProcessCurves(graph) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProcessCurves");
  }

  try {  
    // getState
    let userid = appStore.getState().sliceUserDetails.id
    let players = appStore.getState().sliceTableDetails.players

    // Process
    let dates = graph.map(game => game.date)
    let playerids = players.map(player => player._id)
    let playerstats = {}
    playerids.forEach(playerid => {
        // Create curve
        let stats = graph.map(game => {
        if (game.players[playerid] !== undefined) {
            return game.players[playerid].averagepoints
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
        // Add curve to data to be displayed
        playerstats[playerid] = stats
        if (playerid === userid) {
        let linelayout = {
            color: 'rgb(55, 128, 191)',
            width: 2.5
        }
        } else {
        let linelayout = {
            color: 'rgb(211, 211, 211)',
            width: 1.5
        }
        }
        appStore.dispatch({
        type: "sliceTableStats/setcurve",
        payload: {
            _id: playerid,
            curve: {
            x: dates, 
            y: stats,
            type: 'scatter',
            mode: 'lines',
            line: linelayout
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
