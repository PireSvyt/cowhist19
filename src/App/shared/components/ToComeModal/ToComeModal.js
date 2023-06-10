import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Button,
  Paper,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function ToComeModal(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("ToComeModal");
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
      if (props.data.uid !== uid && props.data.uid !== undefined) {
        // TODO LEVERAGE FLAGS

        // Set state
        setUid(props.uid);
        setOpen(true);
      }
    }
  }, [props]);

  return (
    <Dialog id="dialog_tocome" open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle>{t("generic.label.tocome")}</DialogTitle>
      <DialogContent>
        <Box component="span">
          <Paper
            sx={{
              p: 2,
              g: 2,
              m: 2,
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                {t("generic.label.tocomeintro")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  pt: 1,
                  whiteSpace: "pre-line",
                }}
              >
                {t("generic.label.tocomedetails")}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{t("generic.button.close")}</Button>
      </DialogActions>
    </Dialog>
  );
}
