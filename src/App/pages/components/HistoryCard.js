import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Typography,
  IconButton,
  List,
  ListItem
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import CircularProgress from "@mui/material/CircularProgress";

// Services
import { serviceGameDelete } from "../../services/game/game.services.js";
import { serviceTableGetHistory } from "../../services/table/table.services.js";
// Shared
import ConfirmModal from "../modals/ConfirmModal.js";
import { random_id } from "../../services/_miscelaneous/toolkit.js";

export default function HistoryCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("HistoryCard " + props.game.gameid);
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
        serviceGameDelete(props.game.gameid).then(() => {
          setDeleting(false);
          serviceTableGetHistory();
        });
        break;
      default:
        console.error("HistoryCard.confirmCallback unmatched " + choice);
    }
  }

  function stringifyPlayers(contract) {
    let res = "";
    let contractPlayers = {
      attackPlayers: [],
      defensePlayers: []
    }
    // 
    Object.values(contract.players).forEach((gamePlayer) => {
      let readyGamePlayer = { ...gamePlayer };
      if (gamePlayer.status === "guest") {
        readyGamePlayer.pseudo = t("game.label.guest")
      } else {
        let pseudoPlayer = props.players.filter((tablePlayer) => {
          return tablePlayer.userid === gamePlayer.userid;
        });
        if (pseudoPlayer.length > 0) {
          readyGamePlayer.pseudo = pseudoPlayer[0].pseudo;
        } else {
          readyGamePlayer.pseudo = t("game.label.removeduser")
        }
      }
      contractPlayers[gamePlayer.role + "Players"].push(readyGamePlayer);
    })
    // Attack
    contractPlayers.attackPlayers.forEach((gamePlayer) => {
      res = res + gamePlayer.pseudo + ", ";
    });
    res = res.slice(0, -2) + " " + t("game.label.against") + " ";
    // Defense
    contractPlayers.defensePlayers.forEach((gamePlayer) => {
      res = res + gamePlayer.pseudo + ", ";
    });
    return res.slice(0, -2);
  }
  function stringifyOutcome(contract) {
    if (contract.outcome >= 0) {
      return t("game.label.won") + "  +" + contract.outcome;
    } else {
      return t("game.label.lost") + "  " + contract.outcome;
    }
  }
  function stringifyDate() {
    let date = new Date(props.game.date);
    return date.toLocaleString("fr-FR");
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }

  return (
    <Card 
      data-testid="component-table history-listitem-game"
      index={props.index}
      sx={{ 
        width: "100%", 
        p: 1 
      }}
    >
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
        </Box>

        <IconButton 
          id={props.game.gameid}
          data-testid={"component-table history-listitem-game-button-delete game"}
          index={props.index}
          onClick={() => setConfirmOpen(true)} disabled={deleting}
        >
          {deleting ? (
            <CircularProgress size={24} sx={{ color: "grey.500" }} />
          ) : (
            <RemoveCircleOutlineIcon />
          )}
        </IconButton>
      </Box>

      <List 
        dense={true} 
        data-testid="component-history card-list-contract"
      >
        {props.game.contracts.map((contract) => {
          return (
            <ListItem key={"contract-" + props.game.gameid + "-" + random_id()}>   
              <Box>
                <Typography sx={{ fontWeight: "bold" }}>
                  {t("game.label.contract." + contract.contract) +
                    " " +
                    stringifyOutcome(contract)}
                </Typography>
                <Typography variant="body2">{stringifyPlayers(contract)}</Typography>    
              </Box>          
            </ListItem>
            
          );
        })}
      </List>

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
