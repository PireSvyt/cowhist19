import React from "react";
import { withTranslation } from "react-i18next";

import Appbar from "../components/Appbar";
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
    // i18n
    const { t } = this.props;

    return (
      <div>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
        />
        <Landing
          open={!this.props.signedin}
          callback={this.handleLandingCallback}
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
  handleAppbarCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback");
    }
    switch (action) {
      case "signedout":
        this.props.callback("signedout");
        break;
      default:
    }
  }
  handleLandingCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Home.handleLandingCallback");
    }
    switch (action) {
      case "signedin":
        this.props.callback("signedin");
        break;
      default:
    }
  }
}

export default withTranslation()(Home);
