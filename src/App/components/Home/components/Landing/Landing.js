import React from "react";
import { withTranslation } from "react-i18next";
import { Provider, useDispatch } from "react-redux";
import { ButtonGroup, Button, Box } from "@mui/material";

// Components
import SignUpModal from "./components/SignUpModal/SignUpModal.js";
import SignInModal from "./components/SignInModal/SignInModal.js";
// Reducers
import reduxStore from "../../../../store/reduxStore.js";
import storeSignIn from "./components/SignInModal/store/storeSignIn.js";

class Landing extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.constructor");
    }
    super(props);
    this.state = {};

    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box hidden={reduxStore.getState().userDetails.signedin === true}>
        <Box
          textAlign="center"
          sx={{
            p: 4,
          }}
        >
          <ButtonGroup variant="contained" size="large">
            <Button
              onClick={() => {
                reduxStore.dispatch({
                  type: "signUpModal/open",
                });
              }}
              size="large"
            >
              {t("signup.button.signup")}
            </Button>
            <Button
              onClick={() => {
                storeSignIn.dispatch({ type: "sliceSignIn/actionSignInOpen" });
              }}
              size="large"
            >
              {t("signin.button.signin")}
            </Button>
          </ButtonGroup>
        </Box>

        <SignUpModal />

        <Provider store={storeSignIn}>
          <SignInModal />
        </Provider>
      </Box>
    );
  }

  // Handles
}

export default withTranslation()(Landing);
