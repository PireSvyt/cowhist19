import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

// Services
import servicePopulate from "./services/servicePopulate.js";

export default function AdminActions() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminActions");
  }

  return (
    <Box>
      <Paper sx={{ p: 2, g: 2, m: 2 }}>
        <Typography variant="h5" gutterBottom>
          {"Actions"}
        </Typography>
        <Button
                  color="error"
          variant="outlined"
          sx={{
            width: "80%",
            m: 1,
          }}
          onClick={() => servicePopulate()}
        >
          {"Populate DB"}
        </Button>
      </Paper>
    </Box>
  );
}
