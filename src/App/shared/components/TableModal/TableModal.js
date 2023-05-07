import * as React from "react";
import { withTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
  Card,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import AddIcon from "@mui/icons-material/Add.js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";

// Components
import InviteModal from "./components/InviteModal/InviteModal.js";

// Services
import apiTableSave from "./services/apiTableSave.js";
import apiTableDelete from "./services/apiTableDelete.js";

// Shared
import ConfirmModal from "../ConfirmModal/ConfirmModal.js";
import Snack from "../Snack/Snack.js";
import { random_id } from "../../services/toolkit.js";
import apiTableDetails from "../../services/apiTableDetails.js";

let emptyTable = {
  _id: "",
  name: "",
  users: [],
  players: [],
  contracts: [],
};

class TableModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.constructor");
    }
    super(props);
    this.state = {
      table: { ...emptyTable },
      loaded: false,
      nameError: false,
      disabled: false,
      loading: false,
      componentHeight: undefined,
      openInviteModal: false,
      openConfirmModal: false,
      confirmModalTitle: "",
      confirmModalContent: "",
      confirmModalCTA: [],
      openSnack: false,
      snack: { id: undefined },
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);
    this.getTableDetails = this.getTableDetails.bind(this);
    this.addUserToPlayers = this.addUserToPlayers.bind(this);

    // Handles
    this.handlePlayerCardCallback = this.handlePlayerCardCallback.bind(this);
    this.handleOpenInviteModal = this.handleOpenInviteModal.bind(this);
    this.handleInviteModalCallback = this.handleInviteModalCallback.bind(this);
    this.handleConfirmModalCallback =
      this.handleConfirmModalCallback.bind(this);
    this.canSave = this.canSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Dialog
          id="dialog_table"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>{t("table-title")}</DialogTitle>
          <DialogContent
            sx={{
              height: this.state.componentHeight,
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                name="name"
                label={t("generic-input-name")}
                variant="standard"
                value={this.state.table.name || ""}
                onChange={this.handleChange}
                autoComplete="off"
                sx={{ mb: 1 }}
                error={this.state.nameError}
              />

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body1"
                  sx={{
                    pt: 2,
                    pb: 2,
                  }}
                >
                  {t("table-label-players")}
                </Typography>
                <IconButton sx={{ p: 2 }} onClick={this.handleOpenInviteModal}>
                  <AddIcon />
                </IconButton>
              </Stack>

              {this.state.table === undefined ? (
                <div />
              ) : (
                <List dense={true}>
                  {this.state.table.players.map((player) => (
                    <ListItem key={"player-" + player._id}>
                      <PlayerCard
                        player={player}
                        callback={this.handlePlayerCardCallback}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic-button-cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              onClick={this.handleSave}
              disabled={this.state.disabled}
              loading={this.state.loading}
            >
              {t("generic-button-save")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <InviteModal
          open={this.state.openInviteModal}
          callback={this.handleInviteModalCallback}
          token={this.props.token}
        />

        <ConfirmModal
          open={this.state.openConfirmModal}
          title={this.state.confirmModalTitle}
          content={this.state.confirmModalContent}
          callToActions={this.state.confirmModalCTA}
          callback={this.handleConfirmModalCallback}
        />

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
          language={this.props.language}
        />
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("TableModal.componentDidMount");
    }
    this.updateComponentHeight();
  }
  componentDidUpdate(prevState, prevProps) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.componentDidUpdate");
    }
    // Load
    if (this.state.loaded === false) {
      console.log("TableModal loaded = false");
      // Load
      if (
        this.props.tableid !== "" &&
        this.props.tableid !== undefined &&
        this.props.open === true
      ) {
        console.log("TableModal loading from api " + this.props.tableid);
        this.getTableDetails();
      }
      // Build from scratch
      if (
        (this.props.tableid === "" || this.props.tableid === undefined) &&
        this.props.open === true
      ) {
        console.log("TableModal building from scratch");
        this.addUserToPlayers();
      }
    }
  }

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Helpers
  canSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.canSave");
    }
    let proceed = true;
    let errors = [];

    // Checks

    // Missing name?
    if (this.state.table.name === undefined || this.state.table.name === "") {
      proceed = false;
      errors.push("table-error-missingname");
      this.setState((prevState, props) => ({
        nameError: true,
      }));
    }

    // Empty use list at create?
    if (this.state.table._id === "" || this.state.table._id === undefined) {
      if (this.state.table.players.length === 0) {
        proceed = false;
        errors.push("table-error-creationwithoutplayers");
      }
    }

    // Outcome
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("proceed " + proceed);
    }
    return {
      proceed: proceed,
      errors: errors,
    };
  }
  getTableDetails() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.getTableDetails ");
    }
    if (this.props.token !== undefined) {
      apiTableDetails(this.props.token, this.props.tableid).then((data) => {
        this.setState((prevState, props) => ({
          table: data.table,
          disabled: false,
          loaded: true,
        }));
      });
    }
  }
  addUserToPlayers() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.addUserToPlayers ");
    }
    let tableToSave = this.state.table;
    const decodedToken = jwt_decode(this.props.token);

    let addCreator = true;
    tableToSave.players.forEach((player) => {
      if (player._id === decodedToken.id) {
        addCreator = false;
      }
    });
    if (addCreator) {
      tableToSave.players.push({
        _id: decodedToken.id,
        pseudo: decodedToken.pseudo,
        login: decodedToken.login,
      });
      this.setState((prevState, props) => ({
        table: tableToSave,
        loaded: true,
      }));
    }
  }

  // handleCloseMenu
  handleOpenInviteModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleOpenInviteModal");
    }
    this.setState((prevState, props) => ({
      openInviteModal: true,
    }));
  }
  handleInviteModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleInviteModalCallback " + action);
    }
    switch (action) {
      case "useradd":
        var previousTable = this.state.table;
        let toAdd = true;
        previousTable.players.forEach((player) => {
          if (player._id === details._id) {
            toAdd = false;
          }
        });
        if (toAdd) {
          previousTable.players.push(details);
        }
        this.setState((prevState, props) => ({
          table: previousTable,
          openInviteModal: false,
        }));
        break;
      case "close":
        this.setState((prevState, props) => ({
          openInviteModal: false,
        }));
        break;
      default:
    }
  }
  handleConfirmModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleConfirmModalCallback " + action);
    }
    switch (action) {
      case "delete":
        // API call
        apiTableDelete(this.props.token, this.state.table._id).then((res) => {
          /*if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("res ");
            console.log(res);
          }*/
          switch (res.status) {
            case 200:
              // Table deleted
              // Redirection to home
              window.location = "/";
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: { uid: random_id(), id: "generic-snack-errorunknown" },
                disabled: false,
                loading: false,
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
          disabled: false,
          loading: false,
        }));
        break;
      default:
    }
  }
  handlePlayerCardCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handlePlayerCardCallback " + action);
    }
    switch (action) {
      case "userremove":
        var previousTable = this.state.table;
        let sublist = previousTable.players.filter((player) => {
          return player._id !== details;
        });
        previousTable.players = sublist;
        this.setState((prevState, props) => ({
          table: previousTable,
        }));
        break;
      default:
    }
  }
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleClose");
    }

    this.setState((prevState, props) => ({
      table: { ...emptyTable },
      nameError: false,
      loaded: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleChange");
    }

    const target = event.target;
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }*/
    var previousTable = this.state.table;
    switch (target.name) {
      case "name":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change name : " + target.value);
        }
        this.setState((prevState, props) => ({
          nameError: false,
        }));
        previousTable.name = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.table");
      console.log(this.state.table);
    }*/
    // Check inputs
    this.setState((prevState, props) => ({
      table: previousTable,
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleSave");
      //console.log("this.state.table");
      //console.log(this.state.table);
    }

    // Check inputs
    var canSaveOutcome = this.canSave();

    // Proceed or not?
    /*if (canSaveOutcome.errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("this.state.table canSaveOutcome.errors");
      console.log(canSaveOutcome.errors);
    }*/
    // Post or publish
    if (canSaveOutcome.proceed === true) {
      // Lock CTA
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      // Switch from players to users
      let tableToSave = this.state.table;
      tableToSave.users = tableToSave.players;

      // Delete in case of empty player list for an existing table
      if (tableToSave._id !== "") {
        if (tableToSave.users.length === 0) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log(
              "TableModal empty list of users for table edit, propose deletion"
            );
          }
          canSaveOutcome.proceed = false;
          this.setState({
            openConfirmModal: true,
            confirmModalTitle: "table-confirm-title-deletenoeusers",
            confirmModalContent: "table-confirm-content-deletenoeusers",
            confirmModalCTA: [
              {
                label: "generic-button-cancel",
                callback: () => this.handleConfirmModalCallback("close"),
              },
              {
                label: "generic-button-proceed",
                callback: () => this.handleConfirmModalCallback("delete"),
                variant: "contained",
                color: "error",
              },
            ],
          });
        }
      }

      // Saving
      if (canSaveOutcome.proceed === true) {
        // API call
        apiTableSave(this.props.token, tableToSave).then((res) => {
          /*if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("res ");
            console.log(res);
          }*/
          switch (res.status) {
            case 201:
              // Table creation
              this.props.callback("totable", res.id);
              break;
            case 200:
              // Table edit
              this.props.callback("totable", res.id);
              break;
            default:
              this.setState((prevState, props) => ({
                openSnack: true,
                snack: { uid: random_id(), id: "generic-snack-errorunknown" },
                disabled: false,
                loading: false,
              }));
          }
        });
      }
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: {
          uid: random_id(),
          id: "generic-snack-error",
          details: canSaveOutcome.errors,
        },
      }));
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false,
        }));
        break;
      default:
    }
  }
}

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("PlayerCard.constructor");
    }
    // Handlers
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("PlayerCard.render " + this.props.player._id);
    }
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
          <Typography>{this.props.player.pseudo}</Typography>
          <IconButton onClick={this.handleRemoveUser}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      </Card>
    );
  }

  // Handles
  handleRemoveUser() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("PlayerCard.handleRemoveUser " + this.props.player._id);
    }
    this.props.callback("userremove", this.props.player._id);
  }
}

export default withTranslation()(TableModal);
