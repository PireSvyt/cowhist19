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
      <List dense={true}>
        {select.players !== [] ? (
          select.history.map((game) => (
            <ListItem key={"game-" + game._id}>
              <HistoryCard game={game} />
            </ListItem>
          ))
        ) : (
          <div />
        )}
      </List>
    </Box>
  );
}
