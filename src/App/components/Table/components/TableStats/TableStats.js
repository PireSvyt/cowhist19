import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, List, ListItem, Card, Typography } from "@mui/material";

// Components
import RankingCard from "./components/RankingCard/RankingCard.js";
// Service
import serviceGetTableStats from "../../services/serviceGetTableStats.js";

export default function TableStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableStats");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    stats: useSelector((state) => state.sliceTableStats.stats),
    players: useSelector((state) => state.sliceTableDetails.players),
  };

  return (
    <Box>
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
    </Box>
  );
}
