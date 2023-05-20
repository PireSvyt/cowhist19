import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

// Components
//import Documentation from "./components/Documentation/Documentation.js";
//import Howto from "./components/Howto/Howto.js";
// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import ToComeModal from "../../shared/components/ToComeModal/ToComeModal.js";

export default function Help() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Help");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [tocome, setTocome] = useState(false);

  // Handles
  function openTocome() {
    setTocome(true);
  }
  function closeTocome() {
    setTocome(false);
  }

  // Selects
  const select = {
    tocomeData: useSelector((state) => state.sliceToComeModal.tocomeData),
  };

  return (
    <Box>
      <Appbar route="help" title={t("generic.label.help")} />
      <Box sx={{ height: 48 }} />

      <Box textAlign="center">
        <Box sx={{ height: 48 }} />
        <Button
          variant="outlined"
          sx={{
            width: "80%",
            m: 1,
          }}
          onClick={openTocome}
        >
          {t("generic.button.tocome")}
        </Button>
      </Box>
      <ToComeModal data={select.tocomeData} />
    </Box>
  );
}
