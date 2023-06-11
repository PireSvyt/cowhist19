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
import { createFalse } from "typescript";

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
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    tableDenied: useSelector((state) => state.sliceTableDetails.denied),
    priviledges: useSelector((state) => state.sliceUserDetails.priviledges),
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
  function toDocumentation() {
    setMenuOpen(false);
    window.location = "/documentation";
  }
  function toAbout() {
    setMenuOpen(false);
    window.location = "/about";
  }
  function toAccount() {
    setMenuOpen(false);
    window.location = "/account";
  }
  function toAdmin() {
    setMenuOpen(false);
    window.location = "/admin";
  }
  function signOut() {
    setMenuOpen(false);
    serviceAccessDeny();
    window.location = "/";
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
    toDocumentation: {
      item: "documentation",
      label: "generic.menu.documentation",
      onclick: toDocumentation,
      signed: false,
    },
    toDocumentation: {
      item: "about",
      label: "generic.menu.about",
      onclick: toAbout,
      signed: false,
    },
    toAdmin: {
      item: "admin",
      label: "Admin",
      onclick: toAdmin,
      signed: true,
    },
  };

  // Constants
  let menuItems = [];
  let showLanguageSwitcher = false;
  switch (props.route) {
    case "home":
      menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toDocumentation);
      if (select.priviledges.includes("admin")) {
        menuItems.push(potentialMenuItems.toAdmin);
      }
      menuItems.push(potentialMenuItems.signOut);
      showLanguageSwitcher = true;
      break;
    case "table":
      menuItems.push(potentialMenuItems.toHome);
      menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toDocumentation);
      if (select.priviledges.includes("admin")) {
        menuItems.push(potentialMenuItems.toAdmin);
      }
      menuItems.push(potentialMenuItems.signOut);
      showLanguageSwitcher = false;
      break;
    case "activation":
      showLanguageSwitcher = true;
      break;
    case "account":
      showLanguageSwitcher = true;
      break;
    case "documentation":
      showLanguageSwitcher = true;
      break;
    case "admin":
      showLanguageSwitcher = false;
      menuItems.push(potentialMenuItems.toHome);
      menuItems.push(potentialMenuItems.signOut);
      break;
    default:
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        bottom: "auto",
      }}
      color={props.route === "admin" ? "error" : "primary"}
    >
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

            {!(props.route === "table" || props.title === "") ||
            select.tableDenied === true ? null : (
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
            {showLanguageSwitcher === true ? <LanguageSwitcher /> : null}

            {menuItems.length === 0 ? null : (
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
                    if (item.signed && select.signedin) {
                      return (
                        <MenuItem
                          hidden={!(item.signed && select.signedin)}
                          key={random_id()}
                          onClick={item.onclick}
                        >
                          {t(item.label)}
                        </MenuItem>
                      );
                    } else {
                      if (item.signed === false) {
                        return (
                          <MenuItem
                            hidden={!(item.signed && select.signedin)}
                            key={random_id()}
                            onClick={item.onclick}
                          >
                            {t(item.label)}
                          </MenuItem>
                        );
                      } else {
                        return null;
                      }
                    }
                  })}
                </Menu>
              </Box>
            )}

            {!(props.route === "account" || props.route === "documentation") ? null : (
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
