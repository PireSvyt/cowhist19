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
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import InviteModal from "./InviteModal";
import ConfirmModal from "./ConfirmModal";
import { apiTableSave, apiTableDetails, apiTableDelete } from "../api/table";
import Snack from "./Snack";
import { random_id } from "../resources/toolkit";

class TableModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.constructor");
    }
    super(props);
    this.state = {
      table: this.getEmptyTable(),
      disabled: true,
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
    this.getEmptyTable = this.getEmptyTable.bind(this);
    this.getTableDetails = this.getTableDetails.bind(this)

    // Handles
    this.handlePlayerCardCallback = this.handlePlayerCardCallback.bind(this);
    this.handleOpenInviteModal = this.handleOpenInviteModal.bind(this);
    this.handleInviteModalCallback = this.handleInviteModalCallback.bind(this);
    this.handleConfirmModalCallback = this.handleConfirmModalCallback.bind(this);
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

              { this.state.table === undefined ? 
                <div/> 
              : 
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
              }
              
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
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.componentDidUpdate");
    }
    if (this.props.token !== undefined && this.props.token !== null) {
      // Load table data for table edit
      if (
        prevState.open !== this.props.open && this.props.open === true
      ) {
      if (this.props.tableid !== "" && this.props.tableid !== undefined) {
          this.getTableDetails()
          }
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
    if (this.state.table.name === undefined || this.state.table.name === "") {
      proceed = false;
      errors.push(" Name undefined");
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
  getEmptyTable() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.getEmptyTable");
    }
    return {
      _id: "",
      name: undefined,
      players: [],
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
        }));
      });
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
      table: this.getEmptyTable(),
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
    let { proceed, errors } = this.canSave();
    if (proceed === true) {
      this.setState((prevState, props) => ({
        table: previousTable,
        disabled: false,
      }));
    } else {
      this.setState((prevState, props) => ({
        table: previousTable,
        disabled: true,
      }));
    }
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleSave");
      //console.log("this.state.table");
      //console.log(this.state.table);
    }

    // Check inputs
    let canSaveOutcome = this.canSave();

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
      tableToSave.users = tableToSave.players

      // Add user on table create if not yet in
      if (tableToSave._id === "") {
        const decodedToken = jwt_decode(this.props.token);
        let addCreator = true;
        tableToSave.users.forEach((user) => {
          if (user._id === decodedToken.id) {
            addCreator = false;
          }
        });
        if (addCreator) {
          tableToSave.users.push({
            _id: decodedToken.id,
            pseudo: decodedToken.pseudo,
            login: decodedToken.login,
          });
        }
      }

      // Delete in case of empty player list for an existing table
      if (tableToSave._id !== "") {
        if (tableToSave.users.length === 0) {
          // Prevent proceeding to saving
          canSaveOutcome.proceed = false
          this.setState({
            openConfirmModal: true,
            confirmModalTitle: "table-confirm-title-deletenoeusers",
            confirmModalContent: "table-confirm-content-deletenoeusers",
            confirmModalCTA: [ 
              {
                label: "generic-button-cancel", 
                callback: () => this.handleConfirmModalCallback("close")
              },
              {
                label: "generic-button-proceed", 
                callback: () => this.handleConfirmModalCallback("delete"),
                variant: "contained", 
                color: "error"
              } 
            ]
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
              this.setState((prevState, props) => ({
                disabled: false,
                loading: false,
              }));
              break;
            case 200:
              // Table edit
              this.setState({
                table: this.getEmptyTable(),
                openSnack: true,
                snack: { uid: random_id(), id: "table-snack-success" },
              });
              this.props.callback("totable", res.id);
              this.setState((prevState, props) => ({
                disabled: false,
                loading: false,
              }));
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
        snack: { uid: random_id(), id: "generic-snack-error", details: canSaveOutcome.errors },
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
          <IconButton
            onClick={this.handleRemoveUser}
          >
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
