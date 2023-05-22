import React, { useState, useEffect } from "react";
// Reducers
import appStore from "../../store/appStore.js";
// Get services
import getUserDetails from "./services/getUserDetails/getUserDetails.js";

export default function GetManager(props) {
  
  // Constants
  let debug = true
  
  // State
  const [jobs, setJobs] = useState([]);
  const [looping, setLooping] = useState(false);

  // Effects
  useEffect(() => {
    if (props.queue !== undefined) {
      Object.values(props.queue).forEach((pile) => {
        console.log(jobs)
        if (!jobs.some(job => job === pile.id)) {
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
    if (debug) {
      console.log("GetManager.acknowledge " + pile.id)
    }
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
    if (debug) {
      console.log("GetManager fire loop")
    }
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
        let depstate = Function("return " + dependency.getstate)();
    if (debug) {
      console.log(depstate)
    }
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
    if (debug) {
      console.log("GetManager.readytofire " + ready + " " + pile.id)
    }
    return ready;
  }

  function fire(pile) {
    if (debug) {
      console.log("GetManager.fire " + pile.id)
    }
    // Fire a job
    // Status
    appStore.dispatch({
      type: "sliceGetManager/status",
      payload: {
        id: pile.id,
        status: "running",
      },
    });
    // job
    switch (pile.job.service) {
      case "getUserDetails":
        getUserDetails().then(outcome => {
    if (debug) {
      console.log("GetManager.fire done " + pile.id)
    }
    setJobs(jobs.filter(job => job !== pile.id))
          appStore.dispatch({
            type: "sliceGetManager/depile",
            payload: {        id: pile.id      },
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
