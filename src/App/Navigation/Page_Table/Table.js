import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab, Fab, Typography, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorIcon from "@mui/icons-material/Error";

// Components
import TableStats from "../../Core/Table/com.Stats/TableStats.js";
import TableHistory from "../../Core/Table/com.History/History.js";
import GameModal from "../../Core/Game/Modal/modal.Game.js"
// Services
import serviceGetTableDetails from "../../Core/Table/ser.Details/serviceGetTableDetails.js";
import serviceGetTableStats from "../../Core/Table/com.Stats/ser.GetStats/serviceGetTableStats.js";
import serviceGetTableHistory from "../../Core/Table/com.History/GetHistory.service/GetHistory.service.js";

// Shared
import Appbar from "../Appbar/comp.Appbar.js";
import TableModal from "../../Core/Table/mod.Table/Table.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Table() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Table");
  }
  // i18n
  const { t } = useTranslation();

  // States
  const [tab, setTab] = useState(0);

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    tableDetailsLoaded: useSelector((state) => state.sliceTableDetails.loaded),
    tableDenied: useSelector((state) => state.sliceTableDetails.denied),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    name: useSelector((state) => state.sliceTableDetails.name),
    snackData: useSelector((state) => state.sliceSnack.snackData),
    openTableModal: useSelector((state) => state.sliceTableModal.open),
    openGameModal: useSelector((state) => state.sliceGameModal.open),
  };

  // Load at opening
  if (select.authLoaded === true && select.signedin === true) {
    if (select.tableDetailsLoaded === false) {
      serviceGetTableDetails();
    }
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={"tabpanel-" + index}
        aria-labelledby={"tab-" + index}
        {...other}
      >
        {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
      </Box>
    );
  }
  function changeTab(event, newTabIndex) {
    switch (newTabIndex) {
      case 0:
        if (appStore.getState().sliceTableStats.state === "available") {
          serviceGetTableStats();
        }
        setTab(newTabIndex);
        break;
      case 1:
        if (appStore.getState().sliceTableHistory.state === "available") {
          serviceGetTableHistory();
        }
        setTab(newTabIndex);
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
  }

  return (
    <Box>
      <Appbar
        route="table"
        title={select.name}
        edittable={() => {
          appStore.dispatch({
            type: "sliceTableModal/open",
            payload: {
              id: appStore.getState().sliceTableDetails.id,
              name: appStore.getState().sliceTableDetails.name,              
              guests: appStore.getState().sliceTableDetails.guests,
              players: appStore.getState().sliceTableDetails.players,
            },
          });
        }}
      />
      <Box sx={{ height: 55 }} />
      {select.authLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? null : select.tableDenied === true ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("table.label.deniedaccess")}
          </Typography>
          <ErrorIcon sx={{ mt: 2, mb: 2 }} fontSize="large" color="error" />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("table.label.deniedaccessexplanation")}
          </Typography>
          <Button
            onClick={() => {
              window.location = "/";
            }}
            variant={"contained"}
            sx={{ mt: 2, mb: 2 }}
          >
            {t("generic.button.tohome")}
          </Button>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs value={tab} onChange={changeTab} variant="fullWidth">
              <Tab
                label={t("table.label.stats")}
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                label={t("table.label.history")}
                id="tab-1"
                aria-controls="tabpanel-1"
              />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0} sx={{pl: "0", pr: "0"}}>
            <TableStats />
          </TabPanel>
          <TabPanel value={tab} index={1} sx={{pl: "0", pr: "0"}}>
            <TableHistory />
          </TabPanel>
          <Fab
            variant="extended"
            color="primary"
            sx={{ position: "fixed", bottom: 20, right: 20 }}
            onClick={() => {
              appStore.dispatch({ type: "sliceGameModal/new" });
            }}
          >
            {t("table.button.newgame")}
          </Fab>
          <Box sx={{ height: 60 }} />

          {select.openTableModal === true ? <TableModal /> : null}
          {select.openGameModal === true ? <GameModal /> : null}
        </Box>
      )}
    </Box>
  );
}
