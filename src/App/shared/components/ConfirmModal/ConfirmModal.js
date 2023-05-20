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

  // States
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");

  // Effects
  React.useEffect(() => {
    if (props.uid !== uid && props.uid !== undefined) {
      // Set state
      setUid(props.uid);
      setOpen(true);
    }
  }, [props]);

  return (
    <Box>
      <Dialog
        id="dialog_confirm"
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
      >
        <DialogTitle>{t(props.title)}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {t(props.content)}
            </Typography>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {props.callToActions.map((cta) => (
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
