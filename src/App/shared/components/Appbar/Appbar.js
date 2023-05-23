import React, { useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu.js";
import CloseIcon from "@mui/icons-material/Close.js";
import EditIcon from "@mui/icons-material/Edit.js";

// Components
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher.js";
// Services
import { random_id } from "../../services/toolkit.js";
// Shared
import serviceAccessDeny from "../../services/serviceAccessDeny.js";
// Reducers
import appStore from "../../../store/appStore.js";

export default function Appbar(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Appbar");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Selects
  const select = {
    signedin: useSelector((state) => state.sliceUser.signedin),
  };

  // Handles
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  function closeMenu() {
    setMenuOpen(false);
  }
  function toHome() {
    setMenuOpen(false);
    window.location = "/";
  }
  function toHelp() {
    setMenuOpen(false);
    window.location = "/help";
  }
  function toAccount() {
    setMenuOpen(false);
    window.location = "/account";
  }
  function signOut() {
    setMenuOpen(false);
    serviceAccessDeny();
  }

  // MenuItems
  let potentialMenuItems = {
    signOut: {
      item: "signout",
      label: "generic.menu.signout",
      onclick: () => {
        signOut();
        closeMenu();
      },
      signed: true,
    },
    toAccount: {
      item: "account",
      label: "generic.menu.account",
      onclick: toAccount,
      signed: true,
    },
    toHome: {
      item: "home",
      label: "generic.menu.home",
      onclick: toHome,
      signed: true,
    },
    toHelp: {
      item: "help",
      label: "generic.menu.help",
      onclick: toHelp,
      signed: false,
    },
  };

  // Constants
  let menuItems = [];
  let showLanguageSwitcher = false;
  switch (props.route) {
    case "home":
      menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toHelp);
      menuItems.push(potentialMenuItems.signOut);
      showLanguageSwitcher = true;
      break;
    case "table":
      menuItems.push(potentialMenuItems.toHome);
      menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toHelp);
      menuItems.push(potentialMenuItems.signOut);
      showLanguageSwitcher = false;
      break;
    case "activation":
      showLanguageSwitcher = true;
      break;
    case "account":
      showLanguageSwitcher = true;
      break;
    case "help":
      showLanguageSwitcher = true;
      break;
    default:
  }

  return (
    <AppBar position="fixed" sx={{ top: 0, bottom: "auto" }}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>

            {!(props.route === "table") ? null : (
              <IconButton
                size="large"
                color="inherit"
                onClick={props.edittable}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <LanguageSwitcher show={showLanguageSwitcher} />

            {menuItems.length === 0 || !select.signedin ? null : (
              <Box>
                <IconButton size="large" onClick={openMenu}>
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>

                <Menu
                  open={menuOpen}
                  onClose={closeMenu}
                  anchorEl={anchorEl}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {menuItems.map((item) => {
                    return (
                      <MenuItem
                        hidden={!(item.signed && select.signedin)}
                        key={random_id()}
                        onClick={item.onclick}
                      >
                        {t(item.label)}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            )}

            {!(props.route === "account" || props.route === "help") ? null : (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => history.back()}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
