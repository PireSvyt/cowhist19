import React from 'react';
import Plot from 'react-plotly.js';

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }
    return (
    <Plot
    data={[
        {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'red'},
        },
        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
    ]}
    layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
    />
    );
  }
  
