import * as React from "react";
import { withTranslation } from "react-i18next";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Slider,
  Select,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Services
import serviceGameSaveCheck from "./services/serviceGameSaveCheck.js";
import serviceGameSave from "./services/serviceGameSave.js";
import apiGameDetails from "./services/apiGameDetails.js";

// Resources
import emptyGame from "./resources/emptyGame.js";

// Shared
import serviceModalChange from "../../../../shared/services/serviceModalChange.js";
import Snack from "../../../../shared/components/Snack/Snack.js";
import { random_id } from "../../../../shared/services/toolkit.js";

// Reducers
import reduxStore from "../../../../store/reduxStore.js";

class GameModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.constructor");
    }
    super(props);
    this.state = {
      disabled: false,
      contractError: false,
      attackError: false,
      defenseError: false,
      outcomeError: false,
      loading: false,
      game: { ...emptyGame },
      attackRequirement: "",
      defenseRequirement: "",
      componentHeight: undefined,
      openSnack: false,
      snack: { uid: "", id: "generic-snack-errornetwork" },
    };

    // Handles
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <div>
        <Dialog
          id="dialog_transaction"
          open={this.props.open}
          onClose={this.handleClose}
          fullWidth={true}
        >
          <DialogTitle>{t("game.label.title")}</DialogTitle>
          <DialogContent
            sx={{
              height: this.state.componentHeight,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <FormControl variant="standard">
                <InputLabel>{t("game.input.contract")}</InputLabel>
                <Select
                  name="contract"
                  value={this.state.game.contract}
                  onChange={this.handleChange}
                  error={this.state.contractError}
                >
                  {this.props.contracts.map((contract) => (
                    <MenuItem key={contract.key} value={contract.key}>
                      {t("game.label.contract." + contract.key)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <Autocomplete
                  name="attack"
                  multiple
                  disableClearable
                  inputValue=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={
                        t("game.input.attack") +
                        " " +
                        this.state.attackRequirement
                      }
                      error={this.state.attackError}
                    />
                  )}
                  options={this.props.players.filter(
                    (player) =>
                      !this.state.game.players.find(
                        (actualPlayer) => actualPlayer._id === player._id
                      )
                  )}
                  getOptionLabel={(option) => option.pseudo}
                  defaultValue={[]}
                  value={
                    this.state.game === undefined
                      ? []
                      : this.state.game.players.filter(
                          (player) => player.role === "attack"
                        )
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.pseudo}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  onChange={(event, newValue) => {
                    event.target = {
                      name: "attack",
                      value: newValue,
                    };
                    this.handleChange(event, newValue);
                  }}
                >
                  {this.props.players.map((player) => (
                    <MenuItem key={player._id} value={player._id}>
                      {player.pseudo}
                    </MenuItem>
                  ))}
                </Autocomplete>
              </FormControl>

              <FormControl variant="standard">
                <Autocomplete
                  name="defense"
                  multiple
                  disableClearable
                  inputValue=""
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={
                        t("game.input.defense") +
                        " " +
                        this.state.defenseRequirement
                      }
                      error={this.state.defenseError}
                    />
                  )}
                  options={this.props.players.filter(
                    (player) =>
                      !this.state.game.players.find(
                        (actualPlayer) => actualPlayer._id === player._id
                      )
                  )}
                  getOptionLabel={(option) => option.pseudo}
                  defaultValue={[]}
                  value={
                    this.state.game === undefined
                      ? []
                      : this.state.game.players.filter(
                          (player) => player.role === "defense"
                        )
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.pseudo}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  onChange={(event, newValue) => {
                    event.target = {
                      name: "defense",
                      value: newValue,
                    };
                    this.handleChange(event, newValue);
                  }}
                >
                  {this.props.players.map((player) => (
                    <MenuItem key={player._id} value={player._id}>
                      {player.pseudo}
                    </MenuItem>
                  ))}
                </Autocomplete>
              </FormControl>

              <Typography variant="caption" gutterBottom>
                {t("game.input.outcome")}
              </Typography>
              <Slider
                name="outcome"
                defaultValue={0}
                value={this.state.game.outcome || 0}
                onChange={this.handleChange}
                step={1}
                marks
                min={-8}
                max={8}
                valueLabelDisplay="on"
                sx={{ mt: 4 }}
                color={this.state.outcomeError ? "error" : "primary"}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic.button.close")}
            </Button>
            <LoadingButton
              variant="contained"
              onClick={this.handleSave}
              disabled={this.state.disabled}
              loading={this.state.loading}
            >
              {t("generic.button.save")}
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
        />
      </div>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("GameModal.componentDidMount");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.componentDidUpdate");
    }
    if (
      prevState.open !== this.props.open ||
      prevState.game !== this.props.game
    ) {
      // i18n
      const { t } = this.props;

      if (reduxStore.getState().userDetails.token !== "" && this.props.gameid !== "") {
        // Load
        apiGameDetails(this.props.game).then((res) => {
          switch (res.status) {
            case 200:
              console.log("loaded game");
              console.log(res.game);
              // Adding user pseudo
              // TODO
              this.setState({
                game: res.game,
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                game: emptyGame,
                openSnack: true,
                snack: { uid: random_id(), id: "generic-snack-errornetwork" },
              }));
              this.props.callback("closeItem");
              break;
            default:
              this.setState((prevState, props) => ({
                game: emptyGame,
                openSnack: true,
                snack: { uid: random_id(), id: "generic-snack-errorunknown" },
              }));
              this.props.callback("closeItem");
          }
        });
      } else {
        let game = { ...emptyGame };
        game.table = this.props.tableid;
        this.setState((prevState, props) => ({
          game: game,
        }));
      }
    }
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleClose");
    }

    this.setState((prevState, props) => ({
      game: { ...emptyGame },
      attackRequirement: "",
      defenseRequirement: "",
      contractError: false,
      attackError: false,
      defenseError: false,
      outcomeError: false,
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleChange");
    }
    let serviceChangeOutcome = serviceModalChange(
      event.target,
      this.state.game,
      {
        contracts: this.props.contracts,
      }
    );
    if (serviceChangeOutcome.errors.length > 0) {
      console.log("serviceModalChange errors");
      console.log(serviceChangeOutcome.errors);
    } else {
      serviceChangeOutcome.stateChanges.signup = serviceChangeOutcome.newValue;
      this.setState((prevState, props) => serviceChangeOutcome.stateChanges);
    }
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleSave");
    }

    // Check inputs
    let proceedCheckOutcome = serviceGameSaveCheck(
      this.state.game,
      this.props.contracts
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

      serviceGameSave({ ...this.state.game }).then((proceedOutcome) => {
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
      console.log("GameModal.handleSnack " + action);
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

export default withTranslation()(GameModal);
