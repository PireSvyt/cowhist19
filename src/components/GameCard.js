import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, Card } from "@mui/material";

class GameCard extends React.Component {
    constructor(props) {
      super(props);
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("GameCard.constructor " + this.props.game._id);
      }
  
      // Helpers
      this.stringifyPlayers = this.stringifyPlayers.bind(this)
      this.stringifyOutcome = this.stringifyOutcome.bind(this)
  
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>{this.props.game.contract}</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{" " + this.stringifyOutcome()}</Typography>
          </Box>        
          <Typography variant="body2">{this.stringifyPlayers()}</Typography>
        </Card>
      );
    }
  
    // Hedlpers
    stringifyPlayers () {
        // i18n
        const { t } = this.props;

        let res = ""
        // Attack
        this.props.game.players.forEach(actualPlayer => {
            if (actualPlayer.role === "attack") {
            let pseudoPlayer = this.props.players.filter(player => {return player._id === actualPlayer._id})
            res = res + pseudoPlayer[0].pseudo + " "
            }
        });
        res = res + t("table-label-against") + " "
        // Defense
        this.props.game.players.forEach(actualPlayer => {
            if (actualPlayer.role === "defense") {
            let pseudoPlayer = this.props.players.filter(player => {return player._id === actualPlayer._id})
            res = res + pseudoPlayer[0].pseudo + " "
            }
        });
        return res
    }
    stringifyOutcome () {
      // i18n
      const { t } = this.props;
  
      if (this.props.game.outcome >= 0) {
        return t("table-label-won") + " in +" + this.props.game.outcome
      } else {
        return t("table-label-lost") + " in " + this.props.game.outcome
      }
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
