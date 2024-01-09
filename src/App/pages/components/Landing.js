import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";

// Components
import WelcomeCarousel from "./WelcomeCarousel.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Landing() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("Landing");
  }
  // i18n
  const { t } = useTranslation();

  // Changes
  const changes = {
    signup: () => {
      appStore.dispatch({
        type: "signupModalSlice/open",
      });
    },
    signin: () => {
      appStore.dispatch({
        type: "signinModalSlice/open"
      });
    },
  };

  // Render
  return (
    <Box data-testid="page-landing" >
      <Box textAlign="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
          >
            {t("home.label.valueprop")}
          </Typography>
        </Box>

        <WelcomeCarousel />

        <ButtonGroup variant="contained" size="large">
          <Button 
            onClick={changes.signup} 
            size="large"
            data-testid="page-landing-button-sign up"
          >
            {t("signup.button.signup")}
          </Button>
          <Button 
            onClick={changes.signin} 
            size="large"
            data-testid="page-landing-button-sign in"
          >
            {t("generic.button.signin")}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
