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
import { apiTableSave } from "../api/table";
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
      userid: "",
      openSnack: false,
      snack: { id: undefined },
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);
    this.getEmptyTable = this.getEmptyTable.bind(this);

    // Handles
    this.handleUserCallback = this.handleUserCallback.bind(this);
    this.handleInviteModalOpen = this.handleInviteModalOpen.bind(this);
    this.handleInviteModalCallback = this.handleInviteModalCallback.bind(this);
    this.canProceed = this.canProceed.bind(this);
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
                  variant="h6"
                  sx={{
                    pt: 2,
                    pb: 2,
                  }}
                >
                  {t("table-label-players")}
                </Typography>
                <IconButton sx={{ p: 2 }} onClick={this.handleInviteModalOpen}>
                  <AddIcon />
                </IconButton>
              </Stack>

              <List dense={true}>
                {this.state.table.users.map((user) => (
                  <ListItem key={"user-" + user._id}>
                    <User
                      user={user}
                      callback={this.handleUserCallback}
                      userid={this.state.userid}
                    />
                  </ListItem>
                ))}
              </List>
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
      if (this.state.userid === "") {
        const decodedToken = jwt_decode(this.props.token);
        this.setState((prevState, props) => ({
          userid: decodedToken.id,
        }));
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
  canProceed() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.canProceed");
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
    if (this.props.token !== undefined) {
      const decodedToken = jwt_decode(this.props.token);
      return {
        _id: "",
        name: undefined,
        users: [
          {
            _id: decodedToken._id,
            pseudo: decodedToken.pseudo,
          },
        ],
      };
    } else {
      return {
        _id: "",
        name: undefined,
        users: [],
      };
    }
  }

  // handleCloseMenu
  handleInviteModalOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleInviteModalOpen");
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
        previousTable.users.forEach((user) => {
          if (user._id === details._id) {
            toAdd = false;
          }
        });
        if (toAdd) {
          previousTable.users.push(details);
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
  handleUserCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleUserCallback " + action);
    }
    switch (action) {
      case "userremove":
        var previousTable = this.state.table;
        let sublist = previousTable.users.filter((user) => {
          return user._id !== details;
        });
        previousTable.users = sublist;
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
    let { proceed, errors } = this.canProceed();
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
    let { proceed, errors } = this.canProceed();

    // Add user on table create if not yet in
    let tableToSave = this.state.table;
    if (tableToSave._id === "") {
      const decodedToken = jwt_decode(this.props.token);
      let users = tableToSave.users;
      let addCreator = true;
      users.forEach((user) => {
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

    // Proceed or not?
    /*if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("this.state.table errors");
      console.log(errors);
    }*/
    // Post or publish
    if (proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));
      // API call
      apiTableSave(this.props.token, tableToSave).then((res) => {
        /*if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("res ");
          console.log(res);
        }*/
        switch (res.status) {
          case 201:
            // Table creation
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
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: { uid: random_id(), id: "generic-snack-error", details: errors },
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

class User extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("User.constructor");
    }
    // Handlers
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("User.render " + this.props.user._id);
    }
    return (
      <Card sx={{ width: "100%", pl: "1em", pr: "1em" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{this.props.user.pseudo}</Typography>
          <IconButton
            onClick={this.handleRemoveUser}
            disabled={this.props.user._id === this.props.userid}
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
      console.log("User.handleRemoveUser " + this.props.user._id);
    }
    this.props.callback("userremove", this.props.user._id);
  }
}

export default withTranslation()(TableModal);
