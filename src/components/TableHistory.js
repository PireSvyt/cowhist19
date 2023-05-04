import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, List, ListItem, Card } from "@mui/material";

import ToComeModal from "../components/ToComeModal";

class TableHistory extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.constructor");
    }
    super(props);
    this.state = {};
    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.render");
    }

    return (
      <Box>
        <List dense={true}>
          {this.props.history.map((game) => (
            <ListItem key={"game-" + game._id}>
              <GameCard
                game={game}
                players={this.props.players}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  // Handlers
}

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.constructor " + this.props.game._id);
    }
    // Helpers
    this.stringifyPlayers = this.stringifyPlayers.bind(this)
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
      <Card sx={{ width: "100%", p: 1 }} >
        <Typography variant="caption" >{this.props.game.date}</Typography>
        <Typography>{this.props.game.contract}</Typography>
        <Typography>{this.props.game.outcome}</Typography>
        <Typography variant="body2">{this.stringifyPlayers()}</Typography>
      </Card>
    );
  }

  // Hedlpers
  stringifyPlayers () {
      let res = ""
      // Attack
      this.props.game.players.forEach(actualPlayer => {
        if (actualPlayer.role === "attack") {
          let pseudoPlayer = this.props.players.filter(player => {return player._id === actualPlayer._id})
          res = res + pseudoPlayer[0].pseudo + " "
        }
      });
      res = res + "against "
      // Defense
      this.props.game.players.forEach(actualPlayer => {
        if (actualPlayer.role === "defense") {
          let pseudoPlayer = this.props.players.filter(player => {return player._id === actualPlayer._id})
          res = res + pseudoPlayer[0].pseudo + " "
        }
      });
      return res
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

export default withTranslation()(TableHistory);
