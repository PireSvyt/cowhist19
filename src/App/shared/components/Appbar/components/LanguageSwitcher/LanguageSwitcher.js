import React, { useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { IconButton, Typography, Menu, MenuItem, Box } from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language.js";

// Shared
import { random_id } from "../../../../services/toolkit.js";

export default function LanguageSwitcher(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("LanguageSwitcher");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const languages = ["enGB", "frFR"];

  // States
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Handles
  const openSwitcher = (event) => {
    setAnchorEl(event.currentTarget);
    setSwitcherOpen(true);
  };
  function closeSwitcher() {
    setSwitcherOpen(false);
  }

  return (
    <Box hidden={!props.show}>
      <IconButton onClick={openSwitcher} size="small" sx={{ ml: 2 }}>
        <LanguageIcon sx={{ color: "white" }} />
      </IconButton>
      <Menu
        open={switcherOpen}
        onClose={closeSwitcher}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languages.map((language) => {
          return (
            <MenuItem
              key={random_id()}
              onClick={() => {
                Cookies.set("cowhist19_language", language);
                window.location.reload(false);
              }}
            >
              {t("generic.language." + language + ".long")}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
