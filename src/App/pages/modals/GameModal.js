import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Slider,
  Select,
  Autocomplete,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// Components
import ContractCard from "../components/ContractCard.js";
// Services
import { serviceGameCreate } from "../../services/game/game.services.js";
import { random_id } from "../../services/_miscelaneous/toolkit.js";
// Reducers
import appStore from "../../store/appStore.js";

export default function GameModal() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("GameModal");
  }
  // i18n
  const { t } = useTranslation();

  // Constants
  const componentHeight = window.innerHeight - 115;

  // Selects
  const select = {
    open: useSelector((state) => state.gameModalSlice.open),
    gameId: useSelector((state) => state.gameModalSlice.id),
    gameContracts: useSelector((state) => state.gameModalSlice.contracts),
    disabled: useSelector((state) => state.gameModalSlice.disabled),
    loading: useSelector((state) => state.gameModalSlice.loading),
    players: useSelector((state) => state.tableSlice.players),
    contracts: useSelector((state) => state.tableSlice.contracts),
  };
  let c = -1

  // Changes
  const changes = {
    save: () => {
      serviceGameCreate()
    },
    close: () => {
      appStore.dispatch({ type: "gameModalSlice/close" });
    }
  };

  return (
    <Box>
      <Dialog
        data-testid="modal-game"
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
      >
        <DialogTitle>{t("game.label.title")}</DialogTitle>
        <DialogContent
          sx={{
            height: componentHeight,
          }}
        >
          {select.gameContracts.map((contract) => { 
            c += 1
            return(
              <ContractCard 
                key={random_id()} 
                contractid={c} 
                contract={contract}
                players={select.players} 
                contracts={select.contracts}
              />
            )}
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={changes.close}
            data-testid="modal-game-button-cancel"
          >
            {t("generic.button.close")}
          </Button>
          <LoadingButton
            data-testid="modal-game-button-save"
            variant="contained"
            onClick={changes.save}
            disabled={select.disabled}
            loading={select.loading}
          >
            {t("generic.button.save")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
