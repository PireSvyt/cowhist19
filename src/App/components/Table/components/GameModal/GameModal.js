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
    guests: useSelector((state) => state.sliceTableDetails.guests),
    contracts: useSelector((state) => state.sliceTableDetails.contracts),
  };

  // Changes
  const changes = {
    contract: (e) => {
      let contract = select.contracts.filter(
        (c) => c.key === e.target.value
      )[0];
      appStore.dispatch({
        type: "sliceGameModal/change",
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
    addToAttack: (id) => {
      let selectedPlayer = select.players.filter(player => player._id === id)[0]
      appStore.dispatch({
        type: "sliceGameModal/addplayer",
        payload: {
          player: { 
            _id: id,
            pseudo: selectedPlayer.pseudo,
            status: selectedPlayer.status,
            role: "attack",
          },
          errors: { attack: false },
        },
      });
    },
    removeFromAttack: (id) => {
      appStore.dispatch({
        type: "sliceGameModal/removeplayer",
        payload: {
          player: id,
          errors: { attack: false },
        },
      });
    },
    addToDefense: (id) => {
      let newPlayers = {...select.inputs.players}
      let selectedPlayer = select.players.filter(player => player._id === id)[0]
      newPlayers.push({
        _id: id,
        pseudo: selectedPlayer.pseudo,
        status: selectedPlayer.status,
        role: "attack",
      });
      appStore.dispatch({
        type: "sliceGameModal/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { defense: false },
        },
      });
    },
    removeFromDefense: (id) => {
      let newPlayers = select.inputs.players.filter(
        (player) => player._id !== id
      );
      appStore.dispatch({
        type: "sliceGameModal/change",
        payload: {
          inputs: { players: newPlayers },
          errors: { defense: false },
        },
      });
    },
    outcome: (e) => {
      appStore.dispatch({
        type: "sliceGameModal/change",
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
        open={select.open}
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
                {select.contracts.map((contract) => (
                  <MenuItem key={contract.key} value={contract.key}>
                    {t("game.label.contract." + contract.key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard">
              <InputLabel>
                {t("game.input.attack") + " " + select.requirements.attack}
              </InputLabel>
              <Select
                name="attack"
                multiple
                value={ select.inputs.players.filter((player) => player.role === "attack").map(player => player._id) }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((playerid) => {
                      let selectedPlayer = select.inputs.players.filter((player) => player._id === playerid)[0]
                      return (
                        <Chip 
                          key={playerid} clickable onClick={null}
                          label={selectedPlayer.status === "guest" ? (t("game.label.guest")) : (selectedPlayer.pseudo)} 
                          onDelete={() => changes.removeFromAttack(playerid)}
                        />
                      )
                    })}
                  </Box>
                )}
              >                
                {select.players.filter(potentialPlayer => 
                   !select.inputs.players.map(selectedPlayer => selectedPlayer._id).includes(potentialPlayer._id)
                  ).map(potentialPlayer => (
                    <MenuItem 
                      key={potentialPlayer._id} value={potentialPlayer._id}
                      onClick={() => changes.addToAttack(potentialPlayer._id)}
                    >
                      {potentialPlayer.status === "guest" ? (t("game.label.guest")) :(potentialPlayer.pseudo)}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl variant="standard">
              <InputLabel>
                {t("game.input.defense") + " " + select.requirements.defense}
              </InputLabel>
              <Select
                name="defense"
                multiple
                value={ select.inputs.players.filter((player) => player.role === "defense").map(player => player._id) }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((playerid) => {
                      let selectedPlayer = select.inputs.players.filter((player) => player._id === playerid)[0]
                      return (
                        <Chip 
                          key={playerid} clickable onClick={null}
                          label={selectedPlayer.status === "guest" ? (t("game.label.guest")) : (selectedPlayer.pseudo)} 
                          onDelete={() => changes.removeFromDefense(playerid)}
                        />
                      )
                    })}
                  </Box>
                )}
              >                
                {select.players.filter(potentialPlayer => 
                  !select.inputs.players.map(selectedPlayer => selectedPlayer._id).includes(potentialPlayer._id)
                  ).map(potentialPlayer => (
                    <MenuItem 
                      key={potentialPlayer._id} value={potentialPlayer._id}
                      onClick={() => changes.addToDefense(potentialPlayer._id)}
                    >
                      {potentialPlayer.status === "guest" ? (t("game.label.guest")) :(potentialPlayer.pseudo)}
                    </MenuItem>
                  ))
                }
              </Select>
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
