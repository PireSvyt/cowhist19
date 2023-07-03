import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Paper, Button, Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Shared
import Appbar from "../_shared/components/Appbar/Appbar.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Account() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Account");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    detailsLoaded: useSelector((state) => state.sliceUserDetails.loaded),
    login: useSelector((state) => state.sliceUserDetails.login),
    pseudo: useSelector((state) => state.sliceUserDetails.pseudo),
  };

  // Changes
  const toComePayload = {
    title: "feedback.label.tocome",
    contents: [
      {
        type: "typography",
        variant: "h6",
        text: "feedback.label.tocomeintro",
        gutterbottom: true,
        sx:{
          whiteSpace: "pre-line",
        }
      },
      {
        type: "typography",
        text: "feedback.label.tocomedetails",
        gutterbottom: true,
        sx:{
          whiteSpace: "pre-line",
        }
      },
      {
        type: "typography",
        variant: "caption",
        text: "feedback.label.addmessage",
        gutterbottom: true,
        sx:{
          whiteSpace: "pre-line",
        }
      }
    ],
    inputs: {
      source: "teaser",
      tag: "",
      text: ""
    }
  }
  const changes = {
    feedback_changepseudo: () => {
      let payload = toComePayload
      payload.inputs.tag = "changepseudo"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    },
    feedback_changeemail: () => {
      let payload = toComePayload
      payload.inputs.tag = "changeemail"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    },
    feedback_changepassword: () => {
      let payload = toComePayload
      payload.inputs.tag = "changepassword"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    },
    feedback_mergeaccounts: () => {
      let payload = toComePayload
      payload.inputs.tag = "mergeaccounts"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    },
    feedback_anonymizeaccount: () => {
      let payload = toComePayload
      payload.inputs.tag = "anonymizeaccount"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    },
    feedback_closeaccount: () => {
      let payload = toComePayload
      payload.inputs.tag = "closeaccount"
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: payload
      });
    }
  };

  return (
    <div>
      <Appbar route="account" title={t("generic.menu.account")} />
      <Box sx={{ height: 55 }} />
      {select.authLoaded === false || select.detailsLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : !(
          select.signedin === true && select.detailsLoaded === true
        ) ? null : (
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
                {t("account.label.mydata")}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.mypseudo")}
              </Typography>
              <Box textAlign="center">
                <Typography variant="body1" gutterBottom>
                  {select.pseudo}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_changepseudo}
                >
                  {t("account.button.changepseudo")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.myemail")}
              </Typography>
              <Box textAlign="center">
                <Typography variant="body1" gutterBottom>
                  {select.login}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_changeemail}
                >
                  {t("account.button.changeemail")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.mypassword")}
              </Typography>
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_changepassword}
                >
                  {t("account.button.changepassword")}
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper
            sx={{
              p: 2,
              g: 2,
              m: 2,
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                {t("account.label.myaccount")}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.merge")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account.label.mergedetails")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_mergeaccounts}
                >
                  {t("account.button.merge")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.anonymize")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account.label.anonymizedetails")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_anonymizeaccount}
                >
                  {t("account.button.anonymize")}
                </Button>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  pt: 1,
                }}
              >
                {t("account.label.close")}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t("account.label.closedetails")}
              </Typography>
              <Box textAlign="center">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: "80%",
                    m: 1,
                  }}
                  onClick={changes.feedback_closeaccount}
                >
                  {t("account.button.close")}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
}
