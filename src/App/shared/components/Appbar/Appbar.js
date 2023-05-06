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
import EditIcon from "@mui/icons-material/Edit";

// Services
import { random_id } from "../../services/toolkit";

class Appbar extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.constructor");
    }
    super(props);
    // i18n
    const { t } = this.props;

    this.state = {
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
      <AppBar position="fixed" sx={{ top: 0, bottom: "auto" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {this.props.title}
          </Typography>

          <Box hidden={!(this.props.route === "table")}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={this.props.edittable}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Box
            hidden={!this.props.signedin || this.state.menuItems.length === 0}
          >
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={this.handleOpenMenu}
              disabled={!this.props.signedin}
            >
              <MenuIcon />
            </IconButton>
          </Box>
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

          <Box hidden={!(this.props.route === "account")}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => history.back()}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Appbar.componentDidMount");
    }

    // Update menu
    switch (this.props.route) {
      case "home":
        this.setState((prevState, props) => ({
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
      case "activation":
        this.setState((prevState, props) => ({
          menuItems: [],
        }));
        break;
      case "account":
        this.setState((prevState, props) => ({
          menuItems: [],
        }));
        break;
      case "table":
        this.setState((prevState, props) => ({
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
    window.location = "/";
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
