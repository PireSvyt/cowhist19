import React from 'react';
import ReactECharts from 'echarts-for-react';
import {Box, Chip, Stack} from '@mui/material';
import { useSelector } from "react-redux";

export default function StatGraph() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("StatGraph");
  }

  // Selects
  const select = {
    userid: useSelector((state) => state.sliceUserDetails.id),
    players: useSelector((state) => state.sliceTableDetails.players),
    ranking: useSelector((state) => state.sliceTableStats.stats.ranking),
    graph: useSelector((state) => state.sliceTableStats.graph),
  };
  const chartStyle = {
    height: window.innerWidth * 0.95,
    width: window.innerWidth * 0.95,
  };

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

console.log("dates", select.graph.dates)

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
      <Stack spacing={1} direction="row" sx={{ maxWidth: window.innerWidth * 0.95 }}>
        {select.ranking.map((player) => {
          let rankingPlayer = { ...player };
          let pseudoPlayer = select.players.filter((tablePlayer) => {
            return tablePlayer._id === player._id;
          });
          if (pseudoPlayer.length > 0) {
            rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
            return (
              <Chip 
                label={rankingPlayer.pseudo} 
                size="small" 
                color={rankingPlayer._id === select.userid ? "primary" : "default" }
                margin={5}
              />
            );
          } else {
            return (null);
          }
        })}
      </Stack>
    </Box>
  )
} 