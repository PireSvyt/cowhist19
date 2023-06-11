import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Shared
import Appbar from "../../shared/components/Appbar/Appbar.js";

export default function About() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("About");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box>
      <Appbar route="about" title={t("generic.label.about")} />
      <Box sx={{ height: 48 }} />

      <Accordion sx={{ mt: 2}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>About CoWhist19© app</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>CoWhist19© is a free webapp enabling everyone to play Whist card game with closed circles, by storing game outcomes, providing history and analytics.</Typography>
            <Typography>The product is currently at the minimum value proposition / minimum viable product (MVP) stage and minimum viable experience (MVE) is in progress to reach an official launch.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>About the motivations</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography sx={{ whiteSpace: "pre-line" }}>
* Personal learning opportunity about web product development practices and challenges
* Sharing opportunity for others willing to setup a web product offer to get inspired, eventually to learn and to not replicate mistakes
* Answering a concrete user need which friends and I benefit from
</Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>Note that this project for sure exposes biases, mistakes and space for improvement. \nTherefore, as long as constructive and aligned with the motivations, feedback and suggestions are more than welcome about any aspect.</Typography>
            <Link href={"https://chambray-pyjama-98f.notion.site/CoWhist19-32b3bcfb5a744b698c32c9d34b3c36f2"} 
                target="_blank" rel="noreferrer">CoWhist19© project open documentation</Link>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>About the author</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>It would be erroneous to literally speak about a team as well as to claim doing this on my own.
* I mostly do the hand work on my own writing this documentation, performing the analysis, designing the experience, prioritizing functionalities and coding
* But I as well recieve support and advices from friends only multiple fronts including technology choices, web architecture and implementation, communication and much more! I thank all contributors and supporters without whom this project would be taste-less</Typography>
            <Typography>Know more about me with my LinkedIn profile:</Typography>
            <Link href={"www.linkedin.com/in/pierresavoyat"} target="_blank" rel="noreferrer">SAVOYAT Pierre LinkedIn profile</Link>
        </AccordionDetails>
      </Accordion>

    </Box>
  );
}
