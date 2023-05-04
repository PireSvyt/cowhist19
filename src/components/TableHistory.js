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

    function stringifyPlayers (players) {
      let res = ""
      // Attack
      players.forEach(player => {
        if (player.role === "attack") {
          // TODO FIND ON PLAYERS _ID
          res = res + this.props.players[player._id].pseudo + " "
        }
      });
      res = res + "against "
      // Defense
      players.forEach(player => {
        if (player.role === "defense") {
          res = res + this.props.players[player._id].pseudo + " "
        }
      });
      return res
    }

    return (
      <Card sx={{ width: "100%", p: 1 }} >
        <Typography variant="caption" >{this.props.game.date}</Typography>
        <Typography>{this.props.game.contract}</Typography>
        <Typography>{this.props.game.outcome}</Typography>
        <Typography variant="body2">{stringifyPlayers(this.props.game.players)}</Typography>
      </Card>
    );
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
