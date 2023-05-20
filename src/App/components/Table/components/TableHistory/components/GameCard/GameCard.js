import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Card, Box, IconButton } from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";

// Reducers
import appStore from "../../../../../../store/appStore.js";

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.constructor " + this.props.game._id);
    }

    // Helpers
    this.stringifyPlayers = this.stringifyPlayers.bind(this);
    this.stringifyOutcome = this.stringifyOutcome.bind(this);
    this.stringifyDate = this.stringifyDate.bind(this);

    // Handlers
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.render " + this.props.game._id);
    }
    // i18n
    const { t } = this.props;

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
          <Box>
            <Typography variant="caption">{this.stringifyDate()}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {t("game.label.contract." + this.props.game.contract) +
                " " +
                this.stringifyOutcome()}
            </Typography>
          </Box>

          <IconButton onClick={this.handleDelete}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
        <Typography variant="body2">{this.stringifyPlayers()}</Typography>
      </Card>
    );
  }

  // Hedlpers
  stringifyPlayers() {
    // i18n
    const { t } = this.props;

    let res = "";
    // Attack
    this.props.game.players.forEach((actualPlayer) => {
      if (actualPlayer.role === "attack") {
        let pseudoPlayer = appStore
          .getState()
          .tableDetails.players.filter((player) => {
            return player._id === actualPlayer._id;
          });
        if (pseudoPlayer.length > 0) {
          res = res + pseudoPlayer[0].pseudo + ", ";
        } else {
          res = res + "a removed user, ";
        }
      }
    });
    res = res + t("game.label.against") + " ";
    // Defense
    this.props.game.players.forEach((actualPlayer) => {
      if (actualPlayer.role === "defense") {
        let pseudoPlayer = appStore
          .getState()
          .tableDetails.players.filter((player) => {
            return player._id === actualPlayer._id;
          });
        if (pseudoPlayer.length > 0) {
          res = res + pseudoPlayer[0].pseudo + ", ";
        } else {
          res = res + "a removed user, ";
        }
      }
    });
    return res;
  }
  stringifyOutcome() {
    // i18n
    const { t } = this.props;

    if (this.props.game.outcome >= 0) {
      return t("game.label.won") + "  +" + this.props.game.outcome;
    } else {
      return t("game.label.lost") + "  " + this.props.game.outcome;
    }
  }
  stringifyDate() {
    let date = new Date(this.props.game.date);
    return date.toLocaleString("fr-FR");
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  // Handles
  handleOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.handleOpen " + this.props.game._id);
    }
    this.props.callback("open", this.props.game._id);
  }
  handleDelete() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.handleDelete " + this.props.game._id);
    }
    this.props.callback("delete", this.props.game._id);
  }
}

export default withTranslation()(GameCard);
