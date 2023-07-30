import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

// Resources
import faq from "../../Documentation/faq.json";
// Components
import GenereicFAQ from "./GenericFAQ.component/GenereicFAQ.js"
// Shared
import Appbar from "../Navigation/Appbar/comp.Appbar.js";

export default function Documentation() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Documentation");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box>
      <Appbar route="documentation" title={t("generic.label.documentation")} />
      <Box sx={{ height: 55 }} />

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Frequently asked questions (FAQ)
      </Typography>
      {faq.map((faq) => {
        return <GenereicFAQ section={faq} depth={0} key={faq.title} />;
      })}
    </Box>
  );
}