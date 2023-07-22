import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, CircularProgress, TextField, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt.js";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied.js";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline.js";

// Services
import serviceProceed from "./services/serviceProceed.js";
// Shared
import Appbar from "../_shared/components/Appbar/Appbar.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Activation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Activation");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [login, setLogin] = useState("");
  const [loginerror, setLoginError] = useState(false);
  const [tokenerror, setTokenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("onhold");

  // Changes
  const changes = {
    login: (e) => {
      setLogin(e.target.value)
    },
    send: () => { 
      setLoading(true)
      serviceProceed({
        login: login,
        token: window.location.href.split("/activation/")[1]
      })
      .then(outcome => {
        console.log("outcome", outcome)
        Object.keys(outcome.stateChanges).forEach(c => {
          console.log("outcome.stateChanges " + c)
          switch (c) {
            case "login" :
              setLogin(outcome.stateChanges[c])
              break
            case "loginerror" :
              setLoginError(outcome.stateChanges[c])
              break
            case "tokenerror" :
              setTokenError(outcome.stateChanges[c])
              break
            case "loading" :
              setLoading(outcome.stateChanges[c])
              break
            case "status" :
              setStatus(outcome.stateChanges[c])
              break
              case "openSnack" :
                if (outcome.stateChanges.openSnack && outcome.stateChanges.snack) {
                  appStore.dispatch({
                    type: "sliceSnack/change",
                    payload: outcome.stateChanges.snack,
                  });
                }
                break
            default:
              // NA
          }
        });
      })
    },
    resend: () => {},
    signin: () => {
      // Open sign in modal
      appStore.dispatch({ type: "sliceSignInModal/open" });
      // To home
      window.location = "/";
    }
  };


  return (
    <Box>
      <Appbar route="activation" title={t("generic.label.product")} />
      <Box sx={{ height: 55 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
          variant="body1"
          component="span"
          align="center"
        >
          {t("activation.label.laststep")}
        </Typography>
        <TextField
          label={t("generic.input.email")}
          value={login}
          onChange={changes.login}
          error={loginerror ? "error" : null}
          sx={{mt:1, mb:1}}
        />
        <LoadingButton 
          onClick={changes.send} 
          variant="contained"
          disabled={loading || tokenerror}
          loading={loading}
        >
            {t("activation.button.activate")}
        </LoadingButton>
      </Box>
      
      {tokenerror ? (
        <Paper 
          sx={{
            mt:1, 
            mb:1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle" 
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("activation.label.tokenerror")}
          </Typography>
          <ErrorOutlineIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="error"
          />
          <Button
            variant="outlined"
            sx={{ width: "80%", m: 1 }}
            onClick={changes.resend}
            disabled
          >
            {t("activation.button.resend")}
          </Button>
        </Paper>
      ) : (null)}

      {status === "inprogress" ? (
        <Paper 
          sx={{
            mt:1, 
            mb:1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle" 
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("activation.label.inprogress")}
          </Typography>
          <CircularProgress sx={{ mt: 2, mb: 2 }} />
        </Paper>
      ) : (null)}

      {status === "activated" ? (
        <Paper 
          sx={{
            mt:1, 
            mb:1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle" 
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("activation.label.activatedtitle")}
          </Typography>
          <SentimentSatisfiedAltIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="success"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("activation.label.activatedaccountexplanations")}
          </Typography>
          <Button
            variant="outlined"
            sx={{ width: "80%", m: 1 }}
            onClick={changes.signin}
          >
            {t("generic.button.signin")}
          </Button>
        </Paper>
      ) : (null)}

      {status === "error" ? (
        <Paper 
          sx={{
            mt:1, 
            mb:1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle" 
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("activation.label.error")}
          </Typography>
          <ErrorOutlineIcon
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
            {t("activation.label.errorexplanation")}
          </Typography>
          <Button
            variant="outlined"
            sx={{ width: "80%", m: 1 }}
            onClick={changes.resend}
            disabled
          >
            {t("activation.button.resend")}
          </Button>
        </Paper>
      ) : (null)}
    </Box>
  );
}
