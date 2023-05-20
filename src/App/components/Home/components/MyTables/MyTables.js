import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Stack,
  List,
  ListItem,
  Typography,
  IconButton,
  Box,
  Card,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add.js";

// Shared
import TableModal from "../../../../shared/components/TableModal/TableModal.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export default function MyTables() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("MyTables");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    signedin: useSelector((state) => state.sliceUser.signedin),
    tables: useSelector((state) => state.sliceUser.tables),
  };

  // Table card
  function TableCard(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("TableCard " + props.table._id);
    }
    function onClick() {
      window.location = "/table/" + props.table._id;
    }
    return (
      <Card sx={{ width: "100%", p: 1 }} onClick={onClick}>
        <Typography>{props.table.name}</Typography>
      </Card>
    );
  }

  return (
    <Box hidden={select.signedin === false}>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t("home.label.mytables")}
        </Typography>
        <IconButton
          sx={{ p: 2 }}
          onClick={() => {
            appStore.dispatch({ type: "sliceTableModal/new" });
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <List dense={true}>
        {select.tables.map((table) => (
          <ListItem key={"table-" + table._id}>
            <TableCard table={table} />
          </ListItem>
        ))}
      </List>

      <TableModal />
    </Box>
  );
}
