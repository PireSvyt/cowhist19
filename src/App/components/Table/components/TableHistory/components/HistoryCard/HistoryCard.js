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

// Services
import serviceGameDelete from "../../services/serviceGameDelete.js";
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

  // State
  const [confirmData, setConfirmData] = useState({
    uid: "",
    title: "",
    content: "",
    callToActions: [],
  });

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

        <IconButton
          onClick={() => {
            setConfirmData({
              uid: random_id(),
              title: "game.confirm.delete.title",
              content: "game.confirm.delete.content",
              callToActions: [
                {
                  label: "generic.button.cancel",
                  callback: () => {
                    setConfirmData({
                      uid: "",
                      title: "",
                      content: "",
                      callToActions: [],
                    });
                  },
                },
                {
                  label: "generic.button.proceed",
                  callback: () => serviceGameDelete(props.game._id),
                  variant: "contained",
                  color: "error",
                },
              ],
            });
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
      <Typography variant="body2">{stringifyPlayers()}</Typography>
      <ConfirmModal data={confirmData} />
    </Card>
  );
}
