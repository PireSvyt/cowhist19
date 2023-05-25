import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Card, Typography, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";

// Reducers
import appStore from "../../../../../store/appStore.js";

export default function PlayerCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("PlayerCard " + props.player._id);
  }
  // i18n
  const { t } = useTranslation();

  // Handles
  function removeUser() {
    appStore.dispatch({
      type: "sliceTableModal/removeuser",
      payload: props.player._id,
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
      >
        <Typography>{props.player.pseudo}</Typography>
        <IconButton onClick={removeUser}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
