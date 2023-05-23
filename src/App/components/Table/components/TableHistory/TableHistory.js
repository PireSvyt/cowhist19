import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import HistoryCard from "./components/HistoryCard/HistoryCard.js";
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
    history: useSelector((state) => state.sliceTableHistory.games),
    players: useSelector((state) => state.sliceTableDetails.players),
  };

  return (
    <Box>
      {select.history.length > 0 && select.players.length > 0 ? (
        <List dense={true}>
          {select.history.map((game) => (
            <ListItem key={"game-" + game._id}>
              <HistoryCard game={game} tablePlayers={select.players} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          sx={{ position: "fixed", bottom: "50%", left: "10%", right: "10%" }}
        >
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
}
