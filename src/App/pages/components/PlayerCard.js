import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function PlayerCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("PlayerCard " + props.player.userid);
  }

  // Changes
  let changes = {
    remove : () => {
      appStore.dispatch({
        type: "tableModalSlice/removeuser",
        payload: props.player.userid,
      });
  } 
  }

  return (
    <Card 
      sx={{ 
        width: "100%", 
        p: 1 
      }}
      data-testid={"list-players-listitem"}
      index={props.index}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{props.player.pseudo}</Typography>
        <IconButton 
          onClick={changes.remove}
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
