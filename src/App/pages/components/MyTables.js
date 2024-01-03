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
} from "@mui/material";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import AddIcon from "@mui/icons-material/Add.js";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import TableCard from "./TableCard.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function MyTables() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("MyTables");
  }
  // i18n
  const { t } = useTranslation();

  let c = -1

  // Selects
  const select = {
    loaded: useSelector((state) => state.userSlice.loaded),
    tables: useSelector((state) => state.userSlice.tables),
  };

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: "tableModalSlice/new",
        payload: {
          userid: appStore.getState().userSlice.userid,
          pseudo: appStore.getState().userSlice.pseudo,
          status: appStore.getState().userSlice.status,
        },
      });
    }
  }

  return (
    <Box 
      data-testid="component-my tables"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t("home.label.mytables")}
        </Typography>
        <IconButton
          data-testid="component-my tables-button-new table"
          sx={{ p: 2 }}
          onClick={changes.new}
          color="secondary"
        >
          <AddIcon />
        </IconButton>
      </Stack>

      {select.loaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress 
          color="secondary"/>
        </Box>
      ) : select.tables.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          data-testid="component-my tables-box-no table note"
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("home.label.notables")}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("home.label.notablesexplanation")}
          </Typography>
        </Box>
      ) : (
        <List 
          dense={true}
          data-testid="component-my tables-list-table"
        >
          {select.tables.map((table) => {
            c += 1
            return(
              <ListItem 
                key={"table-" + table.tableid}
              >
                <TableCard table={table} index={c} />
              </ListItem>
            )
          })}
        </List>
      )}
    </Box>
  );
}
