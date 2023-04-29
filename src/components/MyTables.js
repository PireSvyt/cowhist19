import * as React from "react";
import { withTranslation } from "react-i18next";
import {
  Stack,
  List,
  ListItem,
  Typography,
  IconButton,
  Box,
  Card,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Snack from "./Snack";
import TableModal from "./TableModal";

class MyTables extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTables.constructor");
    }
    super(props);
    this.state = {
      openTableModal: false,
      tableid: undefined,
      openSnack: false,
      snack: undefined,
    };
    // Handles
    this.handleNewTable = this.handleNewTable.bind(this);
    this.handleTableModalCallback = this.handleTableModalCallback.bind(this);
    this.handleSnack = this.handleSnack.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTables.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Box hidden={this.props.open === undefined || this.props.open === false}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ p: 2 }} variant="h6" component="span">
            {t("mytables-label-mytables")}
          </Typography>
          <IconButton sx={{ p: 2 }} onClick={this.handleNewTable}>
            <AddIcon />
          </IconButton>
        </Stack>

        <List dense={true}>
          {this.props.tables.map((table) => (
            <ListItem key={"table-" + table._id}>
              <MyTable table={table} />
            </ListItem>
          ))}
        </List>

        <TableModal
          open={this.state.openTableModal}
          callback={this.handleTableModalCallback}
          token={this.props.token}
          table={this.state.table}
        />
        <Snack
          open={this.state.openSnack}
          snack={this.state.snack}
          callback={this.handleSnack}
        />
      </Box>
    );
  }

  // Handlers
  handleNewTable() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTables.handleNewTable ");
    }
    this.setState((prevState, props) => ({
      openTableModal: true,
      tableid: undefined,
    }));
  }
  handleTableModalCallback(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTables.handleTableModalCallback ");
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openTableModal: false,
        }));
        break;
      default:
    }
  }
  handleSnack(action) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTables.handleSnack " + action);
    }
    switch (action) {
      case "close":
        this.setState((prevState, props) => ({
          openSnack: false,
        }));
        break;
      default:
    }
  }
}

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTable.constructor " + this.props.table._id);
    }
    // Handlers
    this.handleOpen = this.handleOpen.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTable.render " + this.props.table._id);
    }
    return (
      <Card
        sx={{ width: "100%", pl: "1em", pr: "1em" }}
        onClick={this.handleOpen}
      >
        <Typography>{this.props.table.name}</Typography>
      </Card>
    );
  }

  // Handles
  handleOpen() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("MyTable.handleOpen " + this.props.table._id);
    }
    window.location = "/" + this.props.table._id;
  }
}

export default withTranslation()(MyTables);
