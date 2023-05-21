import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import serviceProceed from "./services/serviceProceed.js";
import apiTableDelete from "./services/apiTableDelete.js";
// Reducers
import appStore from "../../../store/appStore.js";

export default function TableModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableModal");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    open: useSelector((state) => state.sliceTableModal.open),
    id: useSelector((state) => state.sliceTableModal.id),
    inputs: useSelector((state) => state.sliceTableModal.inputs),
    errors: useSelector((state) => state.sliceTableModal.errors),
    disabled: useSelector((state) => state.sliceTableModal.disabled),
    loading: useSelector((state) => state.sliceTableModal.loading),
  };

  // Changes
  const changes = {
    name: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { name: e.target.value },
          errors: { name: false },
        },
      });
    },
    players: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { players: e.target.value },
          errors: { players: false },
        },
      });
    },
  };

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Player card
  function PlayerCard(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("PlayerCard " + props.player._id);
    }
    // i18n
    const { t } = useTranslation();

    // Handles
    function removeUser() {
      appStore.dispatch({
        type: "sliceTableModal/removeuser",
        payload: props.player._id,
      });
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
          <Typography>{props.player.pseudo}</Typography>
          <IconButton onClick={removeUser}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      <Dialog
        id="dialog_table"
        open={select.open}
        onClose={() => {
          appStore.dispatch({ type: "sliceTableModal/close" });
        }}
        fullWidth={true}
      >
        <DialogTitle>{t("table.label.title")}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
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
              label={t("generic.input.name")}
              variant="standard"
              value={select.inputs.name}
              onChange={changes.name}
              autoComplete="off"
              sx={{ mb: 1 }}
              error={select.errors.name}
            />

            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  pt: 2,
                  pb: 2,
                }}
                color={select.errors.players ? "error" : null}
              >
                {t("table.label.players")}
              </Typography>
              <IconButton
                sx={{ p: 2 }}
                onClick={() => {
                  appStore.dispatch({ type: "sliceInviteModal/open" });
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>

            <List dense={true}>
              {select.inputs.players.map((player) => (
                <ListItem key={"player-" + player._id}>
                  <PlayerCard player={player} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceTableModal/close" });
            }}
          >
            {t("generic.button.cancel")}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={serviceProceed}
            disabled={select.disabled}
            loading={select.loading}
          >
            {t("generic.button.save")}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <InviteModal />
    </Box>
  );
}

/*
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

  }
  componentDidUpdate(prevState, prevProps) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.componentDidUpdate");
    }
    // Load
    if (this.state.loaded === false) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        //console.log("TableModal loaded = false");
      }
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

  // Helpers
  getTableDetails() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.getTableDetails ");
    }
    apiTableDetails(this.props.tableid).then((data) => {
      this.setState((prevState, props) => ({
        table: data.table,
        disabled: false,
        loaded: true,
      }));
    });
  }
  addUserToPlayers() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.addUserToPlayers ");
    }
    let tableToSave = this.state.table;

    let addCreator = true;
    tableToSave.players.forEach((player) => {
      if (player._id === appStore.getState().userDetails.id) {
        addCreator = false;
      }
    });
    if (addCreator) {
      tableToSave.players.push({
        _id: appStore.getState().userDetails.id,
        pseudo: appStore.getState().userDetails.pseudo,
        login: appStore.getState().userDetails.login,
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
      case "userremove":
        var previousTable = this.state.table;
        let sublist = previousTable.players.filter((player) => {
          return player._id !== details;
        });
        previousTable.players = sublist;
        this.setState((prevState, props) => ({
          table: previousTable,
          openConfirmModal: false,
          confirmModalTitle: "",
          confirmModalContent: "",
          confirmModalCTA: [],
          disabled: false,
          loading: false,
        }));
        break;
      case "delete":
        // API call
        apiTableDelete(this.state.table._id).then((res) => {
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
        this.setState({
          openConfirmModal: true,
          confirmModalTitle: "table.confirm.deleteuser.title",
          confirmModalContent: "table.confirm.deleteuser.content",
          confirmModalCTA: [
            {
              label: "generic.button.cancel",
              callback: () => this.handleConfirmModalCallback("close"),
            },
            {
              label: "generic.button.proceed",
              callback: () => {
                this.handleConfirmModalCallback("userremove", details);
              },
              variant: "contained",
              color: "error",
            },
          ],
        });
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
    // Check inputs
    this.setState((prevState, props) => ({
      table: previousTable,
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleSave");
    }

    // Check inputs
    function callbackConfirmDelete(action, details) {
      this.handleConfirmModalCallback(action, details);
    }
    let proceedCheckOutcome = serviceProceedCheck(
      this.state.table,
      this.handleConfirmModalCallback
    );
    if (proceedCheckOutcome.errors.length > 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("proceedCheckOutcome errors");
        console.log(proceedCheckOutcome.errors);
      }
    }
    this.setState((prevState, props) => proceedCheckOutcome.stateChanges);

    // Post or publish
    if (proceedCheckOutcome.proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));

      serviceProceed({ ...this.state.table }).then((proceedOutcome) => {
        if (proceedOutcome.errors.length > 0) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("proceedOutcome errors");
            console.log(proceedOutcome.errors);
          }
        }
        this.setState((prevState, props) => proceedOutcome.stateChanges);
        proceedOutcome.callbacks.forEach((callback) => {
          if (callback.option === undefined) {
            this.props.callback(callback.key);
          } else {
            this.props.callback(callback.key, callback.option);
          }
        });
      });
    } else {
      // Snack
      if (proceedCheckOutcome.errors.length > 0) {
        this.setState((prevState, props) => ({
          openSnack: true,
          snack: {
            uid: random_id(),
            id: "generic.snack.error.withdetails",
            details: proceedCheckOutcome.errors,
          },
        }));
      }
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
*/
