import React from "react";
import { withTranslation } from "react-i18next";
import { Box, Tabs, Tab, Fab } from "@mui/material";

// Components
import TableStats from "./components/TableStats/TableStats.js";
import TableHistory from "./components/TableHistory/TableHistory.js";
import GameModal from "./components/GameModal/GameModal.js";

// Services
import serviceTableDetails from "./services/serviceTableDetails.js";
import serviceTableStats from "./services/serviceTableStats.js";
import apiTableHistory from "./services/apiTableHistory.js";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import TableModal from "../../shared/components/TableModal/TableModal.js";
import apiTableDetails from "../../shared/services/apiTableDetails.js";

// Reducers
import reduxStore from "../../store/reduxStore.js";

class Table extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.constructor");
    }
    super(props);
    this.state = {
      selectedTab: 0,
      table: {
        _id: "",
        name: "Table",
        players: [],
        contracts: [],
      },
      tableDetailsLoaded: false,
      tableHistory: [],
      tableHistoryLoaded: false,
      tableStats: {},
      tableStatsLoaded: false,
      openTableModal: false,
      openGameModal: false,
      gameid: "",
    };

    // Helpers
    this.getTableHistory = this.getTableHistory.bind(this);

    // Handles
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
      console.log("Table.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box>
        <Appbar
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
        <TabPanel value={this.state.selectedTab} index={0}>
          <TableStats />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          <TableHistory />
        </TabPanel>
        <Fab
          variant="extended"
          color="primary"
          sx={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={this.handleOpenGameModal}
        >
          {t("table.button.newgame")}
        </Fab>
        <TableModal
          open={this.state.openTableModal}
          callback={this.handleTableModalCallback}
          tableid={this.state.table === undefined ? "" : this.state.table._id}
        />
        <GameModal
          open={this.state.openGameModal}
          callback={this.handleGameModalCallback}
          gameid={this.state.gameid}
          players={this.state.table.players}
          tableid={this.state.table._id}
          contracts={this.state.table.contracts}
        />
        <Box sx={{ height: 60 }} />
      </Box>
    );
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.componentDidMount");
    }
    // Load
    if (
      reduxStore.getState().userDetails.token !== "" &&
      this.state.table._id === ""
    ) {
      if (this.state.tableDetailsLoaded === false) {
        // Get tableDetails
        serviceTableDetails().then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
      }
    }
  }
  componentDidUpdate(prevState, prevProps) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.componentDidUpdate");
    }
    // Load
    if (
      reduxStore.getState().userDetails.token !== "" &&
      this.state.table._id === ""
    ) {
      if (this.state.tableDetailsLoaded === false) {
        // Get tableDetails
        serviceTableDetails().then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
      }
      if (
        reduxStore.getState().userDetails.token !== "" &&
        this.state.tableStatsLoaded === false
      ) {
        // Get table stats
        serviceTableStats({ need: "ranking" }).then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
      }
    }
  }

  // Helpers
  getTableHistory() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.getTableHistory ");
    }
    let tableid = window.location.href.split("/table/")[1];
    let parameters = {
      need: "list",
      games: {
        index: 0,
        number: 20,
      },
    };
    apiTableHistory(tableid, parameters).then((data) => {
      this.setState((prevState, props) => ({
        tableHistory: data.games,
        tableHistoryLoaded: true,
      }));
    });
  }

  // Handles
  handleTableChangeTab(event, newTabIndex) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleTableChangeTab " + newTabIndex);
    }
    switch (newTabIndex) {
      case 0:
        // Get table stats
        serviceTableStats({ need: "ranking" }).then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
        this.setState({
          selectedTab: newTabIndex,
        });
        break;
      case 1:
        this.getTableHistory();
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
      console.log("Table.handleTableStatsCallback " + action);
    }
    switch (action) {
      default:
    }
  }
  handleTableHistoryCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleTableHistoryCallback " + action);
    }
    switch (action) {
      case "refresh":
        this.getTableHistory();
        break;
      case "open":
        this.setState((prevState, props) => ({
          gameid: details,
          openGameModal: true,
        }));
        break;
      default:
    }
  }
  handleOpenTableModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleOpenTableModal ");
    }
    this.setState((prevState, props) => ({
      openTableModal: true,
    }));
  }
  handleTableModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleTableModalCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openTableModal: false,
        }));
        break;
      case "totable":
        // Get tableDetails
        serviceTableDetails().then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
        this.setState((prevState, props) => ({
          openTableModal: false,
        }));
        break;
      case "updatetable":
        // Get tableDetails
        serviceTableDetails().then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors");
              console.log(proceedOutcome.errors);
            }
          }
          this.setState((prevState, props) => proceedOutcome.stateChanges);
        });
        // Reload history
        this.getTableHistory();
        this.setState((prevState, props) => ({
          openTableModal: false,
        }));
        break;
      default:
    }
  }
  handleOpenGameModal() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleOpenGameModal ");
    }
    this.setState((prevState, props) => ({
      openGameModal: true,
      gameid: "",
    }));
  }
  handleGameModalCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Table.handleGameModalCallback " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openGameModal: false,
        }));
        break;
      case "updategames":
        this.setState((prevState, props) => ({
          openGameModal: false,
        }));
        switch (this.state.selectedTab) {
          case 0:
            // Get table stats
            serviceTableStats({ need: "ranking" }).then((proceedOutcome) => {
              if (proceedOutcome.errors.length > 0) {
                if (process.env.REACT_APP_DEBUG === "TRUE") {
                  console.log("proceedOutcome errors");
                  console.log(proceedOutcome.errors);
                }
              }
              this.setState((prevState, props) => proceedOutcome.stateChanges);
            });
            break;
          case 1:
            this.getTableHistory();
            break;
          default:
        }
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

export default withTranslation()(Table);
