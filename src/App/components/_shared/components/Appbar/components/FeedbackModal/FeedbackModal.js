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
import LoadingButton from "@mui/lab/LoadingButton";

// Shared
import { random_id } from "../../../../../../services/_shared/toolkit";
import serviceProceed from "../TableModal/services/serviceProceed";
// Components
import FeedbackContent from "./components/FeedbackContent/FeedbackContent";
// Store 
import appStore from "../../../../../../store/appStore";

export default function FeedbackModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("FeedbackModal");
  }
    // i18n
    const { t } = useTranslation();

    // Selects
    const select = {
        open: useSelector((state) => state.sliceFeedbackModal.open),
        title: useSelector((state) => state.sliceFeedbackModal.title),
        contents: useSelector((state) => state.sliceFeedbackModal.contents),
        inputs: useSelector((state) => state.sliceFeedbackModal.inputs),
        errors: useSelector((state) => state.sliceFeedbackModal.errors),
        disabled: useSelector((state) => state.sliceFeedbackModal.disabled),
    };

    // Changes
    const changes = {
        close: () => { appStore.dispatch({ type: "sliceFeedbackModal/close" }) },
        text: (e) => {
            appStore.dispatch({
                type: "sliceFeedbackModal/change",
                payload: {
                    inputs: { text: e.target.value },
                    errors: { text: false },
                },
            });
        },
        consent: (e) => {
            appStore.dispatch({
              type: "sliceFeedbackModal/change",
              payload: {
                inputs: { consent: e.target.checked },
                errors: { consent: false },
              },
            });
          },
        send: () => { serviceProceed() },
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
                        error={select.errors.text ? "error" : null}
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
                        error={select.errors.consent ? "error" : null}
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