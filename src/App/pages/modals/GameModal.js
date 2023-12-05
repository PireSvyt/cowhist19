import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import { serviceGameCreate } from "../../services/game/game.services.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function GameModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("GameModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.gameModalSlice.open),
    id: useSelector((state) => state.gameModalSlice.id),
    inputs: useSelector((state) => state.gameModalSlice.inputs),
    errors: useSelector((state) => state.gameModalSlice.errors),
    requirements: useSelector((state) => state.gameModalSlice.requirements),
    disabled: useSelector((state) => state.gameModalSlice.disabled),
    loading: useSelector((state) => state.gameModalSlice.loading),
    players: useSelector((state) => state.tableSlice.players),
    contracts: useSelector((state) => state.tableSlice.contracts),
  };

  // Changes
  const changes = {
    contract: (e) => {
      let contract = select.contracts.filter(
        (c) => c.key === e.target.value,
      )[0];
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
          inputs: { contract: e.target.value },
          errors: { contract: false },
          requirements: {
            attack: "(" + contract.attack + ")",
            defense: "(" + contract.defense + ")",
            outcome: "", //"(max. +" + (13 - contract.folds) + ")",
          },
        },
      });
    },
    attack: (e) => {
      let newPlayers = select.inputs.players.filter(
        (player) => player.role === "defense",
      );
      e.target.value.forEach((attackant) => {
        newPlayers.push({
          _id: attackant._id,
          pseudo: attackant.pseudo,
          role: "attack",
        });
      });
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { attack: false },
        },
      });
    },
    defense: (e) => {
      let newPlayers = select.inputs.players.filter(
        (player) => player.role === "attack",
      );
      e.target.value.forEach((defenser) => {
        newPlayers.push({
          _id: defenser._id,
          pseudo: defenser.pseudo,
          role: "defense",
        });
      });
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { defense: false },
        },
      });
    },
    outcome: (e) => {
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
          inputs: { outcome: e.target.value },
          errors: { outcome: false },
        },
      });
    },
    save: () => {
      serviceGameCreate()
    }
  };

  return (
    <Box>
      <Dialog
        data-testid="modal-game"
        open={select.open}
        onClose={() => {
          appStore.dispatch({ type: "gameModalSlice/close" });
        }}
        fullWidth={true}
      >
        <DialogTitle>{t("game.label.title")}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
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
                value={select.inputs.contract}
                onChange={changes.contract}
                error={select.errors.contract}
                data-testid="modal-game-input-contract"
              >
                {select.contracts.map((contract) => (
                  <MenuItem key={contract.key} value={contract.key}>
                    {t("game.label.contract." + contract.key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard">
              <Autocomplete
                data-testid="modal-game-input-attack"
                name="attack"
                multiple
                disableClearable
                inputValue=""
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={
                      t("game.input.attack") + " " + select.requirements.attack
                    }
                    error={select.errors.attack}
                  />
                )}
                options={select.players.filter(
                  (player) =>
                    !select.inputs.players.find(
                      (actualPlayer) => actualPlayer._id === player._id,
                    ),
                )}
                getOptionLabel={(option) => option.pseudo}
                defaultValue={[]}
                value={select.inputs.players.filter(
                  (player) => player.role === "attack",
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
                onChange={(event, newValue) => {
                  event.target = {
                    name: "attack",
                    value: newValue,
                  };
                  changes.attack(event, newValue);
                }}
              >
                {select.players.map((player) => (
                  <MenuItem key={player._id} value={player._id}>
                    {player.pseudo}
                  </MenuItem>
                ))}
              </Autocomplete>
            </FormControl>

            <FormControl variant="standard">
              <Autocomplete
                data-testid="modal-game-input-defense"
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
                      select.requirements.defense
                    }
                    error={select.errors.defense}
                  />
                )}
                options={select.players.filter(
                  (player) =>
                    !select.inputs.players.find(
                      (actualPlayer) => actualPlayer._id === player._id,
                    ),
                )}
                getOptionLabel={(option) => option.pseudo}
                defaultValue={[]}
                value={select.inputs.players.filter(
                  (player) => player.role === "defense",
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
                onChange={(event, newValue) => {
                  event.target = {
                    name: "attack",
                    value: newValue,
                  };
                  changes.defense(event, newValue);
                }}
              >
                {select.players.map((player) => (
                  <MenuItem key={player._id} value={player._id}>
                    {player.pseudo}
                  </MenuItem>
                ))}
              </Autocomplete>
            </FormControl>

            <Typography variant="caption" gutterBottom>
              {t("game.input.outcome") + " " + select.requirements.outcome}
            </Typography>
            <Slider
              data-testid="modal-game-input-outcome"
              name="outcome"
              defaultValue={0}
              value={select.inputs.outcome || 0}
              onChange={changes.outcome}
              step={1}
              marks
              min={-8}
              max={8}
              valueLabelDisplay="on"
              sx={{ mt: 4 }}
              color={select.errors.outcome ? "error" : "primary"}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "gameModalSlice/close" });
            }}
            data-testid="modal-game-button-cancel"
          >
            {t("generic.button.close")}
          </Button>
          <LoadingButton
            data-testid="modal-game-button-save"
            variant="contained"
            onClick={() => changes.save()}
            disabled={select.disabled}
            loading={select.loading}
          >
            {t("generic.button.save")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
