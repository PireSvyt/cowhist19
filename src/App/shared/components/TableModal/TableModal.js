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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

import AddIcon from "@mui/icons-material/Add.js";

// Components
import InviteModal from "./components/InviteModal/InviteModal.js";
import PlayerCard from "./components/PlayerCard/PlayerCard.js";
// Services
import serviceProceed from "./services/serviceProceed.js";
import serviceTableDelete from "./services/serviceTableDelete.js";
// Shared
import ConfirmModal from "../../../shared/components/ConfirmModal/ConfirmModal.js";
import serviceExistingName from "./services/serviceExistingName.js";
import { debounce } from "../../services/toolkit.js";
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
    openInviteModal: useSelector((state) => state.sliceInviteModal.open),
  };

  // Debouncing
  const deboundedExistingName = debounce((e) => serviceExistingName({ name : e.target.value}), 150)

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
      // Check name existance
      deboundedExistingName(e)
    },
    guests: (e) => {
      appStore.dispatch({
        type: "sliceTableModal/change",
        payload: {
          inputs: { guests: e.target.value },
          errors: { guests: false },
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

  // Services
  function callServiceProceed() {
    serviceProceed().then((serviceProceedOutcome) => {
      switch (serviceProceedOutcome.type) {
        case "error":
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("TableModal.callServiceProceed error");
          }
          break;
        case "success":
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("TableModal.callServiceProceed error");
          }
          break;
        case "confirmDelete":
          setConfirmOpen(true);
          break;
        default:
          console.error(
            "TableModal.callServiceProceed unmatched type " +
              serviceProceedOutcome.type
          );
      }
    });
  }

  // Confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  function confirmCallback(choice) {
    switch (choice) {
      case "close":
        setConfirmOpen(false);
        break;
      case "delete":
        setConfirmOpen(false);
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
              error={select.errors.name || select.errors.existingname}
              helperText={ select.errors.existingname ? (t("table.error.existingname")) : (null) }
            />

            <FormControl variant="standard">
              <InputLabel>{t("table.input.guests")}</InputLabel>
              <Select
                value={select.inputs.guests}
                label={t("table.input.guests")}
                onChange={changes.guests}
                error={select.errors.guests}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </FormControl>

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
            ) : select.inputs.players.filter((player) => player.status !== "guest").length === 0 ? (
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
                {select.inputs.players.map((player) => {
                  if (player.status === "guest") {
                    return null
                  } else {
                    return (
                      <ListItem key={"player-" + player._id}>
                        <PlayerCard player={player} />
                      </ListItem>
                    )
                  }
                })}
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
            onClick={callServiceProceed}
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

      {confirmOpen === true ? (
        <ConfirmModal
          open={confirmOpen}
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
