import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, Typography } from "@mui/material";

export default function RankingCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("RankingCard " + props.player.userid);
  }
  // i18n
  const { t } = useTranslation();
  return (
    <Card 
      sx={{ width: "100%", p: 1 }}
      data-testid="component-table analytics-listitem-player"
      index={props.index}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} gutterBottom>
          {props.player.pseudo}
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
