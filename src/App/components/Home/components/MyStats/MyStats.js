import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Typography, Box, CircularProgress } from "@mui/material";

// Service
import serviceGetUserStats from "./services/serviceGetUserStats.js";
// Reducers
import appStore from "../../../../store/appStore.js";

export default function MyStats() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("MyStats");
  }
  // i18n
  const { t } = useTranslation();

  // Selects
  const select = {
    loadedStats: useSelector((state) => state.sliceUserStats.loaded),
    stats: useSelector((state) => state.sliceUserStats.stats),
  };

  // Load
  if (!select.loadedStats) {
    serviceGetUserStats();
  }

  return (
    <Box>
      {!(select.loadedStats === true) ? (
        <Box sx={{ left: "10%", right: "10%" }}>
          <LinearProgress />
        </Box>
      ) : select.stats.games === 0 ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="h6"
            component="span"
            align="center"
          >
            {t("home.label.nogames")}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
            variant="body1"
            component="span"
            align="center"
          >
            {t("home.label.nogamesstatsexplanation")}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgressWithLabel value={select.stats.rateattack || 0} />
              <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                variant="h5"
                component="span"
                align="center"
              >
                {t("home.label.attack")}
              </Typography>
            </Box>

            <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgressWithLabel value={select.stats.ratevictory || 0} />
              <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                variant="h5"
                component="span"
                align="center"
              >
                {t("home.label.victory")}
              </Typography>
            </Box>
          </Box>

          <Box
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: "pre-line" }}
                variant="h6"
                component="span"
                align="center"
              >
                {select.stats.games + " " + t("home.label.victgamesory")}
              </Typography>
            </Box>
        </Box>
      )}
    </Box>
  );
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}