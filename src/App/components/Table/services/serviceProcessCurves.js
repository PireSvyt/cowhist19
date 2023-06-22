import { useSelector } from "react-redux";
// Reducers
import appStore from "../../../store/appStore.js";

function serviceProcessCurves(graph) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceProcessCurves");
  }
  
  // Selects
  const select = {
    userid: useSelector((state) => state.sliceUserDetails.id),
    players: useSelector((state) => state.sliceTableDetails.players),
  };

  // Process
  let data = []
  let dates = graph.map(game => game.date)
  let playerids = select.players.map(player => player._id)
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
    if (playerid === select.userid) {
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
}

export default serviceProcessCurves;
