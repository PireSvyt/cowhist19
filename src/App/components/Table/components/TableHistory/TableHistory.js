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

// Services
import serviceGameDelete from "./services/serviceGameDelete.js";
// Shared
import ConfirmModal from "../../../../shared/components/ConfirmModal/ConfirmModal.js";
import { random_id } from "../../../../shared/services/toolkit.js";
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
              <GameCard game={game} />
            </ListItem>
          ))
        ) : (
          <div />
        )}
      </List>
    </Box>
  );

  function GameCard(props) {
    function stringifyPlayers() {
      let res = "";
      // Attack
      props.game.players.forEach((actualPlayer) => {
        if (actualPlayer.role === "attack") {
          let pseudoPlayer = select.players.filter((player) => {
            player._id === actualPlayer._id;
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
      props.game.players.forEach((actualPlayer) => {
        if (actualPlayer.role === "defense") {
          let pseudoPlayer = select.players.filter((player) => {
            player._id === actualPlayer._id;
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
              appStore.dispatch({
                type: "sliceConfirmModal/open",
                payload: {
                  title: "game.confirm.delete.title",
                  content: "game.confirm.delete.content",
                  callToActions: [
                    {
                      label: "generic.button.cancel",
                      callback: () => {
                        appStore.dispatch({ type: "sliceConfirmModal/close" });
                      },
                    },
                    {
                      label: "generic.button.proceed",
                      callback: () => {
                        serviceGameDelete(props.game.id);
                      },
                      variant: "contained",
                      color: "error",
                    },
                  ],
                },
              });
            }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
        <Typography variant="body2">{stringifyPlayers()}</Typography>
      </Card>
    );
  }
}
