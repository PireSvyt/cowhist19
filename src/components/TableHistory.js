import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Box, List, ListItem } from "@mui/material";

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
              <GameCard game={game} />
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

    return (
      <Card sx={{ width: "100%", p: 1 }} onClick={this.handleOpen}>
        <Typography>{this.props.game.contract}</Typography>
      </Card>
    );
  }

  // Handles
  handleOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.handleOpen " + this.props.table._id);
    }
  }
  handleDelete() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameCard.handleDelete " + this.props.table._id);
    }
  }
}

export default withTranslation()(TableHistory);
