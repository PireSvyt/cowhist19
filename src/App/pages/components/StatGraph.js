import React from 'react';
import ReactECharts from 'echarts-for-react';
import {Box, Chip} from '@mui/material';
import { useSelector } from "react-redux";

import appStore from '../../store/appStore';

export default function StatGraph() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("StatGraph");
  }

  // Selects
  const select = {
    userid: useSelector((state) => state.userSlice.userid),
    players: useSelector((state) => state.tableSlice.players),
    ranking: useSelector((state) => state.tableSlice.ranking),
    graph: useSelector((state) => state.tableSlice.graph),
  };
  
  // Changes
  const changes = {
    focus: (userid) => {
      if (userid !== select.userid) {
        appStore.dispatch({
          type: "tableSlice/setGraph",
          payload: {
            field: "focus",
            value: userid
          },
        });
      }
    },
  };

  // Size
  const chartStyle = {
    height: window.innerHeight -350,
    width: window.innerWidth * 0.95,
  };
  // Options
  let chartOption = {
    animationDuration: 500,
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      top: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: select.graph.dates
    },
    yAxis: {
      type: 'value',
      splitLine: { show: true }
    },
    series: Object.values(select.graph.series)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Box sx={{mt: 2, mb: 2}}>
        <ReactECharts 
          style={chartStyle} 
          option={chartOption} 
        />
      </Box>
      <Box 
        sx={{
          width: window.innerWidth * 0.95
        }}  
      >
        {select.ranking.map((player) => {
          let rankingPlayer = { ...player };
          let pseudoPlayer = select.players.filter((tablePlayer) => {
            return tablePlayer.userid === player.userid;
          });
          if (pseudoPlayer.length > 0) {
            rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
            return (
              <Chip 
                key={rankingPlayer.userid}
                sx={{
                  m: 0.5
                }} 
                label={rankingPlayer.pseudo} 
                size="small" 
                color={rankingPlayer.userid === select.userid ? "secondary" : 
                ( rankingPlayer.userid === select.graph.focus ? "primary" : "default" ) }
                margin={5}
                onClick={() => changes.focus(rankingPlayer.userid)}
              />
            );
          } else {
            return (null);
          }
        })}
      </Box>
    </Box>
  )
} 