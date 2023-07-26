import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
import AdminStats from "../../components/Admin/Stats/AdminStats.js";
import AdminActions from "../../Admin/Actions/AdminActions.js";
import AdminFeedbacks from "../../Admin/Feedback/AdminFeedbacks.js";
// Shared
import Appbar from "../Appbar/Appbar.js";

export default function Admin() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Admin");
  }

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    userLoaded: useSelector((state) => state.sliceUserDetails.loaded),
    priviledges: useSelector((state) => state.sliceUserDetails.priviledges),
  };

  return (
    <Box>
      <Appbar route="admin" title={"ADMIN"} />
      <Box sx={{ height: 55 }} />
      {select.authLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? null : (
        <Box>
          {!select.priviledges.includes("admin") ? null : (
            <Box>
              <AdminStats />
              <AdminActions />
              <AdminFeedbacks />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
