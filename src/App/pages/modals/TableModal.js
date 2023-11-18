import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

import AddIcon from "@mui/icons-material/Add.js";

// Components
import InviteModal from "./InviteModal.js";
import PlayerCard from "../components/PlayerCard.js";
// Services
import serviceProceed from "../../services/_miscelaneous/serviceProceed.js";
import serviceTableDelete from "../../services/OLD/serviceTableDelete.js";
// Shared
import ConfirmModal from "./ConfirmModal.js";
// Reducers
import appStore from "../../store/appStore.js";

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
    openInviteModal: useSelector((state) => state.sliceInviteModal.open),
    openDeleteConfirmModal: useSelector(
      (state) => state.sliceTableModal.deleteConfirm,
    ),
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

  // Confirm modal
  const [deleting, setDeleting] = useState(false);
  function confirmCallback(choice) {
    switch (choice) {
      case "close":
        appStore.dispatch({
          type: "sliceTableModal/change",
          payload: {
            deleteConfirmOpen: false,
          },
        });
        break;
      case "delete":
        appStore.dispatch({
          type: "sliceTableModal/change",
          payload: {
            deleteConfirmOpen: false,
          },
        });
        setDeleting(true);
        serviceTableDelete(select.id).then(() => {
          setDeleting(false);
        });
        break;
      default:
        console.error("HistoryCard.confirmCallback unmatched " + choice);
    }
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

            {select.inputs.players.length === 0 && select.id === "" ? (
              <Box
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                  variant="h6"
                  component="span"
                  align="center"
                >
                  {t("table.label.nouserscreate")}
                </Typography>
                <SmsFailedIcon
                  sx={{ mt: 2, mb: 2 }}
                  fontSize="large"
                  color="primary"
                />
                <Typography
                  sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                  variant="body1"
                  component="span"
                  align="center"
                >
                  {t("table.label.nouserscreateexplanation")}
                </Typography>
              </Box>
            ) : select.inputs.players.length === 0 ? (
              <Box
                sx={{
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                  variant="h6"
                  component="span"
                  align="center"
                >
                  {t("table.label.nousersdelete")}
                </Typography>
                <SmsFailedIcon
                  sx={{ mt: 2, mb: 2 }}
                  fontSize="large"
                  color="error"
                />
                <Typography
                  sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                  variant="body1"
                  component="span"
                  align="center"
                >
                  {t("table.label.nousersdeleteexplanation")}
                </Typography>
              </Box>
            ) : (
              <List dense={true}>
                {select.inputs.players.map((player) => (
                  <ListItem key={"player-" + player._id}>
                    <PlayerCard player={player} />
                  </ListItem>
                ))}
              </List>
            )}
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
            onClick={() => {
              if (select.id === "") {
                serviceProceed("tableCreate");
              } else {
                serviceProceed("tableSave");
              }
            }}
            disabled={select.disabled}
            loading={select.loading}
            color={
              select.inputs.players.length === 0 && select.id === ""
                ? "primary"
                : select.inputs.players.length === 0
                ? "error"
                : "primary"
            }
          >
            {t("generic.button.save")}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {select.openInviteModal === true ? <InviteModal /> : null}

      {select.openDeleteConfirmModal === true ? (
        <ConfirmModal
          open={select.openDeleteConfirmModal}
          data={{
            title: "table.confirm.deletenoeusers.title",
            content: "table.confirm.deletenoeusers.content",
            callToActions: [
              {
                label: "generic.button.cancel",
                choice: "close",
              },
              {
                label: "generic.button.proceed",
                choice: "delete",
                variant: "contained",
                color: "error",
              },
            ],
          }}
          callback={confirmCallback}
        />
      ) : null}
    </Box>
  );
}
