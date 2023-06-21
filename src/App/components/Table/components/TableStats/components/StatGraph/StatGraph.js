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
      loadedDetails: useSelector((state) => state.sliceTableDetails.loaded),
      loadedStats: useSelector((state) => state.sliceTableStats.loaded),
      stats: useSelector((state) => state.sliceTableStats.stats),
      players: useSelector((state) => state.sliceTableDetails.players),
      view: useSelector((state) => state.sliceTableStats.view),
    };


    return (
    <Plot
    data={[
        {
          x: [1, 2, 3], y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'red'},
        },
        {
          type: 'bar', x: [1, 2, 3], y: [2, 5, 3]
        },
    ]}
    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
    />
    );
  }
  
