import React from 'react';
import Plot from 'react-plotly.js';
import {Box, Chip} from '@mui/material';

class StatGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Layout
    let config = {
      displayModeBar: false, 
      showlegend: false
    }

    // Config
    let layout = {
      autosize: false,
      width: window.innerWidth * 0.9,
      margin: {
        l: 10,
        r: 10,
        t: 10,
        b: 10
      },
      datarevision: true
    }
    
    return (
      <Box>
        <Plot
          data={ Object.values(this.props.curves) }
          layout={ layout }
          config={ config }
        />
        <Box>
          {this.props.ranking.map((player) => {
            let rankingPlayer = { ...player };
            let pseudoPlayer = this.props.players.filter((tablePlayer) => {
              return tablePlayer._id === player._id;
            });
            if (pseudoPlayer.length > 0) {
              rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
            } else {
              rankingPlayer.pseudo = "A PLAYER";
            }
            return (
              <Chip 
                label={rankingPlayer.pseudo} 
                size="small" 
                color={rankingPlayer._id === this.props.userid ? "primary" : "default" }
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