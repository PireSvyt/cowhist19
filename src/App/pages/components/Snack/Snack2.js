import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Resources
import snacks from "../../../resources/snacks.json";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*
SEVERITY
error
warning
info
success
*/

export default function Snack(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Snack 2.0");
  }
  // i18n
  const { t } = useTranslation();

  // State
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState("");
  const [duration, setDuration] = useState(3000);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

  // Handles
  const onClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  // Effects
  React.useEffect(() => {
    if (props.data !== undefined) {
      if (props.data.uid !== uid && props.data.uid !== undefined) {
        // Add optional inputs
        var newSnack = { ...snacks[props.data.id] };
        if (newSnack === undefined) {
          newSnack = {
            severity: "error",
            message: "Inexisting snack : " + props.data.id,
            duration: 10000,
          };
        } else {
          newSnack.id = props.data.id;
          newSnack.uid = props.data.uid;
          if (newSnack.duration === undefined) {
            newSnack.duration = 3000;
          }
          if (newSnack.severity === undefined) {
            newSnack.severity = "info";
          }
          if (newSnack.message === undefined) {
            newSnack.message = t(props.data.id);
          }
          if (
            props.data.details !== undefined &&
            props.data.details.length !== 0
          ) {
            let detailedErrors = "";
            props.data.details.forEach((detail) => {
              detailedErrors = detailedErrors + t(detail) + ", ";
            });
            newSnack.message =
              newSnack.message +
              " " +
              detailedErrors.slice(0, detailedErrors.length - 2);
          }
          // Set state
          setUid(newSnack.uid);
          setDuration(newSnack.duration);
          setSeverity(newSnack.severity);
          setMessage(newSnack.message);
          setOpen(true);
        }
      }
    }
  }, [props]);

  return (
    <Snackbar
      data-testid="snackbar"
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert
        data-testid="alert"
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
