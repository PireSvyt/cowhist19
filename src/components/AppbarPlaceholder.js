import * as React from "react";
import { Box } from "@mui/material";

class AppbarPlaceholder extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppbarPlaceholder.constructor");
    }
    super(props);

    this.state = {};

    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("AppbarPlaceholder.render");
    }
    return <Box sx={{ height: 48 }} />;
  }

  // Handles
}

export default AppbarPlaceholder;
