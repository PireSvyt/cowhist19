import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  Slider
} from "@mui/material";

import contracts from "../resources/contracts";
import { apiGameDetails, apiGameSave } from "../api/game";
import Snack from "./Snack";

const { t } = useTranslation();

let emptyGame = {
  _id: undefined,
  contract: undefined,
  date: undefined,
  attack: undefined,
  defense: undefined,
  outcome: undefined
};

export default class GameModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal.constructor");
    }
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("GameModal language = " + this.props.language);
    }
    this.state = {
      game: { ...emptyGame },
      gameDate: undefined,
      users: [],
      componentHeight: undefined,
      openSnack: false,
      snack: undefined
    };
    // Updates
    this.updateComponentHeight = this.updateComponentHeight.bind(this);

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

    // Selectors
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
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
              height: this.state.componentHeight
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly"
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={this.state.contracts}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={t("game-input-contract")}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                value={this.state.game.contract || ""}
                onChange={(event, newValue) => {
                  event.target = {
                    name: "contract",
                    value: newValue.name
                  };
                  this.handleChange(event, newValue.name);
                }}
                getOptionLabel={(option) => {
                  var shorlist = this.state.contracts.filter(function (
                    value,
                    index,
                    arr
                  ) {
                    if (typeof option === "string") {
                      return value.name === option;
                    } else {
                      return value.name === option.name;
                    }
                  });
                  if (shorlist.length === 1) {
                    return shorlist[0].name;
                  } else {
                    return "";
                  }
                }}
              />

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
                      gameDate: newValue
                    }));
                  }}
                  onAccept={(newValue) => {
                    this.handleChange({
                      target: { name: "date", value: newValue }
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl>
                <Select
                  name="attack"
                  label={t("game-input-attack")}
                  multiple
                  value={this.state.game.attack || ""}
                  onChange={this.handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.state.users.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, this.state.game.attack)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <Select
                  name="defense"
                  label={t("game-input-defense")}
                  multiple
                  value={this.state.game.defense || ""}
                  onChange={this.handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {this.state.users.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, this.state.game.defense)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Slider
                name="outcome"
                label={t("game-input-outcome")}
                defaultValue={0}
                value={this.state.game.outcome || ""}
                onChange={this.handleChange}
                getAriaValueText={valuetext}
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
      //console.log("GameModal.componentDidUpdate");
      //console.log("GameModal.state");
      //console.log(this.state);
    }
    if (
      prevState.open !== this.props.open ||
      prevState.game !== this.props.game
    ) {
      if (this.props.game !== "") {
        // Load
        apiGameDetails(this.props.game).then((res) => {
          switch (res.status) {
            case 200:
              console.log("loaded game");
              console.log(res.game);
              this.setState({
                game: res.game
              });
              break;
            case 400:
              this.setState((prevState, props) => ({
                game: emptyGame,
                openSnack: true,
                snack: t("generic-snack-errornetwork")
              }));
              this.props.callback("closeItem");
              break;
            default:
              this.setState((prevState, props) => ({
                game: emptyGame,
                openSnack: true,
                snack: t("generic-snack-errorunknown")
              }));
              this.props.callback("closeItem");
          }
        });
      } else {
        this.setState((prevState, props) => ({
          game: { ...emptyGame }
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
      componentHeight: window.innerHeight - 115
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
      snack: t("generic-snack-discarded")
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
          gameDate: previousGame.date
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
      game: previousGame
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
              snack: t("game-snack-saved")
            });
            this.props.callback("closeItem");
            break;
          case 200:
            //console.log("modified");
            this.setState((prevState, props) => ({
              game: emptyGame,
              shelf: "",
              openSnack: true,
              snack: t("game-snack-edited")
            }));
            this.props.callback("closeItem");
            break;
          case 400:
            //console.log("error");
            //console.log(res);
            this.setState({
              openSnack: true,
              snack: t("generic-snack-errornetwork")
            });
            break;
          default:
            //console.log("default");
            this.setState((prevState, props) => ({
              openSnack: true,
              snack: t("generic-snack-errorunknown")
            }));
        }
      });
    } else {
      // Snack
      var snack = t("generic-snack-error");
      snack.message = t("generic-snack-error") + errors;
      this.setState((prevState, props) => ({
        openSnack: true,
        snack: snack
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
          openSnack: false
        }));
        break;
      default:
    }
  }
}
