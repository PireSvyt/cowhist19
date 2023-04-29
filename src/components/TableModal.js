import * as React from "react";
import { withTranslation } from "react-i18next";
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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";

import InviteModal from "./InviteModal";
import { apiTableSave } from "../api/table";
import Snack from "./Snack";
import { random_id } from "../resources/toolkit";

let emptyTable = {
  name: undefined,
  users: [],
};

class TableModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.constructor");
    }
    super(props);
    this.state = {
      table: { ...emptyTable },
      disabled: true,
      loading: false,
      componentHeight: undefined,
      openInviteModal: false,
      openSnack: false,
      snack: { id: undefined },
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);

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
      <div>
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
                    <User user={user} callback={this.handleUserCallback} />
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
      </div>
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

  // handleCloseMenu
  handleInviteModalOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.handleInviteModalOpen");
    }
    this.setState((prevState, props) => ({
      openInviteModal: true,
    }));
  }
  handleInviteModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleInviteModalCallback");
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openInviteModal: false,
        }));
        break;
      default:
    }
  }
  handleUserCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleUserCallback");
    }
    switch (action) {
      default:
    }
  }
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleClose");
    }

    this.setState((prevState, props) => ({
      table: { ...emptyTable },
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

    // Proceed or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("this.state.table errors");
      console.log(errors);
    }
    // Post or publish
    if (proceed === true) {
      this.setState((prevState, props) => ({
        disabled: true,
        loading: true,
      }));
      // API call
      apiTableSave(this.state.table).then((res) => {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("res ");
          console.log(res);
        }
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              table: emptyTable,
              openSnack: true,
              snack: { uid: random_id(), id: "table-snack-success" },
            });
            this.props.callback("close");
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

export default withTranslation()(TableModal);
