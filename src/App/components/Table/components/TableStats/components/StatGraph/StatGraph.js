import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from "react-redux";

// Store
import appStore from '../../../../../../store/appStore';

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }
  
    // Selects
    const select = {
      curves: useSelector((state) => state.sliceTableStats.curves),
    };

    return (
      <Plot
        data={ Object.values(select.curves) }
        layout={ {
          autosize: false,
          width: window.innerWidth * 0.9,
        } }
        config={ {
          displayModeBar: false, 
          showlegend: false
        } }
      />
    );
  }
  
