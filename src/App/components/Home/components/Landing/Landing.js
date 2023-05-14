import React from "react";
import { withTranslation } from "react-i18next";
import { ButtonGroup, Button, Box } from "@mui/material";

// Components
import SignUpModal from "./components/SignUpModal/SignUpModal.js";
import SignInModal from "./components/SignInModal/SignInModal.js";

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
    this.handleOpenSignupModal = this.handleOpenSignupModal.bind(this);
    this.handleSignupCallback = this.handleSignupCallback.bind(this);
    this.handleOpenSigninModal = this.handleOpenSigninModal.bind(this);
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
            <Button onClick={this.handleOpenSignupModal} size="large">
              {t("signup.button.signup")}
            </Button>
            <Button onClick={this.handleOpenSigninModal} size="large">
              {t("signin.button.signin")}
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
  handleOpenSignupModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleOpenSignupModal");
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
  handleOpenSigninModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleOpenSigninModal");
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
