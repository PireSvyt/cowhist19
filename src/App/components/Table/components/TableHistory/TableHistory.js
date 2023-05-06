import * as React from "react";
import { withTranslation } from "react-i18next";
import {  Box, List, ListItem } from "@mui/material";

import GameCard from "./components/GameCard/GameCard";

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
          {this.props.players !== [] ? 
            this.props.history.map((game) => (
              <ListItem key={"game-" + game._id}>
                <GameCard
                  game={game}
                  players={this.props.players}
                />
              </ListItem>
            ))
            :
            <div/>
          }
        </List>
      </Box>
    );
  }

  // Handlers
}

export default withTranslation()(TableHistory);
