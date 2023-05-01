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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import contracts from "../resources/contracts";
import { apiGameDetails, apiGameSave } from "../api/game";
import Snack from "./Snack";
import { random_id } from "../resources/toolkit";

let emptyGame = {
  _id: undefined,
  contract: "",
  date: undefined,
  attack: [],
  defense: [],
  outcome: 0,
};

class GameModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.constructor");
    }
    super(props);
    this.state = {
      disabled: true,
      loading: false,
      game: { ...emptyGame },
      gameDate: undefined,
      users: [],
      componentHeight: undefined,
      openSnack: false,
      snack: undefined,
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);

    // Handles
    this.canSave = this.canSave.bind(this);
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
          <DialogTitle>{t("game-title")}</DialogTitle>
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
                <InputLabel>{t("game-input-contract")}</InputLabel>
                <Select
                  name="contract"
                  value={this.state.game.contract}
                  onChange={this.handleChange}
                >
                  {contracts.map((contract) => (
                    <MenuItem key={contract.key} value={contract.key}>
                      {t("game-label-" + contract.key)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <Autocomplete
                  name="attack"
                  value={this.state.game.attack}
                  onChange={this.handleChange}
                  options={this.props.users}
                  multiple
                  defaultValue={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("game-input-attack")}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.pseudo}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                >
                  {this.props.users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.pseudo}
                    </MenuItem>
                  ))}
                </Autocomplete>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel>{t("game-input-defense")}</InputLabel>
                <Select
                  name="defense"
                  value={this.state.game.defense}
                  onChange={this.handleChange}
                >
                  {this.props.users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.pseudo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="caption" gutterBottom>
                {t("game-input-outcome")}
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
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic-button-close")}
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
      //console.log("GameModal.componentDidMount");
    }
    this.updateComponentHeight();
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

      if (this.props.gameid !== "") {
        // Load
        apiGameDetails(this.props.game).then((res) => {
          switch (res.status) {
            case 200:
              console.log("loaded game");
              console.log(res.game);
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
        this.setState((prevState, props) => ({
          game: { ...emptyGame },
        }));
      }
    }
  }

  // Updates
  updateComponentHeight() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.updateComponentHeight");
    }
    this.setState({
      componentHeight: window.innerHeight - 115,
    });
  }

  // Helpers
  canSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.canSave");
    }
    let proceed = true;
    let errors = [];
    // Checks
    if (
      this.state.game.contract === undefined ||
      this.state.game.contract === ""
    ) {
      proceed = false;
      errors.push(" Contract undefined");
    }
    if (this.state.game.attack === []) {
      proceed = false;
      errors.push(" Attack empty");
    }
    if (
      this.state.game.attack.length !==
      contracts[this.state.game.contract]["attack"]
    ) {
      proceed = false;
      errors.push(
        " Attack incompatible with contract (" +
          contracts[this.state.game.contract]["attack"] +
          ")"
      );
    }
    if (this.state.game.defense === []) {
      proceed = false;
      errors.push(" Defense empty");
    }
    if (
      this.state.game.defense.length !==
      contracts[this.state.game.contract]["defense"]
    ) {
      proceed = false;
      errors.push(
        " Defense incompatible with contract (" +
          contracts[this.state.game.contract]["defense"] +
          ")"
      );
    }
    if (this.state.game.outcome === undefined) {
      proceed = false;
      errors.push(" Outcome undefined");
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

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleClose");
    }

    this.setState((prevState, props) => ({
      game: { ...emptyGame },
    }));

    this.props.callback("close");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleChange");
    }
    const target = event.target;
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }*/
    var previousGame = this.state.game;
    switch (target.name) {
      case "contract":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change contract : " + target.value);
        }
        previousGame.contract = target.value;
        break;
      case "attack":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change attack : " + target.value);
        }
        previousGame.attack = target.value;
        break;
      case "defense":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change defense : " + target.value);
        }
        previousGame.defense = target.value;
        break;
      case "outcome":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change outcome : " + target.value);
        }
        previousGame.outcome = target.value;
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match : " + target.name);
        }
    }
    // Update
    /*if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.game");
      console.log(this.state.game);
    }*/
    this.setState((prevState, props) => ({
      game: previousGame,
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleSave");
    }
    // i18n
    const { t } = this.props;

    // Check inputs
    let { save, errors } = this.canSave();

    // Save or not?
    /*if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }*/
    // Post or publish
    if (save === true) {
      /*if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.game);
        console.log(this.state.game);
      }*/
      apiGameSave(this.state.game).then((res) => {
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              game: emptyGame,
              openSnack: true,
              snack: { uid: random_id(), id: "game-snack-saved" },
            });
            this.props.callback("close");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              game: emptyGame,
              openSnack: true,
              snack: { uid: random_id(), id: "game-snack-edited" },
            }));
            this.props.callback("close");
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errornetwork" },
            });
            break;
          default:
            //console.log("default");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: { uid: random_id(), id: "generic-snack-errorunknown" },
            }));
        }
      });
    } else {
      // Snack
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: { uid: random_id(), id: "generic-snack-error" }, //, message = (t("generic-snack-error") + errors)},
      }));
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
