import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Typography,
} from "@mui/material";

export default function Card(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("Card " + props.feedback._id);
  }
  // i18n
  const { t } = useTranslation();
  
  function stringifyDate() {
    let date = new Date(props.feedback.date);
    return date.toLocaleString("fr-FR");
    //{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
            <Typography gutterBottom >{props.feedback.source}</Typography>
            <Typography variant="caption">{props.feedback.status}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
            <Typography gutterBottom>{props.feedback.tag}</Typography>
            <Typography variant="caption">{stringifyDate()}</Typography>

        </Box>
        {props.feedback.text !== undefined ? (
            <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
              <Typography variant="caption">{props.feedback.text}</Typography>
          </Box>
        ) : (null)}
      </Card>
    );
}
