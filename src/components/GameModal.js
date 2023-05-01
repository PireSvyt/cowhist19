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
  Typography,
  Slider,
  Select,
  NativeSelect,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import frLocale from "date-fns/locale/fr";

import contracts from "../resources/contracts";
import { apiGameDetails, apiGameSave } from "../api/game";
import Snack from "./Snack";

let emptyGame = {
  _id: undefined,
  contract: undefined,
  date: undefined,
  attack: undefined,
  defense: undefined,
  outcome: undefined,
};

class GameModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.constructor");
    }
    super(props);
    this.state = {
      game: { ...emptyGame },
      gameDate: undefined,
      users: [],
      componentHeight: undefined,
      openSnack: false,
      snack: undefined,
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);

    // Helpers
    this.getContractOptions = this.getContractOptions.bind(this);

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

    // Selectors
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

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
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel>{t("game-input-contract")}</InputLabel>
                <Select
                  value={this.state.game.contract}
                  onChange={this.handleChange}
                >
                  {contracts.map((contract) => (
                    <MenuItem key={contract.key} value={contract.key}>
                      {t("game-input-" + contract.key)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={frLocale}
              >
                <MobileDatePicker
                  name="date"
                  label={t("game-input-date")}
                  value={this.state.gameDate}
                  onChange={(newValue) => {
                    this.setState((prevState, props) => ({
                      gameDate: newValue,
                    }));
                  }}
                  onAccept={(newValue) => {
                    this.handleChange({
                      target: { name: "date", value: newValue },
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Slider
                name="outcome"
                label={t("game-input-outcome")}
                defaultValue={0}
                value={this.state.game.outcome || ""}
                onChange={this.handleChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={-10}
                max={10}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              {t("generic-button-close")}
            </Button>
            <Button variant="contained" onClick={this.handleSave}>
              {t("generic-button-save")}
            </Button>
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
                snack: t("generic-snack-errornetwork"),
              }));
              this.props.callback("closeItem");
              break;
            default:
              this.setState((prevState, props) => ({
                game: emptyGame,
                openSnack: true,
                snack: t("generic-snack-errorunknown"),
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

  // Helpers
  getContractOptions() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.getContactOptions");
    }
    // i18n
    const { t } = this.props;

    let options = [];
    contracts.forEach((contract) => {
      options.push(t("game-label-" + contract.key));
    });
    return options;
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

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleClose");
    }
    this.setState((prevState, props) => ({
      game: { ...emptyGame },
      openSnack: true,
      snack: t("game-snack-discarded"),
    }));
    this.props.callback("closeItem");
  }
  handleChange(event, newValue) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleChange");
    }
    const target = event.target;
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("target.name : " + target.name);
      console.log("target.value : " + target.value);
      console.log("newValue : " + newValue);
    }
    var previousGame = this.state.game;
    switch (target.name) {
      case "contract":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change contract : " + target.value);
        }
        previousGame.contract = target.value;
        break;
      case "date":
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("change date : " + target.value);
        }
        previousGame.date = target.value;
        this.setState((prevState, props) => ({
          gameDate: previousGame.date,
        }));
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
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.game");
      console.log(this.state.game);
    }
    this.setState((prevState, props) => ({
      game: previousGame,
    }));
  }
  handleSave() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.handleSave");
      console.log("this.state.game");
      console.log(this.state.game);
    }
    // Check inputs
    let save = true;
    let errors = [];
    if (this.state.game.contract === undefined) {
      save = false;
      errors.push(" Contract undefined");
    }
    if (this.state.game.outcome === undefined) {
      save = false;
      errors.push(" Outcome undefined");
    }
    // Save or not?
    if (errors !== [] && process.env.REACT_APP_DEBUG === "TRUE") {
      console.log(errors);
    }
    // Post or publish
    if (save === true) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log(this.props.game);
        console.log(this.state.game);
      }
      apiGameSave(this.state.game).then((res) => {
        switch (res.status) {
          case 201:
            //console.log("default");
            this.setState({
              game: emptyGame,
              shelf: "",
              openSnack: true,
              snack: t("game-snack-saved"),
            });
            this.props.callback("closeItem");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              game: emptyGame,
              shelf: "",
              openSnack: true,
              snack: t("game-snack-edited"),
            }));
            this.props.callback("closeItem");
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: t("generic-snack-errornetwork"),
            });
            break;
          default:
            //console.log("default");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: t("generic-snack-errorunknown"),
            }));
        }
      });
    } else {
      // Snack
      var snack = t("generic-snack-error");
      snack.message = t("generic-snack-error") + errors;
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: snack,
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
