import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

// Carousel
// https://github.com/maxmarinich/react-alice-carousel
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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
  const componentHeight = window.innerHeight - 330;

  const items = [
    <Box
      sx={{
        height: componentHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      data-testid="component-carousel-box-page 1" 
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
      data-testid="component-carousel-box-page 2" 
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
      data-testid="component-carousel-box-page 3" 
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
        data-testid="component-carousel" 
      />
    </Box>
  );
}
