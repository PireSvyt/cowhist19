import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import SignUpModal from "../components/SignUpModal";

const { t } = useTranslation();

export default class Landing extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.constructor");
    }
    super(props);
    this.state = {
      opensignup: false,
    };

    // Handles
    this.handleSignupOpen = this.handleSignupOpen.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Landing.render");
    }
    return (
      <div>
        <h1>LANDING</h1>
        <Button onClick={this.handleSignupOpen}>ABC</Button>
        <SignUpModal />
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
      opensignup: true,
    }));
  }
}
