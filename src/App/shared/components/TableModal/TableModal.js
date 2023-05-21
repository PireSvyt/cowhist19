import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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

import AddIcon from "@mui/icons-material/Add.js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";

// Components
import InviteModal from "./components/InviteModal/InviteModal.js";
// Services
import serviceProceed from "./services/serviceProceed.js";
import apiTableDelete from "./services/apiTableDelete.js";
// Reducers
import appStore from "../../../store/appStore.js";

export default function TableModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableModal");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    open: useSelector((state) => state.sliceTableModal.open),
    id: useSelector((state) => state.sliceTableModal.id),
    inputs: useSelector((state) => state.sliceTableModal.inputs),
    errors: useSelector((state) => state.sliceTableModal.errors),
    disabled: useSelector((state) => state.sliceTableModal.disabled),
    loading: useSelector((state) => state.sliceTableModal.loading),
  };

  // Changes
  const changes = {
    name: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { name: e.target.value },
          errors: { name: false },
        },
      });
    },
    players: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { players: e.target.value },
          errors: { players: false },
        },
      });
    },
  };

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Player card
  function PlayerCard(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("PlayerCard " + props.player._id);
    }
    // i18n
    const { t } = useTranslation();

    // Handles
    function removeUser() {
      appStore.dispatch({
        type: "sliceTableModal/removeuser",
        payload: props.player._id,
      });
    }

    return (
      <Card sx={{ width: "100%", p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{props.player.pseudo}</Typography>
          <IconButton onClick={removeUser}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      <Dialog
        id="dialog_table"
        open={select.open}
        onClose={() => {
          appStore.dispatch({ type: "sliceTableModal/close" });
        }}
        fullWidth={true}
      >
        <DialogTitle>{t("table.label.title")}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
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
              label={t("generic.input.name")}
              variant="standard"
              value={select.inputs.name}
              onChange={changes.name}
              autoComplete="off"
              sx={{ mb: 1 }}
              error={select.errors.name}
            />

            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant="body1"
                sx={{
                  pt: 2,
                  pb: 2,
                }}
                color={select.errors.players ? "error" : null}
              >
                {t("table.label.players")}
              </Typography>
              <IconButton
                sx={{ p: 2 }}
                onClick={() => {
                  appStore.dispatch({ type: "sliceInviteModal/open" });
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>

            <List dense={true}>
              {select.inputs.players.map((player) => (
                <ListItem key={"player-" + player._id}>
                  <PlayerCard player={player} />
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceTableModal/close" });
            }}
          >
            {t("generic.button.cancel")}
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

      <InviteModal />
    </Box>
  );
}
