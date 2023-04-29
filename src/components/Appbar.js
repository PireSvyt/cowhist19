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
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { apiAuthAssess } from "../api/auth";
import { random_id } from "../resources/toolkit";

class Appbar extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.constructor");
    }
    super(props);
    // i18n
    const { t } = this.props;

    this.state = {
      title: t("generic-product-title"),
      openMenu: false,
      menuAnchorEl: null,
      menuItems: [],
    };

    // Handles
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleToHome = this.handleToHome.bind(this);
    this.handleToAccount = this.handleToAccount.bind(this);
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
            {this.state.title}
          </Typography>

          <div hidden={!this.props.signedin || this.props.route === "account"}>
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
            {this.state.menuItems.map((item) => {
              return (
                <MenuItem key={random_id()} onClick={item.onclick}>
                  {t(item.label)}
                </MenuItem>
              );
            })}
          </Menu>

          <div hidden={!(this.props.route === "account")}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={this.handleToHome}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Appbar.componentDidMount");
    }
    // i18n
    const { t } = this.props;

    // Check token from cookies
    // https://medium.com/how-to-react/how-to-use-js-cookie-to-store-data-in-cookies-in-react-js-aab47f8a45c3
    // token stored at sign in from SignInModal.handleProceed
    // token destroyed at sign out from Appbar.handleSignout
    let token = Cookies.get("cowhist19-token");
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("token");
      console.log(token);
    }
    if (token !== undefined) {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("assessing token from cookies");
      }
      apiAuthAssess(token).then((assessment) => {
        if (assessment.status === 200) {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("token valid");
          }
          this.props.callback("signedin", token);
        } else {
          if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("token invalid");
          }
        }
      });
    } else {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("token missing from cookies");
      }
      this.props.callback("signedout");
    }

    // Update menu
    switch (this.props.route) {
      case "home":
        this.setState((prevState, props) => ({
          title: t("generic-product-title"),
          menuItems: [
            {
              item: "account",
              label: "generic-menu-account",
              onclick: this.handleToAccount,
            },
            {
              item: "signout",
              label: "generic-menu-signout",
              onclick: this.handleSignout,
            },
          ],
        }));
        break;
      case "account":
        this.setState((prevState, props) => ({
          title: t("generic-menu-account"),
          menuItems: [
            {
              item: "home",
              label: "generic-menu-home",
              onclick: this.handleToHome,
            },
            {
              item: "signout",
              label: "generic-menu-signout",
              onclick: this.handleSignout,
            },
          ],
        }));
        break;
      case "table":
        this.setState((prevState, props) => ({
          title: t("generic-menu-table"),
          menuItems: [
            {
              item: "home",
              label: "generic-menu-home",
              onclick: this.handleToHome,
            },
            {
              item: "account",
              label: "generic-menu-account",
              onclick: this.handleToAccount,
            },
            {
              item: "signout",
              label: "generic-menu-signout",
              onclick: this.handleSignout,
            },
          ],
        }));
        break;
      default:
    }
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.componentDidUpdate");
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
    Cookies.remove("cowhist19-token");
    this.handleCloseMenu();
    this.props.callback("signedout");
  }
  handleToHome() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.handleToHome");
    }
    this.handleCloseMenu();
    window.location = "/";
  }
  handleToAccount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.handleToAccount");
    }
    this.handleCloseMenu();
    window.location = "/account";
  }
}

export default withTranslation()(Appbar);
