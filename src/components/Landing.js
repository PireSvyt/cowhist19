import React from "react";
import { withTranslation } from "react-i18next";
import { ButtonGroup, Button, Box } from "@mui/material";

import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";

class Landing extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.constructor");
    }
    super(props);
    this.state = {
      showSignup: false,
      showSignin: false,
    };

    // Handles
    this.handleSignupOpen = this.handleSignupOpen.bind(this);
    this.handleSignupCallback = this.handleSignupCallback.bind(this);
    this.handleSigninOpen = this.handleSigninOpen.bind(this);
    this.handleSigninCallback = this.handleSigninCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box hidden={this.props.open === undefined || this.props.open === false}>
        <Box
          textAlign="center"
          sx={{
            p: 4,
          }}
        >
          <ButtonGroup variant="contained" size="large">
            <Button onClick={this.handleSignupOpen} size="large">
              {t("signup-button-signup")}
            </Button>
            <Button onClick={this.handleSigninOpen} size="large">
              {t("signin-button-signin")}
            </Button>
          </ButtonGroup>
        </Box>

        <SignUpModal
          open={this.state.showSignup}
          callback={this.handleSignupCallback}
        />

        <SignInModal
          open={this.state.showSignin}
          callback={this.handleSigninCallback}
        />
      </Box>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.componentDidUpdate");
    }
  }

  // Handles
  handleSignupOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleSignupOpen");
    }
    this.setState((prevState, props) => ({
      showSignup: true,
    }));
  }
  handleSignupCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleSignupCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          showSignup: false,
        }));
        break;
      default:
    }
  }
  handleSigninOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleSigninOpen");
    }
    this.setState((prevState, props) => ({
      showSignin: true,
    }));
  }
  handleSigninCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleSigninCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          showSignin: false,
        }));
        break;
      case "signedin":
        this.props.callback("signedin", details);
        break;
      default:
    }
  }
}

export default withTranslation()(Landing);
