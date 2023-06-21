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
    let playerids = select.players.map(player => player._id)
    playerids.forEach(playerid => {
      // Create curve
      let dates = select.stats.graph.map(game => game.date)
      let stats = select.stats.graph.map(game => game.players[playerid].averagepoints)
      // Adjust curve beginning
      if (dates.length !== stats.length) {
        for (let d = 0; d < dates.length - stats.length; d++) {
          stats.unshift(null)
        }
      }
      // Add curve to data to be displayed
      data.push({
        x: dates, 
        y: stats,
        type: 'scatter',
        mode: 'lines',
      })
    });

    console.log(data)

    return (
    <Plot
      data={data}
      layout={ {} }
      config={ {displayModeBar: false} }
    />
    );
  }
  
