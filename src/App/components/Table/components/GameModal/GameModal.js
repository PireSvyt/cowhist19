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
import serviceProceed from "./services/serviceProceed.js";
// Reducers
import appStore from "../../../../store/appStore.js";

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
    open: useSelector((state) => state.sliceGameModal.open),
    id: useSelector((state) => state.sliceGameModal.id),
    inputs: useSelector((state) => state.sliceGameModal.inputs),
    errors: useSelector((state) => state.sliceGameModal.errors),
    requirements: useSelector((state) => state.sliceGameModal.requirements),
    disabled: useSelector((state) => state.sliceGameModal.disabled),
    loading: useSelector((state) => state.sliceGameModal.loading),
    players: useSelector((state) => state.sliceTableDetails.players),
    contracts: useSelector((state) => state.sliceTableDetails.contracts),
  };

  // Changes
  const changes = {
    contract: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { name: e.target.value },
          errors: { name: false },
        },
      });
    },
    attack: (e) => {
      let players = appStore.getState().sliceGameModal.players;
      let newPlayers = players.filter((player) => player.role === "defense");
      target.value.forEach((attackant) => {
        newPlayers.push({
          _id: attackant._id,
          pseudo: attackant.pseudo,
          role: "attack",
        });
      });
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { attack: false },
        },
      });
    },
    defense: (e) => {
      let players = appStore.getState().sliceGameModal.players;
      let newPlayers = players.filter((player) => player.role === "attack");
      target.value.forEach((defenser) => {
        newPlayers.push({
          _id: defenser._id,
          pseudo: defenser.pseudo,
          role: "defense",
        });
      });
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { defense: false },
        },
      });
    },
    outcome: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { outcome: e.target.value },
          errors: { outcome: false },
        },
      });
    },
  };

  return (
    <Box>
      <Dialog
        id="dialog_transaction"
        open={open}
        onClose={() => {
          appStore.dispatch({ type: "sliceGameModal/close" });
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
              >
                {contracts.map((contract) => (
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
                      t("game.input.attack") + " " + select.requirements.attack
                    }
                    error={select.errors.attack}
                  />
                )}
                options={select.players.filter(
                  (player) =>
                    !select.inputs.players.find(
                      (actualPlayer) => actualPlayer._id === player._id
                    )
                )}
                getOptionLabel={(option) => option.pseudo}
                defaultValue={[]}
                value={select.inputs.players.filter(
                  (player) => player.role === "attack"
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
                onChange={changes.attack}
              >
                {players.map((player) => (
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
                      select.requirements.defense
                    }
                    error={select.errors.defense}
                  />
                )}
                options={players.filter(
                  (player) =>
                    !select.inputs.players.find(
                      (actualPlayer) => actualPlayer._id === player._id
                    )
                )}
                getOptionLabel={(option) => option.pseudo}
                defaultValue={[]}
                value={select.inputs.players.filter(
                  (player) => player.role === "defense"
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
                onChange={changes.defense}
              >
                {players.map((player) => (
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
              appStore.dispatch({ type: "sliceGameModal/close" });
            }}
          >
            {t("generic.button.close")}
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
    </Box>
  );
}
