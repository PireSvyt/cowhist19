import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, List, ListItem, Typography,ToggleButtonGroup,ToggleButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SsidChartIcon from '@mui/icons-material/SsidChart';

// Components
import RankingCard from "../StatCard/RankingCard.js";
import StatGraph from "./StatGraph/StatGraph.js";
// Service
import serviceGetTableStats from "../../services/serviceGetTableStats.js";
// Store
import appStore from "../../../../store/appStore.js";

export default function TableStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableStats");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    loadedDetails: useSelector((state) => state.sliceTableDetails.loaded),
    loadedStats: useSelector((state) => state.sliceTableStats.loaded),
    players: useSelector((state) => state.sliceTableDetails.players),
    view: useSelector((state) => state.sliceTableStats.view),
    userid: useSelector((state) => state.sliceUserDetails.id),
    ranking: useSelector((state) => state.sliceTableStats.stats.ranking),
  };

  // Load
  if (select.loadedDetails && !select.loadedStats) {
    serviceGetTableStats();
  }

  // Changes
  const changes = {
    view: (newView) => { 
      // Fire loading
      serviceGetTableStats(newView);
      // Change view   
      appStore.dispatch({
        type: "sliceTableStats/view",
        payload: {
          view: newView
        },
      });
    }
  };

  return (
    <Box>
      {!(select.loadedDetails === true && select.loadedStats === true) ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.ranking.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("table.label.nogames")}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("table.label.nogamesstatsexplanation")}
          </Typography>
        </Box>
      ) : (
        <Box>     
          <Box 
            sx={{
              display: "flex",
              flexDirection: 'row' ,
              justifyContent: 'flex-end',
              alignItems: "center",
              mt: 2, mb: 2
            }} 
          >

            <FormControl variant="standard" sx={{ mr: 2 }}>
              <InputLabel>{t("table.label.data")}</InputLabel>
              <Select
                name="contract"
                value={"averagepoints"}
                disabled
              >
                <MenuItem key={"contract.key"} value={"averagepoints"}>
                  {t("table.label.averagepoints")}
                </MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup value={select.view} >
              <ToggleButton value="ranking" onClick={() => changes.view("ranking")} >
                <StarBorderIcon />
              </ToggleButton>
              <ToggleButton value="graph" onClick={() => changes.view("graph")} >
                <SsidChartIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>    

          {select.view === "ranking"? (
            <List dense={true}>
            {select.ranking.map((player) => {
              let rankingPlayer = { ...player };
              let pseudoPlayer = select.players.filter((tablePlayer) => {
                return tablePlayer._id === player._id;
              });
              if (pseudoPlayer.length > 0) {
                rankingPlayer.pseudo = pseudoPlayer[0].pseudo;
                return (
                  <ListItem key={"ranking-" + rankingPlayer._id}>
                    <RankingCard player={rankingPlayer} />
                  </ListItem>
                );
              } else {
                return (null);
              }
              
            })}
          </List>
          ) : (null)}

          {select.view === "graph"? (
            <StatGraph/>
          ) : (null)}
        
        </Box>
      )}
    </Box>
  );
}
