import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function PlayerCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("PlayerCard " + props.player.userid);
  }

  // Handles
  function removeUser() {
    appStore.dispatch({
      type: "tableModalSlice/removeuser",
      payload: props.player.userid,
    });
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
        data-testid={"list-players-listitem"}
      >
        <Typography>{props.player.pseudo}</Typography>
        <IconButton 
          onClick={removeUser}
          data-testid={"list-players-button-remove player"}
          id={props.player.userid}
          label={props.player.pseudo}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
