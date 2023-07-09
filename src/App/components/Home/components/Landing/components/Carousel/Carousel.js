import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {
  Box, IconButton 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

export default function Carousel() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    //console.log("Carousel");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 320;
  const componentWidth = window.innerWidth - 10;
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

  // Content

  // Changes
  const changes = {
    select: (newProgress) => {
        setProgress(newProgress);
    },
    hold: (e) => {
    },
  };

  /**
   * Progress at bottom
   * Swipable
   * Pictures
   * Catch phrases
   */

  // Render
  return (
    <Box 
    sx={{ mt: 1, mb: 3 }}
    >
        <Box 
        sx={{
            height: componentHeight,
            backgroundColor: 'primary.dark',
            mb: 2
        }}
        >
            {progress}
        </Box> 

        <Stepper progress={progress} select={changes.select} />
    </Box>
  );
}

function Stepper(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Stepper");
    }

    // Constants
    const radius = 7.5
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: radius*2,
        width: Math.min(window.innerWidth / 2, 200),
        borderRadius: radius,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[200],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: radius,
          backgroundColor: 'primary',
        },
    }));
    
    // State
    const [displayedItems, setDisplayedItems] = useState([]);
    useEffect(() => {
        let comingItems = []
        items.forEach(item => {
            if (item.type === "progress") {
                //console.log("TransitionGroup.progress")
                comingItems.push(item)
            } else {
                //console.log("item  item.hidden.from ", item.hidden.from, " item.hidden.to ", item.hidden.to, " props.progress ", props.progress)
                if ( item.hidden.from <= props.progress && props.progress < item.hidden.to) {
                    //console.log("TransitionGroup.null")
                } else {
                    //console.log("TransitionGroup.button")
                    comingItems.push(item)
                }  
            }
        })
        //console.log("comingItems", comingItems)
        setDisplayedItems(comingItems)
    }, [props.progress]);

    // Components
    let items = [
        {
            type: "button",
            hidden: {
                from: -1,
                to: 2
            },
            onclick: -2
        },
        {
            type: "button",
            hidden: {
                from: -1,
                to: 1
            },
            onclick: -1
        },
        {
            type: "progress"
        },
        {
            type: "button",
            hidden: {
                from: 2,
                to: 4
            },
            onclick: +1
        },
        {
            type: "button",
            hidden: {
                from: 1,
                to: 4
            },
            onclick: +2
        }
    ]
    
    // Render
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                    {displayedItems.map(item => {
                        if (item.type === "progress") {
                            return (
                                <BorderLinearProgress 
                                    variant="determinate" 
                                    value={(props.progress - Math.trunc(props.progress))*100} 
                                    sx={{ml:radius+"px", mr:radius+"px"}}
                                />
                            )
                        } else {
                            return (    
                                <Box sx={{m:"0px"}} >
                                    <IconButton 
                                        size="small"
                                        onClick={() => props.select(Math.floor(props.progress + item.onclick) % 3)}
                                        color="primary"
                                    >
                                        <CircleIcon fontSize="inherit" />
                                    </IconButton>
                                </Box>
                            )
                            
                        }
                    })}
            </Box>
        </Box>
    );
  }
  
  