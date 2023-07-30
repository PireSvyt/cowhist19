import React from 'react';
import ReactECharts from 'echarts-for-react';
import {Box, Chip, Stack} from '@mui/material';
import { useSelector } from "react-redux";

import appStore from '../../../../../store/appStore';

export default function Graph() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Graph");
  }

  // Selects
  const select = {
    userid: useSelector((state) => state.sliceUserDetails.id),
    players: useSelector((state) => state.sliceTableDetails.players),
    ranking: useSelector((state) => state.sliceTableStats.stats.ranking),
    graph: useSelector((state) => state.sliceTableStats.graph),
  };
  
  // Changes
  const changes = {
    focus: (id) => {
      if (id !== select.userid) {
        appStore.dispatch({
          type: "sliceTableStats/setfocus",
          payload: {
            focus: id
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
            return tablePlayer._id === player._id;
          });
          if (pseudoPlayer.length > 0) {
            rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
            return (
              <Chip 
                sx={{
                  m: 0.5
                }} 
                label={rankingPlayer.pseudo} 
                //size="small" 
                color={rankingPlayer._id === select.userid ? "primary" : 
                ( rankingPlayer._id === select.graph.focus ? "secondary" : "default" ) }
                margin={5}
                onClick={() => changes.focus(rankingPlayer._id)}
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