import React from "react";
import { withTranslation } from "react-i18next";
import { Box, Tabs, Tab, Fab } from "@mui/material";

import Appbar from "../components/Appbar";
import TableStats from "../components/TableStats";
import TableHistory from "../components/TableHistory";
import GameModal from "../components/GameModal";

class TablePage extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0,
      tableHistory: [],
      openGameModal: false,
      gameid: "",
    };

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleTableStatsCallback = this.handleTableStatsCallback.bind(this);
    this.handleTableHistoryCallback =
      this.handleTableHistoryCallback.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleGameModalCallback = this.handleGameModalCallback.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          token={this.props.token}
          route="table"
        />
        <Box sx={{ height: 48 }} />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleChangeTab}
            variant="fullWidth"
          >
            <Tab
              label={t("table-label-tablestats")}
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab
              label={t("table-label-tablehistory")}
              id="tab-1"
              aria-controls="tabpanel-1"
            />
          </Tabs>
        </Box>
        <TabPanel value={this.state.selectedTab} index={0}>
          <TableStats token={this.props.token} />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          <TableHistory
            token={this.props.token}
            history={this.state.tableHistory}
          />
        </TabPanel>
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "absolute", bottom: 20, right: 20 }}
          onClick={this.handleNewGame}
        >
          {t("table-button-newgame")}
        </Fab>
        <GameModal
          open={this.state.openGameModal}
          callback={this.handleGameModalCallback}
          token={this.props.token}
          gameid={this.state.gameid}
        />
      </Box>
    );
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleTableCallback " + action);
    }
    switch (action) {
      case "signedout":
        this.props.callback("signedout");
        break;
      default:
    }
  }
  handleChangeTab(event, newTabIndex) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleChangeTab " + newTabIndex);
    }
    switch (newTabIndex) {
      case 0:
        //this.updateSummary();
        this.setState({
          selectedTab: newTabIndex,
        });
        break;
      case 1:
        //this.updateTransactions();
        this.setState({
          selectedTab: newTabIndex,
        });
        break;
      default:
        if (process.env.REACT_APP_DEBUG === "TRUE") {
          console.log("/!\\ no match tab index : " + newTabIndex);
        }
    }
  }
  handleTableStatsCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleTableStatsCallback " + action);
    }
    switch (action) {
      default:
    }
  }
  handleTableHistoryCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleTableHistoryCallback " + action);
    }
    switch (action) {
      default:
    }
  }
  handleNewGame() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleNewGame ");
    }
    this.setState((prevState, props) => ({
      openGameModal: true,
      gameid: "",
    }));
  }
  handleGameModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleGameModalCallback " + action);
    }
    switch (action) {
      default:
    }
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

export default withTranslation()(TablePage);
