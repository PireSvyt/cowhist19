import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Shared
import { random_id } from "../../../shared/services/toolkit.js";

const HelpSection = (props) => {
  return (
    <Accordion key={random_id()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontSize: Math.max(20 - props.depth * 2, 14) }}>
          {props.section.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.section.details.length === 0
          ? null
          : props.section.details.map((detail) => {
              switch (detail.type) {
                case "section":
                  return (
                    <HelpSection
                      section={detail}
                      depth={props.depth + 1}
                      key={random_id()}
                    />
                  );
                  break;
                case "title":
                  return (
                    <Typography variant={"h6"} mt={2} key={random_id()}>
                      {detail.text}
                    </Typography>
                  );
                  break;
                case "paragraph":
                  return (
                    <Typography gutterBottom key={random_id()}>
                      {detail.text}
                    </Typography>
                  );
                  break;
                default:
                  null;
              }
            })}
      </AccordionDetails>
    </Accordion>
  );
};

export default HelpSection;
