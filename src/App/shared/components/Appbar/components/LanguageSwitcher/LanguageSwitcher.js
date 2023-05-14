import * as React from "react";
import Cookies from "js-cookie";
import { withTranslation } from "react-i18next";
import { IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language.js";

// Shared
import { random_id } from "../../../../services/toolkit.js";
import Snack from "../../../Snack/Snack.js";

class LanguageSwitcher extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("LanguageSwitcher.constructor");
    }
    super(props);
    // i18n
    const { t } = this.props;

    this.state = {
      open: false,
      languages: ["enGB", "frFR"],
      language: "",
      openSnack: false,
      snack: { id: undefined },
    };

    // Handles
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("LanguageSwitcher.render");
    }
    // i18n
    const { t } = this.props;

    const { anchorEl } = this.state;

    return (
      <Box hidden={!this.props.show}>
        <IconButton
          onClick={this.handleOpen}
          size="small"
          sx={{ ml: 2, color: "white" }}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          open={this.state.open}
          onClose={this.handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {this.state.languages.map((language) => {
            return (
              <MenuItem
                key={random_id()}
                onClick={() => this.handleChange(language)}
                selected={language === this.state.language}
              >
                {t("generic.language." + language + ".long")}
              </MenuItem>
            );
          })}
        </Menu>

        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
          language={this.props.language}
        />
      </Box>
    );
  }

  // Handles
  handleOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("LanguageSwitcher.handleOpen");
    }
    this.setState((prevState, props) => ({
      open: true,
    }));
  }
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("LanguageSwitcher.handleClose");
    }
    this.setState((prevState, props) => ({
      open: false,
    }));
  }
  handleChange(language) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("LanguageSwitcher.handleChange");
    }
    this.setState((prevState, props) => ({
      language: language,
      open: false,
    }));
    // Save user preference in cookies
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    Cookies.set("cowhist19_language", language);
    // Notify user to refresh
    this.setState((prevState, props) => ({
      openSnack: true,
      snack: {
        uid: random_id(),
        id: "generic.snack.feedback.languagechange",
      },
    }));
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableModal.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false,
        }));
        break;
      default:
    }
  }
}

export default withTranslation()(LanguageSwitcher);
