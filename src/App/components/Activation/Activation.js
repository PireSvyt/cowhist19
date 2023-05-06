import React from "react";
import { withTranslation } from "react-i18next";
import { Box, Typography, Button, CircularProgress  } from "@mui/material";

// Components

// Services
import apiActivate from "./services/apiActivate";

// Shared
import Appbar from "../../shared/components/Appbar/Appbar";

class Activation extends React.Component {
  constructor(props) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.constructor");
    }
    super(props);
    this.state = {
      status: ""
    };

    // Helpers
    this.activateAccount = this.activateAccount.bind(this)

    // Handles
    this.handleAppbarCallback = this.handleAppbarCallback.bind(this)
  }
  render() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.render");
    }
    // i18n
    const { t } = this.props;

    return (<Box>
        <Appbar
          signedin={this.props.signedin}
          callback={this.handleAppbarCallback}
          token={this.props.token}
          route="activation"
          title={t("generic-product-title")}
        />
        
        <Box hidden={this.state.status !== ""} sx={{ m: 2 }}>
          <Typography variant="h6" component="span">
            {t("activation-label-inprogress")}
          </Typography>
          <CircularProgress />
        </Box>
      
        <Box hidden={this.state.status !== "activated"} sx={{ m: 2 }}>
          <Typography variant="h6" component="span">
            {t("activation-label-activatedtitle")}
          </Typography>
          <Typography variant="body1" component="span">
            {t("activation-label-activatedaccountexplanations")}
          </Typography>
          <Button
            variant="outlined"
            sx={{ width: "80%", m: 1 }}
            onClick={() => {window.location = "/";}}
          >
            {t("activation-button-tohome")}
          </Button>
        </Box>
      
        <Box hidden={this.state.status !== "notfound"} sx={{ m: 2 }}>
          <Typography variant="h6" component="span">
            {t("activation-label-notfoundtitle")}
          </Typography>
          <Typography variant="body1" component="span">
            {t("activation-label-notfoundaccountexplanations")}
          </Typography>          
        </Box>
      
    </Box>)
  }
  componentDidMount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      //console.log("Activation.componentDidMount");
    }
    this.activateAccount();
  }

  // Helpers
  activateAccount() {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.activateAccount ");
    }
      let regToken = window.location.href.split("/activation/")[1];
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation regToken " + regToken);
    }      
      apiActivate(regToken).then((data) => {
        this.setState((prevState, props) => ({
          status: data.status,
        }));
      });
  }

  // Handles
  handleAppbarCallback(action, details) {
    if (process.env.REACT_APP_DEBUG === "TRUE") {
      console.log("Activation.handleTableCallback " + action);
    }
    switch (action) {
      default:
    }
  }
  
}

export default withTranslation()(Activation);
