import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";

// Components
import Carousel from "./components/Carousel/Carousel.js";
import SignUpModal from "./components/SignUpModal/SignUpModal.js";
import SignInModal from "./components/SignInModal/SignInModal.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export default function Landing() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Landing");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    openSignInModal: useSelector((state) => state.sliceSignInModal.open),
    openSignUpModal: useSelector((state) => state.sliceSignUpModal.open),
  };

  // Render
  return (
    <Box>
      <Box
        textAlign="center"
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" 
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
          >{t("home.label.valueprop")}</Typography>
        </Box>

        <Carousel />

        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceSignUpModal/open" });
            }}
            size="large"
          >
            {t("signup.button.signup")}
          </Button>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceSignInModal/open" });
            }}
            size="large"
          >
            {t("signin.button.signin")}
          </Button>
        </ButtonGroup>
      </Box>

      {select.openSignInModal === true ? <SignInModal /> : null}
      {select.openSignUpModal === true ? <SignUpModal /> : null}
    </Box>
  );
}
