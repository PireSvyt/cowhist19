import * as React from "react";
import { withTranslation } from "react-i18next";
import {
  Button,
  Paper,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

class ToComeModal extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ToComeModal.constructor");
    }
    super(props);
    this.state = {};

    // Handles
    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ToComeModal.render");
    }
    // i18n
    const { t } = this.props;

    return (
      <Dialog
        id="dialog_tocome"
        open={this.props.open}
        onClose={this.handleClose}
        fullWidth={true}
      >
        <DialogTitle>{t("tocome-title")}</DialogTitle>
        <DialogContent>
          <Box component="span">
            <Paper
              sx={{
                p: 2,
                g: 2,
                m: 2,
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom>
                  {t("tocome-label-intro")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    pt: 1,
                    whiteSpace: "pre-line",
                  }}
                >
                  {t("tocome-label-explanation")}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>
            {t("generic-button-close")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Handles
  handleClose() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("ToComeModal.handleClose");
    }
    this.props.callback("close");
  }
}

export default withTranslation()(ToComeModal);
