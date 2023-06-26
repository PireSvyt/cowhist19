import React, {useEffect} from 'react';
import Plot, { Config, Data, Layout } from 'react-plotly.js';
import {Box, Chip} from '@mui/material';


export default function StatGraph({ curves, ranking, players, userid }) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("StatGraph");
  }

  // Layout
  let config = {
    displayModeBar: false, 
    showlegend: false
  }
  // Config
  let layout = {
    autosize: false,
    width: window.innerWidth * 0.9,
    height: window.innerWidth * 0.9,
    margin: {
      l: 15,
      r: 15,
      t: 15,
      b: 15
    },
    datarevision: true
  }

  const [chartData, setChartData] = useState(curves);
  useEffect(() => {
    if (curves.length) {
        setChartData(() => {
          return curves
        });
    } else {
      setChartData(() => {
        return []
      });
    }
  }, [curves]);

  console.log("curves")
  console.log(curves)
  console.log("ranking")
  console.log(ranking)
  console.log("players")
  console.log(players)
  console.log("userid")
  console.log(userid)

  return (
    <Box>
      <Plot
        data={ chartData || []}
        layout={ layout }
        config={ config }
      />
      <Box>
        {ranking.map((player) => {
          let rankingPlayer = { ...player };
          let pseudoPlayer = players.filter((tablePlayer) => {
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
              color={rankingPlayer._id === userid ? "primary" : "default" }
              margin={"5px"}
            />
          );
        })}
      </Box>
    </Box>
  )
} 