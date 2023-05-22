import React, { useState, useEffect } from "react";
// Reducers
import appStore from "../../store/appStore.js";
// Get services
import getUserDetails from "./services/getUserDetails/getUserDetails.js";

export default function GetManager(props) {
  // State
  const [jobs, setJobs] = useState([]);
  const [looping, setLooping] = useState(false);

  // Effects
  useEffect(() => {
    if (props.queue !== undefined) {
      Object.values(props.queue).forEach((pile) => {
        if (!jobs.includes(pile.id)) {
          if (pile.status === "waiting") {
            acknowledge(pile);
          } else {
            // TO CHECK
          }
        }
      });
    }
  }, [props]);

  function acknowledge(pile) {
    setJobs(jobs.push(pile.id));
    appStore.dispatch({
      type: "sliceGetManager/status",
      payload: {
        id: pile.id,
        status: "queuing",
      },
    });
    // Trigger loop
    if (!looping) {
      loop();
    }
  }

  function loop() {
    // Loop while jobs are running
    setLooping(true);
    do {
      setTimeout(function () {
        jobs.forEach((job) => {
          if (props.queue[job].status !== "running") {
            // Check dependencies
            if (readytofire(props.queue[job])) {
              // Fire job
              fire(props.queue[job]);
            }
          }
        });
      }, 100); // every N ms
    } while (looping);
  }

  function readytofire(pile) {
    // Assess dependencies are met
    let ready = true;
    if (pile.dependencies !== undefined) {
      Object.values(pile.dependencies).forEach((dependency) => {
        let depstate = dependency.getstate();
        switch (dependency.condition) {
          case "===":
            ready = depstate === dependency.expectation;
            break;
          case "!==":
            ready = depstate !== dependency.expectation;
            break;
          case "length>":
            ready = depstate.length > dependency.expectation;
            break;
          case "length===":
            ready = depstate.length === dependency.expectation;
            break;
          case "length<":
            ready = depstate.length < dependency.expectation;
            break;
          default:
            console.error("pile.readytofire unmatched " + dependency.condition);
        }
      });
    }
    return ready;
  }

  function fire(pile) {
    // Fire a job
    // Status
    appStore.dispatch({
      type: "sliceGetManager/status",
      payload: {
        id: job,
        status: "running",
      },
    });
    // job
    switch (pile.job) {
      case "getUserDetails":
        getUserDetails().then(outcome => {
          appStore.dispatch({
            type: "sliceGetManager/deplie",
            payload: {        id: job      },
          });
        })
        break;
      default:
        console.error("pile.fire unmatched " + pile.job);
    }
  }

  // Component return
  return null;
}
