import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

// Resources
import faqs from "../resources/faqs.json";
// Components
import Faq from "./components/Faq.js";
// Shared
import Appbar from "./components/Appbar.js";

export default function Help() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Help");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box data-testid="page-help">
      <Appbar route="help" title={t("generic.label.help")} />
      <Box sx={{ height: 80 }} />

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Frequently asked questions (FAQ)
      </Typography>
      {faqs.map((faq) => {
        return <Faq section={faq} depth={0} key={faq.title} />;
      })}
    </Box>
  );
}
