import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt.js";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied.js";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline.js";

// Services
import serviceActivate from "./services/serviceActivate.js";
// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

export default function Activation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Activation");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [outcome, setOutcome] = useState("inprogress");

  // Fire activation
  serviceActivate().then((activateOutcome) => {
    if (activateOutcome.errors.length !== 0) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("activateOutcome errors");
        console.log(activateOutcome.errors);
      }
    }
    setOutcome(activateOutcome.stateChanges.outcome);
  });

  return (
    <Box>
      <Appbar route="activation" title={t("generic.label.product")} />
      <Box sx={{ height: 48 }} />

      {outcome !== "inprogress" ? null : (
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
            {t("activation.label.inprogress")}
          </Typography>
          <CircularProgress sx={{ mt: 2, mb: 2 }} />
        </Box>
      )}

      {outcome !== "error" ? null : (
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
        </Box>
      )}

      {outcome !== "activated" ? null : (
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
            onClick={() => {
              window.location = "/";
            }}
          >
            {t("activation.button.tohome")}
          </Button>
        </Box>
      )}

      {outcome !== "notfound" ? null : (
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
            {t("activation.label.notfoundaccount")}
          </Typography>
          <SentimentVeryDissatisfiedIcon
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
            {t("activation.label.notfoundaccountexplanations")}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
