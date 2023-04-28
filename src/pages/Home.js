import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "@mui/material";

import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";

class Home extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.constructor");
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
      console.log("Home.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <div>
        <h1>HOME</h1>

        <Button onClick={this.handleSignupOpen}>
          {t("signup-button-signup")}
        </Button>
        <Button onClick={this.handleSigninOpen}>
          {t("signin-button-signin")}
        </Button>

        <SignUpModal
          open={this.state.showSignup}
          callback={this.handleSignupClose}
        />
        <SignInModal
          open={this.state.showSignin}
          callback={this.handleSigninClose}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.componentDidUpdate");
      console.log("Home.state");
      console.log(this.state);
    }
  }

  // Handles
  handleSignupOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleSignupOpen");
    }
    this.setState((prevState, props) => ({
      showSignup: true,
    }));
  }
  handleSignupCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleSignupCallback");
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
      console.log("Home.handleSigninOpen");
    }
    this.setState((prevState, props) => ({
      showSignin: true,
    }));
  }
  handleSigninCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleSigninCallback");
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          showSignin: false,
        }));
        break;
      case "signedin":
        this.props.callback("signedin");
        break;
      default:
    }
  }
}

export default withTranslation()(Home);
