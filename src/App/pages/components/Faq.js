import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Shared
import { random_id } from "../../services/_miscelaneous/toolkit.js";

const Faq = (props) => {
  return (
    <Accordion ref={React.useRef(props.section.ref)} key={random_id()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontSize: Math.max(20 - props.depth * 2, 14) }}>
          {props.section.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.section.details.length === 0
          ? null
          : props.section.details.map((detail) => {
              //console.log(detail);
              switch (detail.type) {
                case "section":
                  return (
                    <Faq
                      section={detail}
                      depth={props.depth + 1}
                      key={random_id()}
                    />
                  );
                  break;
                case "title":
                  return (
                    <Typography
                      variant={"h6"}
                      sx={{ whiteSpace: "pre-line" }}
                      key={random_id()}
                    >
                      {detail.text}
                    </Typography>
                  );
                  break;
                case "statement":
                  return (
                    <Typography
                      gutterBottom
                      sx={{
                        fontStyle: "italic",
                        ml: 1,
                        mr: 1,
                        mb: 2,
                        whiteSpace: "pre-line",
                      }}
                      key={random_id()}
                    >
                      {detail.text}
                    </Typography>
                  );
                  break;
                case "paragraph":
                  return (
                    <Typography
                      gutterBottom
                      sx={{ whiteSpace: "pre-line" }}
                      key={random_id()}
                    >
                      {detail.text}
                    </Typography>
                  );
                  break;
                case "emphasis":
                  return (
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "bold", whiteSpace: "pre-line" }}
                      key={random_id()}
                    >
                      {detail.text}
                    </Typography>
                  );
                  break;
                case "link":
                  return (
                    <Box
                      sx={{
                        typography: "body1",
                        "& > :not(style) + :not(style)": {
                          ml: 2,
                        },
                      }}
                    >
                      <Link href={detail.url} target="_blank" rel="noreferrer">
                        {detail.text}
                      </Link>
                    </Box>
                  );
                  break;
                case "textlist":
                  return (
                    <List dense={true} key={random_id()}>
                      {detail.list.length === 0
                        ? null
                        : detail.list.map((listitem) => {
                            return (
                              <ListItem>
                                <ListItemText
                                  sx={{ whiteSpace: "pre-line" }}
                                  primary={listitem.primary}
                                  secondary={
                                    listitem.secondary !== undefined
                                      ? listitem.secondary
                                      : null
                                  }
                                />
                              </ListItem>
                            );
                          })}
                    </List>
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

export default Faq;
