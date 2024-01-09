import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

// Services
import { random_id } from "../../services/_miscelaneous/toolkit.js";
import { serviceFeedbackCreate } from "../../services/feedback/feedback.services.js";
// Components
import FeedbackContent from "../components/FeedbackContent";
// Store 
import appStore from "../../store/appStore.js";

export default function FeedbackModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("FeedbackModal");
  }
    // i18n
    const { t } = useTranslation();

    // Selects
    const select = {
        open: useSelector((state) => state.feedbackModalSlice.open),
        title: useSelector((state) => state.feedbackModalSlice.title),
        contents: useSelector((state) => state.feedbackModalSlice.contents),
        inputs: useSelector((state) => state.feedbackModalSlice.inputs),
        errors: useSelector((state) => state.feedbackModalSlice.errors),
        disabled: useSelector((state) => state.feedbackModalSlice.disabled),
    };

    // Changes
    const changes = {
        close: () => { appStore.dispatch({ type: "feedbackModalSlice/close" }) },
        text: (e) => {
            appStore.dispatch({
                type: "feedbackModalSlice/change",
                payload: {
                    inputs: { text: e.target.value },
                    errors: { text: false },
                },
            });
        },
        consent: (e) => {
            appStore.dispatch({
              type: "feedbackModalSlice/change",
              payload: {
                inputs: { consent: e.target.checked },
                errors: { consent: false },
              },
            });
          },
        send: () => { serviceFeedbackCreate() },
    };

    // Constants
    const componentHeight = window.innerHeight - 115;
    
    return (
        <Dialog 
            open={select.open} 
            onClose={changes.close}
            fullWidth={true}
        >
            <DialogTitle>
                {t(select.title)}
            </DialogTitle>
            <DialogContent
                sx={{
                    height: componentHeight,
                }}
            >                
                <Box
                    component="form"
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    }}
                >
                    { select.contents.map((content) => (
                        <FeedbackContent 
                            key={"content-" + random_id()} 
                            content={content} 
                        />
                    )) }

                    <TextField
                        label={t("feedback.input.message")}
                        variant="filled"
                        multiline
                        value={select.inputs.text}
                        onChange={changes.text}
                        error={select.errors.text}
                        sx={{mt:1, mb:1}}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="consent"
                                checked={select.inputs.consent}
                                onChange={changes.consent}
                                required
                            />
                        }
                        label={t("feedback.input.consent")}
                        error={select.errors.consent}
                    />                    
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={changes.close}>
                    {t("generic.button.close")}
                </Button>
                <LoadingButton 
                    onClick={changes.send} 
                    variant="contained"
                    disabled={select.disabled}
                    loading={select.loading}
                >
                    {t("feedback.button.send")}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
