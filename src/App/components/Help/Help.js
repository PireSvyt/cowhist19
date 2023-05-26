import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

// Resources
import helps from "./resources/helps.json";
// Components
import HelpSection from "./components/HelpSection.js";
// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

export default function Help() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Help");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box>
      <Appbar route="help" title={t("generic.label.help")} />
      <Box sx={{ height: 48 }} />

      {helps.map((help) => {
        return <HelpSection section={help} depth={0} key={help.title} />;
      })}
    </Box>
  );
}
