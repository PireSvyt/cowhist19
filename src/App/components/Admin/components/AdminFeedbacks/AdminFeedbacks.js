import React, {useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Services
import serviceGetFeedbacks from "./services/serviceGetFeedbacks.js";
// Components
import FeedbackCard from "./components/FeedbackCard/FeedbackCard.js";
import { random_id } from "../../../../shared/services/toolkit.js";

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
  function structureFeedbacks () {
    let structuredFeedbackDict = {}
    select.feedbacks.forEach(feedback => {
        if (feedback.type !== "open" && feedback.status === "open") {
            // Create key
            if (structuredFeedbackDict[feedback.source] === undefined) {
                structuredFeedbackDict[feedback.source] = {
                    source: feedback.source,
                    tag: feedback.tag,
                    count: 0,
                    messages: []
                }
            }
            // Account for feedback
            structuredFeedbackDict[feedback.source].count += 1
            structuredFeedbackDict[feedback.source].messages.push({
                date: feedback.date,
                text: feedback.text
            })
        }
    });
    // Sort by count
    let structuredFeedbackTemp = Object.values(structuredFeedbackDict)
    structuredFeedbackTemp.sort((a,b) => {return a.count - b.count})
    // Update structure
    setStructuredFeedback(structuredFeedbackTemp)
    console.log(structuredFeedbackTemp)
  }

  return (
    <Box>
      <Paper sx={{ p: 2, g: 2, m: 2 }}>
        <Typography variant="h5" gutterBottom>
          {"Current feedbacks"}
        </Typography>
        
        <Typography>{"Structured feedbacks"}</Typography>
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
                                    <Typography variant="caption" >{message.date}</Typography>
                                    <Typography variant="body2" >{message.text}</Typography>
                                </ListItem>
                            );
                        })}
                    </List>
                </AccordionDetails>
                </Accordion>
            )
        })}

        <Typography sx={{mt: 1}}>{"Open feedbacks"}</Typography>
        <List dense={true}>
          {select.feedbacks.map((feedback) => {
            if (feedback.type === "open") {
                return (
                    <ListItem key={"feedback-" + feedback._id}>
                        <FeedbackCard feedback={feedback} />
                    </ListItem>
                );
            } else {
                return null
            }
          })}
        </List>
      </Paper>
    </Box>
  );
}
