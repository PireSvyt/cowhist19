import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Typography, Box, Button } from "@mui/material";
// Reducers
import appStore from "../../store/appStore.js";

export default function MyStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("MyStats");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" component="span">
        {t("home.label.mystats")}
      </Typography>

      <Box textAlign="center" sx={{ m: 2 }}>
        <Button
          variant="outlined"
          sx={{ width: "80%", m: 1 }}
          onClick={() => {
            appStore.dispatch({ type: "sliceToComeModal/open" });
          }}
        >
          {t("generic.label.tocome")}
        </Button>
      </Box>
    </Box>
  );
}
