import React, {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Services
import serviceGetFeedbacks from "./serviceGetFeedbacks.js";
// Components
import FeedbackCard from "./FeedbackCard/FeedbackCard.js";
import { random_id } from "../../Miscelaneous/toolkit.js"

export default function AdminFeedbacks() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("AdminFeedbacks");
  }

  // Selects
  const select = {
    priviledges: useSelector((state) => state.sliceUserDetails.priviledges),
    loaded: useSelector((state) => state.sliceAdminFeedbacks.loaded),
    state: useSelector((state) => state.sliceAdminFeedbacks.state),
    feedbacks: useSelector((state) => state.sliceAdminFeedbacks.feedbacks),
  };

  // Load at opening
  if (select.priviledges.includes("admin")) {
    if (
      select.loaded === false &&
      select.state === "available"
    ) {
      serviceGetFeedbacks();
    }
  }

  // State
  const [structuredFeedback, setStructuredFeedback] = useState([]);
  useEffect(() => {
    structureFeedbacks()
  }, [select.feedbacks]);
  const [openFeedback, setOpenFeedback] = useState([]);
  useEffect(() => {
    openFeedbacks()
  }, [select.feedbacks]);

  function structureFeedbacks () {
    let structuredFeedbackDict = {}
    select.feedbacks.forEach(feedback => {
        if (feedback.source !== "open" && feedback.status === "open") {
            // Create key
            if (structuredFeedbackDict[feedback.tag] === undefined) {
                structuredFeedbackDict[feedback.tag] = {
                    source: feedback.source,
                    tag: feedback.tag,
                    count: 0,
                    messages: []
                }
            }
            // Account for feedback
            structuredFeedbackDict[feedback.tag].count += 1
            structuredFeedbackDict[feedback.tag].messages.push({
                date: feedback.date,
                text: feedback.text
            })
        }
    });
    // Sort by count
    let structuredFeedbackTemp = Object.values(structuredFeedbackDict)
    structuredFeedbackTemp.sort((a,b) => {return  b.count - a.count})
    // Update structure
    setStructuredFeedback(structuredFeedbackTemp)
  }
  function openFeedbacks () {
    let openFeedbackTemp =select.feedbacks.filter(feedback => feedback.source === "open")
    // Update structure
    setOpenFeedback(openFeedbackTemp)
  }

  // Formating
  function stringifyDate(stringDate) {
    let date = new Date(stringDate);
    return date.toLocaleString("fr-FR");
  }

  return (
    <Box>
        <Typography variant="h5" gutterBottom>
          {"Current feedbacks"}
        </Typography>
        
        <Typography>
          {"Structured feedbacks"}
        </Typography>
        {structuredFeedback.map(feedback => {
            return (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>{feedback.count + " " + feedback.source + " " + feedback.tag}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense={true}>
                        {feedback.messages.map((message) => {
                            return (
                                <ListItem key={"message-" + random_id()}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <Typography variant="caption" >{stringifyDate(message.date)}</Typography>
                                    <Typography variant="body2" >{message.text}</Typography>
                                  </Box>
                                </ListItem>
                            );
                        })}
                    </List>
                </AccordionDetails>
                </Accordion>
            )
        })}

        <Typography sx={{mt: 1}}>
          {"Open feedbacks"}
        </Typography>
        <List dense={true}>
          {openFeedback.map((feedback) => {
            return (
              <ListItem key={"feedback-" + feedback._id}>
                <FeedbackCard feedback={feedback} />
              </ListItem>
            );
          })}
        </List>
    </Box>
  );
}
