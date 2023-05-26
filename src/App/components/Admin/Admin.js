import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Components
// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";
import Snack from "../../shared/components/Snack/Snack2.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function Admin() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Admin");
  }

  // Selects
  const select = {
    authLoaded: useSelector((state) => state.sliceUserAuth.loaded),
    signedin: useSelector((state) => state.sliceUserAuth.signedin),
    privileges: useSelector((state) => state.sliceUserDetails.privileges),
  };

  return (
    <Box>
      <Appbar route="admin" title={"ADMIN"} />
      <Box sx={{ height: 48 }} />
      {select.authLoaded === false ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.signedin === false ? null : (
        <Box></Box>
      )}
      <Snack data-testid="componentSnack" data={select.snackData} />
    </Box>
  );
}
