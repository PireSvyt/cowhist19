import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, Card } from "@mui/material";

class RankingCard extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("RankingCard.constructor " + this.props.player._id);
    }
    // Handlers
    this.stringifyPlayer = this.stringifyPlayer.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("RankingCard.render " + this.props.player._id);
    }
    // i18n
    const { t } = this.props;

    return (
      <Card sx={{ width: "100%", p: 1 }} onClick={this.handleOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} gutterBottom>
            {this.stringifyPlayer()}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {t("table.label.score") +
              " " +
              parseFloat(this.props.player.scorev0).toFixed(1)}
          </Typography>
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
            {this.props.player.games + " " + t("table.label.games")}
          </Typography>
          <Typography sx={{ typography: "caption" }}>
            {parseFloat(this.props.player.ratevictory * 100).toFixed(0) +
              "% " +
              t("table.label.victory")}
          </Typography>
          <Typography sx={{ typography: "caption" }}>
            {parseFloat(this.props.player.rateattack * 100).toFixed(0) +
              "% " +
              t("table.label.attack")}
          </Typography>
        </Box>
      </Card>
    );
  }

  // Helpers
  stringifyPlayer() {
    if (this.props.players.length !== 0) {
      let pseudolist = this.props.players.filter(
        (p) => this.props.player._id === p._id
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

  // Handles
}

export default withTranslation()(RankingCard);
