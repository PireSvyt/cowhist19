import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

// Services
import servicePopulate from "./servicePopulate.js";

export default function AdminActions() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminActions");
  }

  return (      
    <Box> 
        <Typography variant="h5" gutterBottom>
          {"Actions"}
        </Typography>
        
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
      </Box>        
    </Box>
  );
}
