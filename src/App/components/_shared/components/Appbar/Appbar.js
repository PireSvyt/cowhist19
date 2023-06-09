import React, { useState } from "react";
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
import { random_id } from "../../../../services/_shared/toolkit.js";
// Shared
import serviceAccessDeny from "../../../../services/_shared/serviceAccessDeny.js";
import Snack from "./components/Snack/Snack2.js";
import FeedbackModal from "./components/FeedbackModal/FeedbackModal.js";
import TableModal from "./components/TableModal/TableModal.js";
// Store
import appStore from "../../../../store/appStore.js";

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
    feedbackOpen: useSelector((state) => state.sliceFeedbackModal.open),
    snackOpen: useSelector((state) => state.sliceSnack.open),
    snackData: useSelector((state) => state.sliceSnack.snackData),
    tableOpen:  useSelector((state) => state.sliceTableModal.open)
  };

  // Handles
  const action = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget);
      setMenuOpen(true);
    },
    closeMenu: () => {
      setMenuOpen(false);
    },
    toHome: () => {
      setMenuOpen(false);
      window.location = "/";
    },
    toDocumentation: () => {
      setMenuOpen(false);
      window.location = "/documentation";
    },
    toAbout: () => {
      setMenuOpen(false);
      window.location = "/about";
    },
    toAccount: () => {
      setMenuOpen(false);
      window.location = "/account";
    },
    toAdmin: () => {
      setMenuOpen(false);
      window.location = "/admin";
    },
    signOut: () => {
      setMenuOpen(false);
      serviceAccessDeny();
      window.location = "/";
    },
    toContact: () => {
      setMenuOpen(false);
      appStore.dispatch({ 
        type: "sliceFeedbackModal/change",
        payload: {
          title: "feedback.label.contact",
          contents: [
            {
              type: "typography",
              text: "feedback.label.leavemessage",
              gutterbottom: true,
              sx:{
                whiteSpace: "pre-line",
              }
            }
          ],
          inputs: {
            source: "open",
            tag: "",
            text: ""
          }
        }
      });
    }
  }

  // MenuItems
  let potentialMenuItems = {
    signOut: {
      item: "signout",
      label: "generic.menu.signout",
      onclick: () => {
        action.signOut();
        action.closeMenu();
      },
      signed: true,
    },
    toAccount: {
      item: "account",
      label: "generic.menu.account",
      onclick: action.toAccount,
      signed: true,
    },
    toHome: {
      item: "home",
      label: "generic.menu.home",
      onclick: action.toHome,
      signed: true,
    },
    toDocumentation: {
      item: "documentation",
      label: "generic.menu.documentation",
      onclick: action.toDocumentation,
      signed: false,
    },
    toAbout: {
      item: "about",
      label: "generic.menu.about",
      onclick: action.toAbout,
      signed: false,
    },
    toContact: {
      item: "contact",
      label: "generic.menu.contact",
      onclick: action.toContact,
      signed: true,
    },
    toAdmin: {
      item: "admin",
      label: "Admin",
      onclick: action.toAdmin,
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
      menuItems.push(potentialMenuItems.toAbout);
      if (select.priviledges.includes("admin")) {
        menuItems.push(potentialMenuItems.toAdmin);
      }
      menuItems.push(potentialMenuItems.toContact);
      menuItems.push(potentialMenuItems.signOut);
      showLanguageSwitcher = true;
      break;
    case "table":
      menuItems.push(potentialMenuItems.toHome);
      menuItems.push(potentialMenuItems.toAccount);
      menuItems.push(potentialMenuItems.toDocumentation);
      menuItems.push(potentialMenuItems.toAbout);
      if (select.priviledges.includes("admin")) {
        menuItems.push(potentialMenuItems.toAdmin);
      }
      menuItems.push(potentialMenuItems.toContact);
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
      showLanguageSwitcher = false;
      break;
    case "about":
      showLanguageSwitcher = false;
      break;
    case "admin":
      showLanguageSwitcher = false;
      menuItems.push(potentialMenuItems.toHome);
      menuItems.push(potentialMenuItems.signOut);
      break;
    default:
  }

  return (
    <Box>
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
                  <IconButton size="large" onClick={action.openMenu}>
                    <MenuIcon sx={{ color: "white" }} />
                  </IconButton>

                  <Menu
                    open={menuOpen}
                    onClose={action.closeMenu}
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

              {!(props.route === "account" 
              || props.route === "documentation" 
              || props.route === "about") ? null : (
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

      {select.snackOpen ? (<Snack data={select.snackData}/>) : (null)}
      {select.feedbackOpen ? (<FeedbackModal/>) : (null)}
      {select.tableOpen ? (<TableModal/>) : (null)}
    </Box>
  );
}
