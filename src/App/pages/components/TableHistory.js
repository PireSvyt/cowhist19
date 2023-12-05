import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, List, ListItem, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

// Components
import HistoryCard from "./HistoryCard.js";
// Services
import { serviceTableGetHistory } from "../../services/table/table.services.js";

export default function TableHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableHistory");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    tableState: useSelector((state) => state.tableSlice.state),
    history: useSelector((state) => state.tableSlice.games),
    players: useSelector((state) => state.tableSlice.players),
  };

  // Load
  if (select.loadedDetails && !select.loadedHistory) {
    serviceTableGetHistory();
  }

  return (
    <Box>
      {!(select.tableState.details === "available" && select.tableState.history === "available") ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.history.length === 0 ? (
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
            {t("table.label.nogameshistoryexplanation")}
          </Typography>
        </Box>
      ) : (
        <List 
          dense={true} 
          data-testid="component-table history-list-game"
        >
          {select.history.map((game) => {
            let gameCard = { ...game };
            gameCard.attackPlayers = [];
            gameCard.defensePlayers = [];
            Object.values(game.players).forEach((gamePlayer) => {
              let pseudoPlayer = select.players.filter((tablePlayer) => {
                return tablePlayer._id === gamePlayer._id;
              });
              let readyGamePlayer = { ...gamePlayer };
              if (pseudoPlayer.length > 0) {
                readyGamePlayer.pseudo = pseudoPlayer[0].pseudo;
              } else {
                readyGamePlayer.pseudo = "a removed user";
              }
              gameCard[gamePlayer.role + "Players"].push(readyGamePlayer);
            });
            return (
              <ListItem key={"game-" + game._id}>
                <HistoryCard game={gameCard} />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
