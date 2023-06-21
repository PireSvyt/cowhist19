import React from 'react';
import Plot from 'react-plotly.js';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }
    // i18n
    const { t } = useTranslation();
  
    // Selects
    const select = {
      stats: useSelector((state) => state.sliceTableStats.stats),
      players: useSelector((state) => state.sliceTableDetails.players),
      view: useSelector((state) => state.sliceTableStats.view),
    };

    // Process
    let data = []
    console.log(select.players)
    Object.keys(select.players).forEach(playerid => {
      // Create curves
      let dates = select.stats.graph.map(game => game.date)
      let stats = select.stats.graph.map(game => {
        console.log(game.players[playerid])
        return game.players[playerid].averagepoints
      })
      // Adjust curve beginning
      if (dates.length !== stats.length) {
        for (let d = 0; d < dates.length - stats.length; d++) {
          stats.unshift(null)
        }
      }
      // Add curve
      data.push({
        x: dates, y: stats,
        type: 'scatter',
        mode: 'lines',
      })
    });

    console.log(data)

    return (
    <Plot
    data={data}
    layout={ {} }
    />
    );
  }
  
