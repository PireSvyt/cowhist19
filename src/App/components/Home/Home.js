import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import Landing from "./components/Landing/Landing.js";
import MyStats from "./components/MyStats/MyStats.js";
import MyTables from "./components/MyTables/MyTables.js";
// Shared
import Appbar from "../_shared/components/Appbar/Appbar.js";

export default function Home() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Home");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    snackOpen: useSelector((state) => state.sliceSnack.open),
    snackData: useSelector((state) => state.sliceSnack.snackData),
  };

  return (
    <Box>
      <Appbar route="home" title={t("generic.label.product")} />
      <Box sx={{ height: 55 }} />

      {select.authLoaded === false ? (
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
      
    </Box>
  );
}
