import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab, Fab } from "@mui/material";

// Components
import TableStats from "./components/TableStats/TableStats.js";
import TableHistory from "./components/TableHistory/TableHistory.js";
import GameModal from "./components/GameModal/GameModal.js";
// Services
import serviceGetTableDetails from "./services/serviceGetTableDetails.js";
import serviceGetTableStats from "./services/serviceGetTableStats.js";
import serviceGetTableHistory from "./services/serviceGetTableHistory.js";
// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import TableModal from "../../shared/components/TableModal/TableModal.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Table() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Table");
  }
  // i18n
  const { t } = useTranslation();

  // Load at opening
  //serviceGetTableDetails();
  //serviceGetTableStats();

  // States
  const [tab, setTab] = useState(0);

  // Selects
  const select = {
    name: useSelector((state) => state.sliceTableDetails.name),
  };

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
        serviceGetTableStats();
        setTab(newTabIndex);
        break;
      case 1:
        serviceGetTableHistory();
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
              players: appStore.getState().sliceTableDetails.players,
            },
          });
        }}
      />
      <Box sx={{ height: 48 }} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      <TabPanel value={tab} index={0}>
        <TableStats />
      </TabPanel>
      <TabPanel value={tab} index={1}>
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
      <TableModal />
      <GameModal />
      <Box sx={{ height: 60 }} />
    </Box>
  );
}
