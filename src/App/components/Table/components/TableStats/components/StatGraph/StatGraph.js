import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from "react-redux";
import {Box, Stack, Chip} from '@mui/material';

// Store
import appStore from '../../../../../../store/appStore';

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }
  
    // Selects
    const select = {
      curves: useSelector((state) => state.sliceTableStats.curves),
      userid: useSelector((state) => state.sliceUserDetails.id),
      players: useSelector((state) => state.sliceTableDetails.players),
    };

    console.log(select.curves)

    return (
      <Box>
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
        <Box>
          {select.players.map(player => {
            return (<Chip 
              label={player.pseudo} 
              size="small" 
              color={player._id === select.userid ? "primary" : "default" }
            />)
          })}
        </Box>
      </Box>
    );
  }
  
