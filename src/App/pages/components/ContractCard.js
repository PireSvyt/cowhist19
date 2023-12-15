import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card, 
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
// Reducers
import appStore from "../../store/appStore.js";

export default function ContractCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("ContractCard " + props.contractposition);
  }
  // i18n
  const { t } = useTranslation();

  console.log("ContractCard.props", props)

  // Changes
  const changes = {
    contract: (e) => {
      let contract = props.contracts.filter(
        (c) => c.key === e.target.value,
      )[0];
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
            contractposition : props.contractposition,
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
      let newPlayers = props.contract.inputs.players.filter(
        (player) => player.role === "defense",
      );
      e.target.value.forEach((attackant) => {
        newPlayers.push({
          userid: attackant.userid,
          pseudo: attackant.pseudo,
          role: "attack",
        });
      });
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
            contractposition : props.contractposition,
            inputs: { players: newPlayers },
            errors: { attack: false },
        },
      });
    },
    defense: (e) => {
      let newPlayers = props.contract.inputs.players.filter(
        (player) => player.role === "attack",
      );
      e.target.value.forEach((defenser) => {
        newPlayers.push({
          userid: defenser.userid,
          pseudo: defenser.pseudo,
          role: "defense",
        });
      });
      appStore.dispatch({
        type: "gameModalSlice/change",
        payload: {
            contractposition : props.contractposition,
            inputs: { players: newPlayers },
            errors: { defense: false },
        },
      });
    },
    outcome: (e) => {
        appStore.dispatch({
            type: "gameModalSlice/change",
            payload: {
                contractposition : props.contractposition,
                inputs: { outcome: e.target.value },
                errors: { outcome: false },
            },
        });
    },
    remove: () => {
        appStore.dispatch({
            type: "gameModalSlice/removecontract",
            payload: props.contractposition,
        });
    }
  };
  return (
    <Card 
        sx={{ 
            p: 1 
        }}
        data-testid="modal-game-listitem-contract"
        index={props.index}
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
                value={props.contract.inputs.contract}
                onChange={changes.contract}
                error={props.contract.errors.contract}
                data-testid="modal-game-listitem-contract-input-contract"
            >
                {props.contracts.map((contract) => (
                    <MenuItem key={contract.key} value={contract.key}>
                        {t("game.label.contract." + contract.key)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

        <FormControl variant="standard">
            <Autocomplete
            data-testid="modal-game-listitem-contract-input-attack"
            name="attack"
            multiple
            disableClearable
            inputValue=""
            renderInput={(params) => (
                <TextField
                {...params}
                variant="standard"
                label={
                    t("game.input.attack") + " " + props.contract.requirements.attack
                }
                error={props.contract.errors.attack}
                />
            )}
            options={props.players.filter(
                (player) =>
                !props.contract.inputs.players.find(
                    (actualPlayer) => actualPlayer.userid === player.userid,
                ),
            )}
            getOptionLabel={(option) => option.pseudo}
            defaultValue={[]}
            value={props.contract.inputs.players.filter(
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
            {props.players.map((player) => (
                <MenuItem key={player.userid} value={player.userid}>
                    {player.pseudo}
                </MenuItem>
            ))}
            </Autocomplete>
        </FormControl>

        <FormControl variant="standard">
            <Autocomplete
            data-testid="modal-game-listitem-contract-input-defense"
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
                    props.contract.requirements.defense
                }
                error={props.contract.errors.defense}
                />
            )}
            options={props.players.filter(
                (player) =>
                !props.contract.inputs.players.find(
                    (actualPlayer) => actualPlayer.userid === player.userid,
                ),
            )}
            getOptionLabel={(option) => option.pseudo}
            defaultValue={[]}
            value={props.contract.inputs.players.filter(
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
            {props.players.map((player) => (
                <MenuItem key={player.userid} value={player.userid}>
                    {player.pseudo}
                </MenuItem>
            ))}
            </Autocomplete>
        </FormControl>

        <Typography variant="caption" gutterBottom>
            {t("game.input.outcome") + " " + props.contract.requirements.outcome}
        </Typography>
        <Slider
            data-testid="modal-game-listitem-contract-input-outcome"
            name="outcome"
            defaultValue={0}
            value={props.contract.inputs.outcome || 0}
            onChange={changes.outcome}
            step={1}
            marks
            min={-8}
            max={8}
            valueLabelDisplay="on"
            sx={{ mt: 4 }}
            color={props.contract.errors.outcome ? "error" : "primary"}
        />
        </Box>
    </Card>
  );
}
