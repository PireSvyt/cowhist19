import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, List, ListItem } from "@mui/material";

// Services
import { 
  serviceAdminGetTablesByPlayers,
  serviceAdminGetTablesByGames,
  serviceAdminGetUsersByStatus
  } from "../../services/admin/admin.services.js";

export default function AdminStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminStats");
  }

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.authSlice.loaded),
    signedin: useSelector((state) => state.authSlice.signedin),
    priviledges: useSelector((state) => state.userSlice.priviledges),
    adminStats: useSelector((state) => state.adminSlice.stats),
    adminState: useSelector((state) => state.adminSlice.state),
  };

  // Load at opening
  if (select.authLoaded === true && 
      select.signedin === true && 
      select.priviledges.includes("admin")
    ) {
      let isAvailable = true
      Object.keys(select.adminState).forEach( k => {
        if (select.adminState[k] === "locked") {
          isAvailable = false
        }
      })
      if (isAvailable) {
        if (select.adminState.tablesbyplayers === undefined) {
          serviceAdminGetTablesByPlayers();
        }
        if (select.adminState.tablesbygames === undefined) {
          serviceAdminGetTablesByGames();
        }
        if (select.adminState.usersbystatus === undefined) {
          serviceAdminGetUsersByStatus();
        }
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
          {select.adminStats.usersbystatus.map((status) => {
            return (
              <ListItem key={"status-" + status._id}>
                <Typography>{status.nbusers + " " + status._id}</Typography>
              </ListItem>
            );
          })}
        </List>
        <Typography>{"Tables by players"}</Typography>
        <List dense={true}>
          {select.adminStats.tablesbyplayers.map((playernb) => {
            return (
              <ListItem key={"playernb-" + playernb._id}>
                <Typography>
                  {playernb.nbtables +
                    " tables with " +
                    playernb._id +
                    "players"}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        <Typography>{"Tables by games"}</Typography>
        <List dense={true}>
          {select.adminStats.tablesbygames.map((gamesnb) => {
            return (
              <ListItem key={"gamesnb-" + gamesnb._id}>
                <Typography>
                  {gamesnb.nbtables + " tables with " + gamesnb._id + " games "}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
