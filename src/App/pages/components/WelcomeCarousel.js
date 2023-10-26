import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

// Carousel
// https://github.com/maxmarinich/react-alice-carousel
import AliceCarousel from "react-alice-carousel";
//import "react-alice-carousel/lib/alice-carousel.css";
import "../styles/AliceCarousel.css";

import EasyImage from "../../resources/easybro.gif";
import TableImage from "../../resources/Table.png";
import AnalyticsImage from "../../resources/Analytics.png";

export default function WelcomeCarousel() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("WelcomeCarousel");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 310;

  const items = [
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel1")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Analytics"
        src={AnalyticsImage}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel2")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Table"
        src={TableImage}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography sx={{ whiteSpace: "pre-line" }}>
        {t("home.label.carousel3")}
      </Typography>
      <Box
        component="img"
        sx={{
          maxHeight: componentHeight * 0.75,
          maxWidth: window.innerWidth * 0.8,
        }}
        alt="Easy bro"
        src={EasyImage}
      />
      <Typography sx={{ whiteSpace: "pre-line" }}>{""}</Typography>
    </Box>,
  ];

  // Carousel parameters
  const responsive = {
    0: { items: 1 },
    1024: { items: 3 },
  };

  // Render
  return (
    <Box sx={{ mt: 1, mb: 3 }}>
      <AliceCarousel
        autoPlay
        autoPlayControls={false}
        autoPlayStrategy="none"
        autoPlayInterval={7000}
        animationDuration={500}
        infinite
        touchTracking
        disableButtonsControls
        items={items}
      />
    </Box>
  );
}

/*
OLDER HANDMADE ATTEMPT

import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
  Box, IconButton 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

// Components
import Stepper from "./components/Stepper/Stepper";

export default function Carousel() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("Carousel");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 310;
  const timeLaps = 6 // seconds
  const timeIncrements = 50 // milli seconds

  // State
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
        if (progress + (timeIncrements / (timeLaps * 1000)) % 3 > 3) {
            setProgress(0);
        } else {
            setProgress(progress + (timeIncrements / (timeLaps * 1000)) % 3 );
        }
    }, timeIncrements);
    return () => clearTimeout(timeout);
  }, [progress]);

  // Changes
  const changes = {
    select: (newProgress) => {
        setProgress(newProgress);
    },
    hold: (e) => {
    },
  };

  // Render
  return (
    <Box 
    sx={{ mt: 1, mb: 3 }}
    >
        <Box 
            sx={{
                height: componentHeight,
                mb: 2
            }}
        >
            <Box
                component="img"
                sx={{
                    maxWidth: window.innerWidth - 20,
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
            />
        </Box> 

        <Stepper progress={progress} select={changes.select} />
    </Box>
  );

}
*/
