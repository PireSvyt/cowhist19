import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, List, ListItem, Card } from "@mui/material";

class TableStats extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.constructor");
    }
    super(props);
    this.state = {      
    };
    // Handles

  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        {this.props.stats.ranking !== undefined ?
          <List dense={true}>
            {this.props.stats.ranking.map((player) => (
              <ListItem key={"ranking-" + player._id}>
                <RankingCard
                  player={player}
                  players={this.props.players}
                />
              </ListItem>
            ))}
          </List>
          : 
          <div/>
        }
        
      </Box>
    );
  }

  // Handlers
}
class RankingCard extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("RankingCard.constructor " + this.props.player._id);
    }
    // Handlers
    this.stringifyPlayer = this.stringifyPlayer.bind(this)
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("RankingCard.render " + this.props.player._id);
    }
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
        <Typography sx={{ fontWeight: 'bold'}} gutterBottom>{this.stringifyPlayer()}</Typography>
        <Typography sx={{ fontWeight: 'bold'}}>{"score " + parseFloat(this.props.player.scorev0).toFixed(1)}</Typography>
      </Box>  
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
      <Typography sx={{ typography: 'caption' }}>{this.props.player.games + " games"}</Typography>
      <Typography sx={{ typography: 'caption' }}>{parseFloat(this.props.player.ratevictory*100).toFixed(0)+"% victory"}</Typography>
      <Typography sx={{ typography: 'caption' }}>{parseFloat(this.props.player.rateattack*100).toFixed(0)+"% attack"}</Typography>
      </Box> 
      </Card>
    );
  }

  // Helpers
  stringifyPlayer () {
    if (this.props.players.length !== 0) {
      return this.props.players.filter(aPlayer => this.props.player._id === aPlayer._id)[0]["pseudo"]
    } else {
      return "Placeholder"
    }
    
  }

  // Handles
}

export default withTranslation()(TableStats);
