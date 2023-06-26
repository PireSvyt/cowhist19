import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Typography, Box, Divider  } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

// Service
import serviceGetUserStats from "./services/serviceGetUserStats.js";

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
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="span">
            {t("home.label.mystats")}
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgressWithLabel value={select.stats.rateattack*100 || 0} />
              <Typography
                variant="body1"
                component="span"
                align="center"
              >
                {t("home.label.attack")}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgressWithLabel value={select.stats.ratevictory*100 || 0} />
              <Typography
                variant="body1"
                component="span"
                align="center"
              >
                {t("home.label.victory")}
              </Typography>
            </Box>
          </Box>

          <Box
              sx={{
                mb: 1.5,
                left: "20%", 
                right: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: 'background.paper'
              }}
            >
              <Divider variant="middle" />
              <Typography variant="body1" >
                {select.stats.games + " " + t("home.label.games")}
              </Typography>
            </Box>
        </Box>
      )}
    </Box>
  );
}

function CircularProgressWithLabel(props) {
  return (
    <Box 
      display='flex' 
      justifyContent='center' 
      alignItems='center'
    >
      <CircularProgress 
        variant="determinate" 
        {...props} 
        size={60} 
        thickness={5} 
      />
      <Typography 
        variant="body1" 
        position='absolute'
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
}