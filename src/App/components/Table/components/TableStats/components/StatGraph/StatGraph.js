import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from "react-redux";
import {Box, Stack, Chip} from '@mui/material';

export default function StatGraph(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("StatGraph");
    }

    // Selects
    const select = {
      userid: useSelector((state) => state.sliceUserDetails.id),
      players: useSelector((state) => state.sliceTableDetails.players),
      ranking: useSelector((state) => state.sliceTableStats.stats.ranking),
      curves: useSelector((state) => state.sliceTableStats.curves),
    };
    
    // State
    const [curves, setCurves] = useState([]);
    useEffect(() => {
      setCurves(select.curves);
    });

    return (
      <Box>
        <Plot
          data={ Object.values(curves) }
          layout={ {
            autosize: false,
            width: window.innerWidth * 0.9,
            margin: {
              l: 10,
              r: 10,
              t: 10,
              b: 10
            },
            datarevision: true
          } }
          config={ {
            displayModeBar: false, 
            showlegend: false
          } }
        />
        <Box>
          {select.ranking.map((player) => {
            let rankingPlayer = { ...player };
            let pseudoPlayer = select.players.filter((tablePlayer) => {
              return tablePlayer._id === player._id;
            });
            if (pseudoPlayer.length > 0) {
              rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
            } else {
              rankingPlayer.pseudo = "A PLAYER";
            }
            return (
              <Chip 
                label={player.pseudo} 
                size="small" 
                color={player._id === select.userid ? "primary" : "default" }
                padding="5"
              />
            );
          })}
        </Box>
      </Box>
    );
  }
  
