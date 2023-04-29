import React from "react";
import { withTranslation } from "react-i18next";

class MyAccount extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.constructor");
    }
    super(props);
    this.state = {};

    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.render");
    }
    return <div>
        
    </div>;
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyAccount.componentDidUpdate");
    }
  }

  // Handles
}

export default withTranslation()(MyAccount);
