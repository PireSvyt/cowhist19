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
import HistoryCard from "../HistoryCard/HistoryCard.js";
// Services
import serviceGetTableHistory from "../../services/serviceGetTableHistory.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export default function TableHistory() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableHistory");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    loadedDetails: useSelector((state) => state.sliceTableDetails.loaded),
    loadedHistory: useSelector((state) => state.sliceTableHistory.loaded),
    history: useSelector((state) => state.sliceTableHistory.games),
    more: useSelector((state) => state.sliceTableHistory.more),
    state: useSelector((state) => state.sliceTableHistory.state),
  };

  // Load
  if (select.loadedDetails && !select.loadedHistory) {
    serviceGetTableHistory();
  }

  function loadmore () {
    let lastgame = select.history.slice(-1)[0]
    serviceGetTableHistory(lastgame._id);
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
                <HistoryCard game={game} />
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
