import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, List, ListItem, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

// Components
import RankingCard from "./RankingCard.js";
// Service
import { serviceTableGetStats } from "../../services/table/table.services.js";

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
    stats: useSelector((state) => state.sliceTableStats.stats),
    players: useSelector((state) => state.sliceTableDetails.players),
  };

  // Load
  if (select.loadedDetails && !select.loadedStats) {
    serviceTableGetStats();
  }

  return (
    <Box>
      {!(select.loadedDetails === true && select.loadedStats === true) ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.stats.ranking.length === 0 ? (
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
        <List dense={true}>
          {select.stats.ranking.map((player) => {
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
              <ListItem key={"ranking-" + rankingPlayer._id}>
                <RankingCard player={rankingPlayer} />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
