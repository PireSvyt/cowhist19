import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  Typography, Button
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

// Components
import Card from "./Card.component/Card.js";
// Services
import GetHistoryService from "./GetHistory.service/GetHistoryService.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export default function History() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("History");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    loadedDetails: useSelector((state) => state.sliceTableDetails.loaded),
    loadedHistory: useSelector((state) => state.sliceHistory.loaded),
    history: useSelector((state) => state.sliceHistory.games),
    more: useSelector((state) => state.sliceHistory.more),
    state: useSelector((state) => state.sliceHistory.state),
  };

  // Load
  if (select.loadedDetails && !select.loadedHistory) {
    GetHistoryService();
  }

  function loadmore () {
    let lastgame = select.history.slice(-1)[0]
    GetHistoryService(lastgame._id);
  }

  return (
    <Box>
      {!(select.loadedDetails === true && select.loadedHistory === true) ? (
        <Box
          sx={{ left: "10%", right: "10%" }}
        >
          <LinearProgress />
        </Box>
      ) : select.history.length === 0 ? (
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
            {t("table.label.nogames")}
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
            {t("table.label.nogameshistoryexplanation")}
          </Typography>
        </Box>
      ) : (
        <Box>
          <List dense={true}>
            {select.history.map((game) => (
              <ListItem key={"game-" + game._id}>
                <Card game={game} />
              </ListItem>))}
          </List>
          {select.more ? (
            <Box textAlign="center">
              <Button
                variant="outlined"
                disabled={select.state !== "available"}
                sx={{
                  width: "80%",
                  m: 1,
                }}
                onClick={loadmore}
              >
                {t("table.button.loadmore")}
              </Button>
            </Box>
          ) : (null) }
        </Box>
      )}
    </Box>
  );
}
