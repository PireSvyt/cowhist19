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
import ConfirmModal from "../../../../../../shared/components/ConfirmModal/ConfirmModal.js";

export default function HistoryCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("HistoryCard " + props.game._id);
  }
  // i18n
  const { t } = useTranslation();

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

  function stringifyPlayers() {
    let res = "";
    // Attack
    props.game.attack.forEach((gamePlayer) => {
      switch (gamePlayer.nonuser) {
        case "na":
          res = res + gamePlayer.pseudo + ", ";
          break;
        case "guest":
          res = res + t("game.label.guest") + ", ";
          break;
        case "removeduser":
          res = res + t("game.label.removeduser") + ", ";
          break;
        default:
          res = res + "unknown user" + ", ";
      }      
    });
    res = res.slice(0, -2) + " " + t("game.label.against") + " ";
    // Defense
    props.game.defense.forEach((gamePlayer) => {
      switch (gamePlayer.nonuser) {
        case "na":
          res = res + gamePlayer.pseudo + ", ";
          break;
        case "guest":
          res = res + t("game.label.guest") + ", ";
          break;
        case "removeduser":
          res = res + t("game.label.removeduser") + ", ";
          break;
        default:
          res = res + "unknown user" + ", ";
      }     
    });
    return res.slice(0, -2);
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
          <Typography >
            {t("game.label.contract." + props.game.contract) +
              " " +
              stringifyOutcome()}
          </Typography>
        </Box>

        <IconButton onClick={() => setConfirmOpen(true)} disabled={deleting}>
          {deleting ? (
            <CircularProgress size={24} sx={{ color: "grey.500" }} />
          ) : (
            <RemoveCircleOutlineIcon />
          )}
        </IconButton>
      </Box>

      <Typography variant="body2">{stringifyPlayers()}</Typography>

      {confirmOpen === false ? null : (
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
      )}
    </Card>
  );
}
