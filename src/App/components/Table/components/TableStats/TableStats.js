import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, List, ListItem, Card, Typography } from "@mui/material";

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
        {select.stats.ranking.map((player) => (
          <ListItem key={"ranking-" + player._id}>
            <RankingCard player={player} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Player card
  function RankingCard(props) {
    // Stringify
    function stringifyPlayer() {
      if (select.players.length !== 0) {
        let pseudolist = select.players.filter(
          (p) => props.player._id === p._id
        );
        if (pseudolist.length > 0) {
          return pseudolist[0]["pseudo"];
        } else {
          return "Placeholder";
        }
      } else {
        return "Placeholder";
      }
    }

    return (
      <Card sx={{ width: "100%", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} gutterBottom>
            {stringifyPlayer()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {t("table.label.score") +
                " " +
                parseFloat(props.player.scorev0).toFixed(1)}
            </Typography>
            <Typography sx={{ pl: 1 }}>
              {"(av.pts " +
                parseFloat(props.player.averagepoints).toFixed(1) +
                ")"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography sx={{ typography: "caption" }}>
            {props.player.games + " " + t("table.label.games")}
          </Typography>
          <Typography sx={{ typography: "caption" }}>
            {parseFloat(props.player.ratevictory * 100).toFixed(0) +
              "% " +
              t("table.label.victory")}
          </Typography>
          <Typography sx={{ typography: "caption" }}>
            {parseFloat(props.player.rateattack * 100).toFixed(0) +
              "% " +
              t("table.label.attack")}
          </Typography>
        </Box>
      </Card>
    );
  }
}
