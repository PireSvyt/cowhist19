import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@mui/material";

// Reducers
import appStore from "../../../store/appStore.js";

export default function ConfirmModal(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("ConfirmModal");
  }
  // i18n
  const { t } = useTranslation();

  // State
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");

  // Handles
  function onClose() {
    setOpen(false);
  }

  // Effects
  React.useEffect(() => {
    if (props.data !== undefined) {
      if (
        props.data.uid !== uid &&
        props.data.uid !== undefined &&
        props.data.uid !== ""
      ) {
        // TODO LEVERAGE FLAGS

        // Set state
        setUid(props.data.uid);
        setOpen(true);
      }
    }
  }, [props]);

  return (
    <Box>
      <Dialog
        id="dialog_confirm"
        open={open}
        onClose={onClose}
        fullWidth={true}
      >
        <DialogTitle>{t(props.data.title)}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {t(props.data.content)}
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {props.data.callToActions.map((cta) => (
            <Button
              key={cta.label}
              onClick={cta.callback}
              color={cta.color === undefined ? "primary" : cta.color}
              variant={cta.variant === undefined ? "text" : cta.variant}
            >
              {t(cta.label)}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
