import React from "react";
import { withTranslation } from "react-i18next";
import { Box, Tabs, Tab, Fab } from "@mui/material";

import Appbar from "../components/Appbar";
import TableModal from "../components/TableModal";
import TableStats from "../components/TableStats";
import TableHistory from "../components/TableHistory";
import GameModal from "../components/GameModal";

import { apiTableDetails } from "../api/table";

class TablePage extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0,
      table: {
        _id: "",
        name: "Table",
        users: [],
      },
      users: [],
      tableHistory: [],
      openTableModal: false,
      tableid:"",
      openGameModal: false,
      gameid: "",
    };

    // Helpers
    this.getTableDetails = this.getTableDetails.bind(this);

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this);
    this.handleTableChangeTab = this.handleTableChangeTab.bind(this);
    this.handleTableStatsCallback = this.handleTableStatsCallback.bind(this);
    this.handleTableHistoryCallback =
      this.handleTableHistoryCallback.bind(this);
    this.handleOpenTableModal = this.handleOpenTableModal.bind(this);
    this.handleTableModalCallback = this.handleTableModalCallback.bind(this);
    this.handleOpenGameModal = this.handleOpenGameModal.bind(this);
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
          title={this.state.table.name}
          edittable={this.handleOpenTableModal}
        />
        <Box sx={{ height: 48 }} />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleTableChangeTab}
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
          onClick={this.handleOpenGameModal}
        >
          {t("table-button-newgame")}
        </Fab>
        <TableModal
          open={this.state.openTableModal}
          callback={this.handleTableModalCallback}
          token={this.props.token}
          tableid={this.state.table._id}
        />
        <GameModal
          open={this.state.openGameModal}
          callback={this.handleGameModalCallback}
          token={this.props.token}
          gameid={this.state.gameid}
          users={this.state.users}
        />
      </Box>
    );
  }
  componentDidUpdate(prevState) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.componentDidUpdate");
    }
    // Load
    if (this.state.table._id === "") {
      this.getTableDetails();
    }
  }

  // Helpers
  getTableDetails() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.getTableDetails ");
    }
    if (this.props.token !== undefined) {
      let tableid = window.location.href.split("/table/")[1];
      apiTableDetails(this.props.token, tableid).then((data) => {
        this.setState((prevState, props) => ({
          table: data.table,
          tableid: tableid
        }));
      });
    }
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
  handleTableChangeTab(event, newTabIndex) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleTableChangeTab " + newTabIndex);
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
  handleOpenTableModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleOpenTableModal ");
    }
    this.setState((prevState, props) => ({
      tableid: this.state.table._id,
      openTableModal: true,
    }));
  }
  handleTableModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleTableModalCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openTableModal: false,
        }));
        break;
      case "updategames":
        console.log("TODO updategames");
        break;
      default:
    }
  }
  handleOpenGameModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TablePage.handleOpenGameModal ");
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
      case "close":
        this.setState((prevState, props) => ({
          openGameModal: false,
        }));
        break;
      case "updategames":
        console.log("TODO updategames");
        break;
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
