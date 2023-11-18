import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import Landing from "./components/Landing.js";
import MyStats from "./components/MyStats.js";
import MyTables from "./components/MyTables.js";
// Shared
import Appbar from "./components/Appbar.js";
import Snack from "./components/Snack/Snack2.js";
import ToComeModal from "./modals/ToComeModal.js";

export default function Home() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Home");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    loaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    snackData: useSelector((state) => state.sliceSnack.snackData),
    tocomeData: useSelector((state) => state.sliceToComeModal.tocomeData),
  };

  console.log("select.authLoaded", select.loaded)
  console.log("select.signedin", select.signedin)

  return (
    <Box>
      <Appbar route="home" title={t("generic.label.product")} />
      <Box sx={{ height: 60 }} />
      {select.loaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? (
        <Landing />
      ) : (
        <Box>
          <MyStats />
          <MyTables />
        </Box>
      )}
      <Snack data-testid="componentSnack" data={select.snackData} />
      <ToComeModal data={select.tocomeData} />
    </Box>
  );
}
