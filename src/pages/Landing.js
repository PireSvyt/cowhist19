import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "@mui/material";

import SignUpModal from "../components/SignUpModal";

//

class Landing extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.constructor");
    }
    super(props);
    this.state = {
      showSignup: false,
    };

    // Handles
    this.handleSignupOpen = this.handleSignupOpen.bind(this);
    this.handleSignupClose = this.handleSignupClose.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <div>
        <h1>LANDING</h1>

        <Button onClick={this.handleSignupOpen}>
          {t("signup-button-signup")}
        </Button>

        <SignUpModal
          open={this.state.showSignup}
          callback={this.handleSignupClose}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.componentDidUpdate");
      console.log("Landing.state");
      console.log(this.state);
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
  handleSignupClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.handleSignupClose");
    }
    this.setState((prevState, props) => ({
      showSignup: false,
    }));
  }
}

export default withTranslation()(Landing);
