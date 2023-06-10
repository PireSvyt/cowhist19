import React from "react";
import { useTranslation } from "react-i18next";
import {  Card, Typography } from "@mui/material";

export default function TableCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableCard " + props.table._id);
  }

  return (
    <Card
      sx={{ width: "100%", p: 1 }}
      onClick={() => {
        window.location = "/table/" + props.table._id;
      }}
    >
      <Typography>{props.table.name}</Typography>
    </Card>
  );
}
