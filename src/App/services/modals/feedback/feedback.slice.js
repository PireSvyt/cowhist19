import { createSlice } from "@reduxjs/toolkit";

const feedbackModalSlice = createSlice({
  name: "feedbackModalSlice",
  initialState: {
    open: false,
    title: "",
    contents: [],
    inputs: {
        text: "",
        source: "",
        tag: "",
        consent: false
    },
    errors: {
        text: false,
        consent: false,
    },
    disabled: false,
    loading: false,
  },
  reducers: {
    change: (state, action) => {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("feedbackModalSlice.change");
            //console.log(action.payload);
        }
        if (action.payload.open !== undefined) {
            state.open = action.payload.open;
        } else {
            state.open = true
        }
        // Title
        if (action.payload.title !== undefined) {
            state.title = action.payload.title;
        }
        // Contents
        if (action.payload.contents !== undefined) {
            state.contents = action.payload.contents;
        }
        // Inputs
        if (action.payload.inputs !== undefined) {
            if (action.payload.inputs.text !== undefined) {
                state.inputs.text = action.payload.inputs.text;
            }
            if (action.payload.inputs.source !== undefined) {
                state.inputs.source = action.payload.inputs.source;
            }
            if (action.payload.inputs.tag !== undefined) {
                state.inputs.tag = action.payload.inputs.tag;
            }
            if (action.payload.inputs.consent !== undefined) {
                state.inputs.consent = action.payload.inputs.consent;
            }
        }
        // Errors
        if (action.payload.errors !== undefined) {
            if (action.payload.errors.text !== undefined) {
                state.errors.text = action.payload.errors.text;
            }
            if (action.payload.errors.consent !== undefined) {
                state.errors.consent = action.payload.errors.consent;
            }
        }
        // Lock
        if (action.payload.disabled !== undefined) {
            state.disabled = action.payload.disabled;
        }
        if (action.payload.loading !== undefined) {
            state.loading = action.payload.loading;
        }
    },
    close: (state) => {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("feedbackModalSlice.close");
        }
        state.open = false;
        state.title = "";
        state.contents = [];
        state.inputs = {
            text: "",
            source: "",
            tag: "",
            consent: false
        };
        state.errors = {
            text: false,
            consent: false,
        };
        state.disabled = false;
        state.loading = false;
    },
    lock: (state, action) => {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("feedbackModalSlice.lock");
            //console.log(action.payload);
        }
        state.disabled = true;
        state.loading = true;
    },
  },
});

export default feedbackModalSlice.reducer;