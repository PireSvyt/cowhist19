import * as React from "react";
import { withTranslation } from "react-i18next";
import { Typography, Paper, Box } from "@mui/material";

class MyStats extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.constructor");
    }
    super(props);
    this.state = {};
    // Handles
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyStats.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box
        hidden={this.props.open === undefined || this.props.open === false}
        sx={{
          m: 2,
        }}
      >
        <Typography variant="h6" component="span">
          {t("mystats-label-mystats")}
        </Typography>

        <Box
          textAlign="center"
          sx={{
            m: 2,
          }}
        >
          <Typography variant="overline">
            {t("generic-label-tocome")}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Handlers
}

export default withTranslation()(MyStats);
