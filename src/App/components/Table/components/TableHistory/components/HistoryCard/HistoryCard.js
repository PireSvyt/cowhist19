import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  List,
  ListItem,
  Card,
  Typography,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import CircularProgress from "@mui/material/CircularProgress";

// Services
import serviceGameDelete from "./services/serviceGameDelete.js";
import serviceGetTableHistory from "../../../../services/serviceGetTableHistory.js";
// Shared
import { random_id } from "../../../../../../shared/services/toolkit.js";
import ConfirmModal from "../../../../../../shared/components/ConfirmModal/ConfirmModal.js";
// Reducers
import appStore from "../../../../../../store/appStore.js";

export default function HistoryCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("HistoryCard " + props.game._id);
  }
  // i18n
  const { t } = useTranslation();

  function stringifyPlayers() {
    let res = "";
    // Attack
    props.game.players.forEach((gamePlayer) => {
      if (gamePlayer.role === "attack") {
        let pseudoPlayer = appStore
          .getState()
          .sliceTableDetails.players.filter((tablePlayer) => {
            tablePlayer._id === gamePlayer._id;
          });
        if (pseudoPlayer.length > 0) {
          res = res + pseudoPlayer[0].pseudo + ", ";
        } else {
          res = res + "a removed user, ";
        }
      }
    });
    res = res + t("game.label.against") + " ";
    // Defense
    props.game.players.forEach((gamePlayer) => {
      if (gamePlayer.role === "defense") {
        let pseudoPlayer = appStore
          .getState()
          .sliceTableDetails.players.filter((tablePlayer) => {
            tablePlayer._id === gamePlayer._id;
          });
        if (pseudoPlayer.length > 0) {
          res = res + pseudoPlayer[0].pseudo + ", ";
        } else {
          res = res + "a removed user, ";
        }
      }
    });
    return res;
  }
  function stringifyOutcome() {
    if (props.game.outcome >= 0) {
      return t("game.label.won") + "  +" + props.game.outcome;
    } else {
      return t("game.label.lost") + "  " + props.game.outcome;
    }
  }
  function stringifyDate() {
    let date = new Date(props.game.date);
    return date.toLocaleString("fr-FR");
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  // Confirm modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  function confirmCallback(choice) {
    switch (choice) {
      case "close":
        setConfirmOpen(false);
        break;
      case "delete":
        setConfirmOpen(false);
        setDeleting(true);
        serviceGameDelete(props.game._id).then(() => {
          setDeleting(false);
          serviceGetTableHistory();
        });
        break;
      default:
        console.error("HistoryCard.confirmCallback unmatched " + choice);
    }
  }

  return (
    <Card sx={{ width: "100%", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="caption">{stringifyDate()}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {t("game.label.contract." + props.game.contract) +
              " " +
              stringifyOutcome()}
          </Typography>
        </Box>

        <IconButton onClick={() => setConfirmOpen(true)} disabled={deleting}>
          <Box hidden={!deleting}>
            <CircularProgress size={24} sx={{ color: "grey.500" }} />
          </Box>
          <Box hidden={deleting}>
            <RemoveCircleOutlineIcon />
          </Box>
        </IconButton>
      </Box>

      <Typography variant="body2">{stringifyPlayers()}</Typography>

      <ConfirmModal
        open={confirmOpen}
        data={{
          title: "game.confirm.delete.title",
          content: "game.confirm.delete.content",
          callToActions: [
            {
              label: "generic.button.cancel",
              choice: "close",
            },
            {
              label: "generic.button.proceed",
              choice: "delete",
              variant: "contained",
              color: "error",
            },
          ],
        }}
        callback={confirmCallback}
      />
    </Card>
  );
}
