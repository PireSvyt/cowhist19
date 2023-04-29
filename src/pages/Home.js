import React from "react";
import { withTranslation } from "react-i18next";

import Appbar from "../components/Appbar";
import AppbarPlaceholder from "../components/AppbarPlaceholder";
import Landing from "../components/Landing";

class Home extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.constructor");
    }
    super(props);
    this.state = {};

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleLandingCallback = this.handleLandingCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.render");
    }
    return (
      <div>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          route="home"
        />
        <AppbarPlaceholder />
        <Landing
          open={this.props.signedin === false}
          callback={this.handleLandingCallback}
        />
      </div>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.componentDidUpdate");
    }
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.props.callback("signedout");
        break;
      case "signedin":
        this.props.callback("signedin", details);
        break;
      default:
    }
  }
  handleLandingCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback " + action);
    }
    switch (action) {
      case "signedin":
        this.props.callback("signedin", details);
        break;
      default:
    }
  }
}

export default withTranslation()(Home);
