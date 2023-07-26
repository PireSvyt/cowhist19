import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, CircularProgress, TextField, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline.js";

// Services
import serviceActivate from "./serviceActivate.js";
import serviceActivateCheck from "./serviceActivateCheck.js";
import serviceSendActivation from "./SendActivation/serviceSendActivation.js";
import serviceSendActivationCheck from "./SendActivation/serviceSendActivationCheck.js";
// Components
import Appbar from "../../Navigation/Appbar/Appbar.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Activation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("Activation");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [activationStatus, setActivationStatus] = useState("onhold")
  const [loadingActivate, setLoadingActivate] = useState(false)
  const [sendActivationStatus, setSendActivationStatus] = useState("onhold")
  const [loadingSendActivation, setLoadingSendActivation] = useState(false)
  const [loginValue, setLoginValue] = useState("")
  const [loginError, setLoginError] = useState(false)

  function setStates (stateChanges) {
    Object.keys(stateChanges).forEach(change => {
      switch (change) {
        case "activationStatus" :
          setActivationStatus(stateChanges[change])
          break
        case "loadingActivate" :
          setLoadingActivate(stateChanges[change])
          break
        case "sendActivationStatus" :
          setSendActivationStatus(stateChanges[change])
          break
        case "loadingSendActivation" :
          setLoadingSendActivation(stateChanges[change])
          break
        case "loginValue" :
          setLoginValue(stateChanges[change])
          break
        case "loginError" :
          setLoginError(stateChanges[change])
          break
        default :
          console.error("Activation.setStates unknown change ", change, stateChanges[change])
      }
    })
  }

  // Changes
  const changes = {
    // Inputs
    login: (e) => {
      setStates({
        loginValue: e.target.value,
        loginError: false,
        activationStatus: "onhold",
        sendActivationStatus: "onhold"
      })
    },
    send: () => {
      console.log("Activation.send")
      setStates({loadingActivate: true})
      let inputs = {
        login: loginValue,
        token: window.location.href.split("/activation/")[1]
      }
      serviceActivateCheck(inputs)
      .then(checkOutcome => {
        setStates(checkOutcome.stateChanges)
        if (checkOutcome.proceed) {
          setStates({activationStatus: "inprogress"})
          serviceActivate(inputs)
          .then(outcome => {
            setStates(outcome.stateChanges)
            setStates({loadingActivate: false})
          })
        } else {
          setStates({loadingActivate: false})
        }
      })
    },
    resend: () => {
      console.log("Activation.resend")
      setStates({loadingSendActivation: true})
      let inputs = {
        login: loginValue
      }
      serviceSendActivationCheck(inputs)
      .then(checkOutcome => {
        setStates(checkOutcome.stateChanges)
        if (checkOutcome.proceed) {
          serviceSendActivation(inputs)
          .then(outcome => {
            setStates(outcome.stateChanges)
            setStates({loadingSendActivation: false})
          })
        } else {
          setStates({loadingSendActivation: false})
        }
      })
    },
    signin: () => {
      console.log("Activation.signin")
      appStore.dispatch({ type: "sliceModals/open", payload: "SignIn" });
    }
    
  }



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
          value={loginValue}
          required
          onChange={changes.login}
          error={loginError}
          sx={{mt:1, mb:1, width: "80%"}}
        />
        <LoadingButton 
          onClick={changes.send} 
          variant="contained"
          disabled={loadingActivate || activationStatus === "activated" || activationStatus === "error"}
          loading={loadingActivate}
          sx={{ mt: 1,  mb:1, width:"80%" }}
        >
            {t("activation.button.activate")}
        </LoadingButton>
      </Box>

      {activationStatus === "activated" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("activation.label.activatedtitle")}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 1, width:"80%" }}
            onClick={changes.signin}
          >
            {t("generic.button.signin")}
          </Button>
        </Box>
      ) : (null)}

      {activationStatus === "error" ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("activation.label.error")}
          </Typography>
          <ErrorOutlineIcon
            sx={{ mt: 1, mb: 1 }}
            fontSize="large"
            color="error"
          />
          <Typography
            sx={{ mt: 1, mb: 1, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("activation.label.errorexplanation")}
          </Typography>
          <LoadingButton
            variant="outlined"
            sx={{ mt: 1, width:"80%" }}
            onClick={changes.resend}
            disabled={loadingSendActivation || sendActivationStatus === "sent" || sendActivationStatus === "error"}
            loading={loadingSendActivation}
          >
            {t("activation.button.resend")}
          </LoadingButton>
        </Box>
      ) : (null)}
      
      {sendActivationStatus === "sent" ? (             
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
          <Typography
            sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("signin.label.successresendingactivation")}
          </Typography>
        </Box>
      ) : (null)}
      
      {sendActivationStatus === "error" ? (             
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
          <Typography
            sx={{ mt: 2, mb: 1, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("signin.label.errorresendingactivation")}
          </Typography>
        </Box>
      ) : (null)}

    </Box>
  );
}
