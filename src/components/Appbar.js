import * as React from "react";
import Cookies from "js-cookie";
import { withTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  fabClasses,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FormatColorResetRounded } from "@mui/icons-material";

class Appbar extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.constructor");
    }
    super(props);
    this.state = {
      openMenu: false,
      menuAnchorEl: null,
    };

    // Handles
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.render");
    }
    // i18n
    const { t } = this.props;

    const { anchorEl } = this.state;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("generic-product-title")}
          </Typography>
          <div hidden={!this.props.signedin}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={this.handleOpenMenu}
              disabled={!this.props.signedin}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Menu
            id="basic-menu"
            open={this.state.openMenu}
            onClose={this.handleCloseMenu}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={this.handleCloseMenu} disabled>
              My account
            </MenuItem>
            <MenuItem onClick={this.handleSignout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Appbar.componentDidMount");
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Appbar.componentDidUpdate");
      //console.log("Appbar.state");
      //console.log(this.state);
    }
  }

  // Helpers

  // Handles
  handleOpenMenu() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.handleOpenMenu");
    }
    this.setState((prevState, props) => ({
      openMenu: true,
      menuAnchorEl: event.currentTarget,
    }));
  }
  handleCloseMenu() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.handleCloseMenu");
    }
    this.setState((prevState, props) => ({
      openMenu: false,
      menuAnchorEl: null,
    }));
  }
  handleSignout() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.handleSignout");
    }
    // Destroy token
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    Cookies.remove("token");
    this.handleCloseMenu();
    this.props.callback("signedout");
  }
}

export default withTranslation()(Appbar);
