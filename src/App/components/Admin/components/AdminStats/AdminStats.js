import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, List, ListItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Services
import serviceGetTablesByPlayers from "./services/serviceGetTablesByPlayers.js";
import serviceGetTablesByGames from "./services/serviceGetTablesByGames.js";
import serviceGetUsersByStatus from "./services/serviceGetUsersByStatus.js";

export default function AdminStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminStats");
  }

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    priviledges: useSelector((state) => state.sliceUserDetails.priviledges),
    statsLoaded: useSelector((state) => state.sliceAdminStats.loaded),
    stats: useSelector((state) => state.sliceAdminStats.stats),
    statsState: useSelector((state) => state.sliceAdminStats.state),
  };

  // Load at opening
  if (select.priviledges.includes("admin")) {
    if (
      select.statsLoaded.tablesbyplayers === false &&
      select.statsState === "available"
    ) {
      serviceGetTablesByPlayers();
    }
    if (
      select.statsLoaded.tablesbygames === false &&
      select.statsState === "available"
    ) {
      serviceGetTablesByGames();
    }
    if (
      select.statsLoaded.usersbystatus === false &&
      select.statsState === "available"
    ) {
      serviceGetUsersByStatus();
    }
  }

  return (
    <Box>
      <Paper sx={{ p: 2, g: 2, m: 2 }}>
        <Typography variant="h5" gutterBottom>
          {"Current stats"}
        </Typography>
        <Typography>{"Users by status"}</Typography>
        <List dense={true}>
          {select.stats.usersbystatus.map((status) => {
            return (
              <ListItem key={"status-" + status._id}>
                <Typography>
                  {status._id + " : " + status.nbusers + " users"}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        <Typography>{"Tables by players"}</Typography>
        <List dense={true}>
          {select.stats.tablesbyplayers.map((playernb) => {
            return (
              <ListItem key={"playernb-" + playernb._id}>
                <Typography>
                  {playernb._id + " players : " + playernb.nbtables + " tables"}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        <Typography>{"Tables by games"}</Typography>
        <List dense={true}>
          {select.stats.tablesbygames.map((gamesnb) => {
            return (
              <ListItem key={"gamesnb-" + gamesnb._id}>
                <Typography>
                  {gamesnb._id + " games : " + gamesnb.nbtables + " tables"}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
