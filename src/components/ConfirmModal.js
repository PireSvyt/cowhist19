import * as React from "react";
import { withTranslation } from "react-i18next";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@mui/material";

class ConfirmModal extends React.Component {
    constructor(props) {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("ConfirmModal.constructor");
        }
        super(props);
        this.state = {
        };

        // Handles
        this.handleClose = this.handleClose.bind(this);
    }
    render() {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
        console.log("ConfirmModal.render");
        }
        // i18n
        const { t } = this.props;

        return (
        <Box>
            <Dialog
            id="dialog_confirm"
            open={this.props.open}
            onClose={this.handleClose}
            fullWidth={true}
            >
                <DialogTitle>{t(this.props.title)}</DialogTitle>
                
                <DialogContent>
                    <DialogContentText >
                        <Typography sx={{ whiteSpace: "pre-line" }}>
                            {t(this.props.content)}
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    {this.props.callToActions.map((cta) => (
                        <Button key={cta.label}
                            onClick={cta.callback}
                            color={cta.color === undefined ? "primary" : cta.color}
                            variant={cta.variant === undefined ? "text" : cta.variant}
                        >
                            {t(cta.label)}
                            </Button>
                        ))
                    }
                </DialogActions>

            </Dialog>
        </Box>
        );
    }

    // Handles
    handleClose() {
        if (process.env.REACT_APP_DEBUG === "TRUE") {
            console.log("ConfirmModal.handleClose");
        }
        this.props.callback("close");
    }
}

export default withTranslation()(ConfirmModal);
