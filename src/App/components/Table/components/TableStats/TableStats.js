import * as React from "react";
import { withTranslation } from "react-i18next";
import { Box, List, ListItem, Card } from "@mui/material";

// Components
import RankingCard from "./components/RankingCard/RankingCard";

class TableStats extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.constructor");
    }
    super(props);
    this.state = {};
    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableStats.render");
    }

    return (
      <Box>
        {this.props.stats.ranking !== undefined ? (
          <List dense={true}>
            {this.props.stats.ranking.map((player) => (
              <ListItem key={"ranking-" + player._id}>
                <RankingCard player={player} players={this.props.players} />
              </ListItem>
            ))}
          </List>
        ) : (
          <div />
        )}
      </Box>
    );
  }

  // Handlers
}

export default withTranslation()(TableStats);
