import { createSlice, configureStore } from "@reduxjs/toolkit";
// Services
import { random_id } from "../shared/services/toolkit.js";

const sliceGetManager = createSlice({
  name: "sliceGetManager",
  initialState: {
    queue: {},
  },
  /*
   Queue is a dict of piles
   A pile is an artifact representing an API get request including
      - id - automatically assigned at piling
      - since waiting, queuing and running - automatically assigned at piling
      - status - updated per pile service manager, waiting/queuing/running
      - service to be called
      - dependencies if any
      - subsequent artifact(s) to pile
   */
  reducers: {
    pile: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGetManager.pile");
        //console.log(action.payload);
      }
      Object.values(action.payload.piles).forEach((pile) => {
        if (
          Object.values(state.queue).some((p) => p.service === pile.service)
        ) {
          // Not to be piled
        } else {
          pile.id = random_id();
          pile.status = "waiting";
          pile.since = { waiting: Date.now(), queuing: null, running: null };
          state.queue[pile.id] = pile;
        }
      });
    },
    depile: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGetManager.depile");
        //console.log(action.payload);
      }
      delete state.queue[action.payload.id];
    },
    status: (state, action) => {
      if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("sliceGetManager.status");
        //console.log(action.payload);
      }
      switch (action.payload.status) {
        case "queuing":
          state.queue[action.payload.id].since.queuing = Date.now();
          state.queue[action.payload.id].status = action.payload.status;
          break;
        case "running":
          state.queue[action.payload.id].since.running = Date.now();
          state.queue[action.payload.id].status = action.payload.status;
          break;
        default:
      }
    },
  },
});

export default sliceGetManager.reducer;
