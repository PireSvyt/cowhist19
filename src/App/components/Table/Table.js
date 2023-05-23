import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Box, Tabs, Tab, Fab } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

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
import Snack from "../../shared/components/Snack/Snack2.js";
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
    loaded: useSelector((state) => state.sliceUser.loaded),
    signedin: useSelector((state) => state.sliceUser.signedin),
    name: useSelector((state) => state.sliceTableDetails.name),
    token: useSelector((state) => state.sliceUser.token),
    snackData: useSelector((state) => state.sliceSnack.snackData),
    openTableModal: useSelector((state) => state.sliceTableModal.open),
    openGameModal: useSelector((state) => state.sliceGameModal.open),
  };

  // Load at opening
  if (select.token !== "") {
    if (appStore.getState().sliceTableDetails.state === "available") {
      serviceGetTableDetails();
    }
    if (appStore.getState().sliceTableStats.state === "available") {
      serviceGetTableStats();
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
              players: appStore.getState().sliceTableDetails.players,
            },
          });
        }}
      />
      <Box sx={{ height: 48 }} />
      {select.loaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? null : (
        <Box>
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
          <Box sx={{ height: 60 }} />

          {select.openTableModal === true ? <TableModal /> : null}
          {select.openGameModal === true ? <GameModal /> : null}

          <Snack data-testid="componentSnack" data={select.snackData} />
        </Box>
      )}
    </Box>
  );
}
