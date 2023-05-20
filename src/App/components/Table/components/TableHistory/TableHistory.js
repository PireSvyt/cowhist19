import * as React from "react";
import { withTranslation } from "react-i18next";
import { Box, List, ListItem } from "@mui/material";

// Components
import GameCard from "./components/GameCard/GameCard.js";
// Services
import apiGameDelete from "./services/apiGameDelete.js";
// Shared
import ConfirmModal from "../../../../shared/components/ConfirmModal/ConfirmModal.js";
import { random_id } from "../../../../shared/services/toolkit.js";
// Reducers
import appStore from "../../../../store/appStore.js";

class TableHistory extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.constructor");
    }
    super(props);
    this.state = {
      openConfirmModal: false,
      confirmModalTitle: "",
      confirmModalContent: "",
      confirmModalCTA: [],
    };

    // Handles
    this.handleGameCardCallback = this.handleGameCardCallback.bind(this);
    this.handleConfirmModalCallback =
      this.handleConfirmModalCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.render");
    }

    return (
      <Box>
        <List dense={true}>
          {appStore.getState().tableDetails.players !== [] ? (
            appStore.getState().tablehistory.games.map((game) => (
              <ListItem key={"game-" + game._id}>
                <GameCard
                  game={game}
                  callback={this.handleGameCardCallback}
                />
              </ListItem>
            ))
          ) : (
            <div />
          )}
        </List>

        <ConfirmModal
          open={this.state.openConfirmModal}
          title={this.state.confirmModalTitle}
          content={this.state.confirmModalContent}
          callToActions={this.state.confirmModalCTA}
          callback={this.handleConfirmModalCallback}
        />
      </Box>
    );
  }

  // Handlers
  handleGameCardCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.handleGameCardCallback " + action);
    }
    switch (action) {
      case "delete":
        this.setState({
          openConfirmModal: true,
          confirmModalTitle: "game.confirm.delete.title",
          confirmModalContent: "game.confirm.delete.content",
          confirmModalCTA: [
            {
              label: "generic.button.cancel",
              callback: () => this.handleConfirmModalCallback("close"),
            },
            {
              label: "generic.button.proceed",
              callback: () =>
                this.handleConfirmModalCallback("delete", details),
              variant: "contained",
              color: "error",
            },
          ],
        });
        break;
      case "close":
        this.setState((prevState, props) => ({
          openConfirmModal: false,
          confirmModalTitle: "",
          confirmModalContent: "",
          confirmModalCTA: [],
        }));
        break;
      default:
    }
  }

  handleConfirmModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableHistory.handleConfirmModalCallback " + action);
    }
    switch (action) {
      case "delete":
        // Close confirm modal
        this.setState((prevState, props) => ({
          openConfirmModal: false,
          confirmModalTitle: "",
          confirmModalContent: "",
          confirmModalCTA: [],
        }));
        // API call
        apiGameDelete( details).then((res) => {
          switch (res.status) {
            case 200:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: { uid: random_id(), id: "game.snack.deleted" },
              }));
              this.props.callback("refresh");
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: { uid: random_id(), id: "generic.snack.errorunknown" },
              }));
          }
        });
        break;
      case "close":
        this.setState((prevState, props) => ({
          openConfirmModal: false,
          confirmModalTitle: "",
          confirmModalContent: "",
          confirmModalCTA: [],
        }));
        break;
      default:
    }
  }
}

export default withTranslation()(TableHistory);
