import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ButtonGroup, Button, Box } from "@mui/material";

// Components
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
    signedin: useSelector((state) => state.sliceUser.signedin),
  };

  // Render
  return (
    <Box hidden={select.signedin === true}>
      <Box
        textAlign="center"
        sx={{
          p: 4,
        }}
      >
        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceSignUp/open" });
            }}
            size="large"
          >
            {t("signup.button.signup")}
          </Button>
          <Button
            onClick={() => {
              appStore.dispatch({ type: "sliceSignIn/open" });
            }}
            size="large"
          >
            {t("signin.button.signin")}
          </Button>
        </ButtonGroup>
      </Box>

      <SignUpModal />
      <SignInModal />
    </Box>
  );
}
