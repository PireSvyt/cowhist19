import React from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, List, ListItem } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Services
import serviceGetTablesByPlayers from "./services/serviceGetTablesByPlayers.js";
import serviceGetTablesByGames from "./services/serviceGetTablesByGames.js";
import serviceGetUsersByStatus from "./services/serviceGetUsersByStatus.js";
import serviceGetObjectCount from "./services/serviceGetObjectCount.js";

export default function AdminStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminStats");
  }

  // Selects
  const select = {
    priviledges: useSelector((state) => state.sliceUserDetails.priviledges),
    statsLoaded: useSelector((state) => state.sliceAdminStats.loaded),
    stats: useSelector((state) => state.sliceAdminStats.stats),
    statsState: useSelector((state) => state.sliceAdminStats.state),
  };

  // Load at opening
  if (select.priviledges.includes("admin")) {
    if (
      select.statsLoaded.objectcount === false &&
      select.statsState === "available"
    ) {
      serviceGetObjectCount();
    }
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
        <Typography variant="h5" gutterBottom>
          {"Current stats"}
        </Typography>

        <Typography variant="h6" >{"Object breakdown"}</Typography>
        {select.statsLoaded.objectcount ? (
          <List dense={true}>
            <ListItem key={"object-users"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Users (" + select.stats.objectcount.users + ")"}</Typography>
                <Typography>{(206 * select.stats.objectcount.users / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-tables"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Tables (" + select.stats.objectcount.tables + ")"}</Typography>
                <Typography>{(286 * select.stats.objectcount.tables / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-games"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Games (" + select.stats.objectcount.games + ")"}</Typography>
                <Typography>{(361 * select.stats.objectcount.games / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-feedbacks"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Feedbacks (" + select.stats.objectcount.feedbacks + ")"}</Typography>
                <Typography>{(197 * select.stats.objectcount.feedbacks / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-total"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Total"}</Typography>
                <Typography>{((
                  206 * select.stats.objectcount.users 
                  + 286 * select.stats.objectcount.tables 
                  + 361 * select.stats.objectcount.games 
                  + 197 * select.stats.objectcount.feedbacks ) 
                  / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-available"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography>{"Available"}</Typography>
                <Typography>{(512000 - (
                  206 * select.stats.objectcount.users 
                  + 286 * select.stats.objectcount.tables 
                  + 361 * select.stats.objectcount.games 
                  + 197 * select.stats.objectcount.feedbacks ) 
                  / 1000).toFixed(1) + " KB"}</Typography>
              </Box>
            </ListItem>
            <ListItem key={"object-consumption"}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Typography sx={{fontWeight: 'bold'}}>{"Consumption"}</Typography>
                <Typography sx={{fontWeight: 'bold'}}>{((
                  206 * select.stats.objectcount.users 
                  + 286 * select.stats.objectcount.tables 
                  + 361 * select.stats.objectcount.games 
                  + 197 * select.stats.objectcount.feedbacks ) 
                  / 1000 / 512000 * 100).toFixed(1) + "%"}</Typography>
              </Box>
            </ListItem>
            </List>
        ) : (null)}

        <Typography variant="h6" >{"Users by status"}</Typography>
        <List dense={true}>
          {select.stats.usersbystatus.map((status) => {
            return (
              <ListItem key={"status-" + status._id}>
                <Typography>{status.nbusers + " " + status._id}</Typography>
              </ListItem>
            );
          })}
        </List>

        <Typography variant="h6" >{"Tables by players"}</Typography>
        <List dense={true}>
          {select.stats.tablesbyplayers.map((playernb) => {
            return (
              <ListItem key={"playernb-" + playernb._id}>
                <Typography>
                  {playernb.nbtables +
                    " with " +
                    playernb._id +
                    " players"}
                </Typography>
              </ListItem>
            );
          })}
        </List>

        <Typography variant="h6" >{"Tables by games"}</Typography>
        <List dense={true}>
          {select.stats.tablesbygames.map((gamesnb) => {
            return (
              <ListItem key={"gamesnb-" + gamesnb._id}>
                <Typography>
                  {gamesnb.nbtables + " with " + gamesnb._id + " games "}
                </Typography>
              </ListItem>
            );
          })}
        </List>
    </Box>
  );
}
