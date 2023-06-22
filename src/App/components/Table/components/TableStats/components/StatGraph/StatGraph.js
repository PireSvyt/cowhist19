import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from "react-redux";

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }
  
    // Selects
    const select = {
      stats: useSelector((state) => state.sliceTableStats.stats),
      players: useSelector((state) => state.sliceTableDetails.players),
    };

    // Process
    let data = []
    let dates = select.stats.graph.map(game => game.date)
    let playerids = select.players.map(player => player._id)
    let playerstats = {}
    playerids.forEach(playerid => {
      // Create curve
      let stats = select.stats.graph.map(game => {
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
      data.push({
        x: dates, 
        y: playerstats[playerid],
        type: 'scatter',
        mode: 'lines',
      })
    });

    return (
      <Plot
        data={data}
        layout={ {} }
        config={ {displayModeBar: false} }
      />
    );
  }
  
