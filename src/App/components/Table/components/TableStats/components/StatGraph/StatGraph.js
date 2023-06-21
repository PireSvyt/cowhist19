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
    select.players.array.forEach(element => {
      // Create curves
      let dates = select.stats.graph
      // Add curve
      data.push({
        x: dates, y: stat,
        type: 'scatter',
        mode: 'lines',
      })
    });

    return (
    <Plot
    data={[
        {
          x: [1, 2, 3], y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines',
        },
        {
          x: [1, 2, 3], y: [2, 2, 4],
          type: 'scatter',
          mode: 'lines',
        },
        {
          x: [1, 2, 3], y: [1, 2, 5],
          type: 'scatter',
          mode: 'lines',
        }
    ]}
    layout={ {} }
    />
    );
  }
  
