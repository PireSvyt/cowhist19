import React from "react";
import { Card, Typography } from "@mui/material";

export default function TableCard(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("TableCard " + props.table.tableid);
  }

  // Changes
  let changes = {
    totable : () => {
      window.location = "/table/" + props.table.tableid;
    }
  }

  return (
    <Card
      data-testid={"list-my tables-listitem"}
      index={props.index}
      sx={{ width: "100%", p: 1 }}
      onClick={changes.totable}
    >
      <Typography>{props.table.name}</Typography>
    </Card>
  );
}
