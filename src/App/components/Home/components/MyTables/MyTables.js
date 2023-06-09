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
import TableCard from "./components/TableCard/TableCard.js";
// Shared
import TableModal from "../../../_shared/components/Appbar/components/TableModal/TableModal.js";
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
    detailsLoaded: useSelector((state) => state.sliceUserDetails.loaded),
    tables: useSelector((state) => state.sliceUserDetails.tables),
    openTableModal: useSelector((state) => state.sliceTableModal.open),
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t("home.label.mytables")}
        </Typography>
        <IconButton
          sx={{ p: 2 }}
          onClick={() => {
            appStore.dispatch({
              type: "sliceTableModal/new",
              payload: {
                _id: appStore.getState().sliceUserDetails.id,
                pseudo: appStore.getState().sliceUserDetails.pseudo,
                status: appStore.getState().sliceUserDetails.status,
              },
            });
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      {select.detailsLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.tables.length === 0 ? (
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
        <List dense={true}>
          {select.tables.map((table) => (
            <ListItem key={"table-" + table._id}>
              <TableCard table={table} />
            </ListItem>
          ))}
        </List>
      )}

      {select.openTableModal === true ? <TableModal /> : null}
    </Box>
  );
}
