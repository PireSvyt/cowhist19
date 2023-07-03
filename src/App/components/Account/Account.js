import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Paper, Button, Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import ToComeModal from "../../shared/components/ToComeModal/ToComeModal.js";
import Snack from "../../shared/components/Snack/Snack2.js";
import FeedbackModal from "../_shared/FeedbackModal/FeedbackModal.js";
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
    tocomeData: useSelector((state) => state.sliceToComeModal.tocomeData),
    feedbackOpen: useSelector((state) => state.sliceFeedbackModal.open),
    snackOpen: useSelector((state) => state.sliceSnack.open),
    snackData: useSelector((state) => state.sliceSnack.snackData),
  };

  // Changes
  const changes = {
    feedback_changepseudo: () => {
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: {
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
              text: "feedback.label.leavemessage",
              gutterbottom: true,
              sx:{
                whiteSpace: "pre-line",
              }
            }
          ],
          inputs: {
            source: "teaser",
            tag: "changepseudo",
            text: ""
          }
        }
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
                  onClick={() => {
                    appStore.dispatch({ type: "sliceToComeModal/open" });
                  }}
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
                  onClick={() => {
                    appStore.dispatch({ type: "sliceToComeModal/open" });
                  }}
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
                  onClick={() => {
                    appStore.dispatch({ type: "sliceToComeModal/open" });
                  }}
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
                  onClick={() => {
                    appStore.dispatch({ type: "sliceToComeModal/open" });
                  }}
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
                  onClick={() => {
                    appStore.dispatch({ type: "sliceToComeModal/open" });
                  }}
                >
                  {t("account.button.close")}
                </Button>
              </Box>
            </Box>
          </Paper>

          <ToComeModal data={select.tocomeData} />

          {select.feedbackOpen ? (<FeedbackModal/>) : (null)}

          {select.snackOpen ? (<Snack data={select.snackData}/>) : (null)}

        </Box>
      )}
    </div>
  );
}
