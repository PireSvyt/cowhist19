import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from "react-redux";
import {Box, Stack, Chip} from '@mui/material';

class StatGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      
      <Box>
        <Plot
          data={ Object.values(props.curves) }
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
          {props.ranking.map((player) => {
            let rankingPlayer = { ...player };
            let pseudoPlayer = props.players.filter((tablePlayer) => {
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
                color={player._id === props.userid ? "primary" : "default" }
                padding="5"
              />
            );
          })}
        </Box>
      </Box>
    );
  }
}
export default StatGraph