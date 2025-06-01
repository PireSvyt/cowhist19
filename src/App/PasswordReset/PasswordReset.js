import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    TextField,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline.js'

// Services
//import serviceProceed from "./services/serviceProceed.js";
// Shared
import Appbar from '../_shared/Appbar/Appbar.js'
// Reducers
import appStore from '../_store/appStore.js'

export default function PasswordReset() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('PasswordReset')
    }
    // i18n
    const { t } = useTranslation()

    // States
    const [login, setLogin] = useState('')
    const [loginerror, setLoginError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('onhold')

    // Changes
    const changes = {
        login: (e) => {
            setLogin(e.target.value)
            setLoginError(false)
        },
        send: () => {
            setLoading(true)
            /*serviceProceed({
        login: login,
        token: window.location.href.split("/activation/")[1],
      }).then((outcome) => {
        //console.log("outcome", outcome)
        Object.keys(outcome.stateChanges).forEach((c) => {
          //console.log("outcome.stateChanges " + c)
          switch (c) {
            case "login":
              setLogin(outcome.stateChanges[c]);
              break;
            case "loginerror":
              setLoginError(outcome.stateChanges[c]);
              break;
            case "loading":
              setLoading(outcome.stateChanges[c]);
              break;
            case "status":
              setStatus(outcome.stateChanges[c]);
              break;
            case "openSnack":
              if (
                outcome.stateChanges.openSnack &&
                outcome.stateChanges.snack
              ) {
                appStore.dispatch({
                  type: "sliceSnack/change",
                  payload: outcome.stateChanges.snack,
                });
              }
              break;
            default:
            // NA
          }
        });
      });*/
        },
        resend: () => {},
        signin: () => {
            appStore.dispatch({ type: 'sliceSignInModal/open' })
        },
    }

    return (
        <Box>
            <Appbar route="activation" title={t('generic.label.product')} />
            <Box sx={{ height: 80 }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                    variant="body1"
                    component="span"
                    align="center"
                >
                    {t('activation.label.laststep')}
                </Typography>
                <TextField
                    label={t('generic.input.email')}
                    value={login}
                    required
                    onChange={changes.login}
                    error={loginerror}
                    sx={{ mt: 1, mb: 1, width: '80%' }}
                />
                <LoadingButton
                    onClick={changes.send}
                    variant="contained"
                    disabled={loading || status === 'activated'}
                    loading={loading}
                    sx={{ mt: 1, mb: 1, width: '80%' }}
                >
                    {t('activation.button.activate')}
                </LoadingButton>
            </Box>

            {status === 'inprogress' ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{ mt: 2, mb: 1, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('activation.label.inprogress')}
                    </Typography>
                    <CircularProgress sx={{ mt: 1, mb: 1 }} />
                </Box>
            ) : null}

            {status === 'activated' ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{ mt: 2, mb: 1, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('activation.label.activatedtitle')}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ width: '80%', m: 1 }}
                        onClick={changes.signin}
                    >
                        {t('generic.button.signin')}
                    </Button>
                </Box>
            ) : null}

            {status === 'error' ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{ mt: 2, mb: 1, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('activation.label.error')}
                    </Typography>
                    <ErrorOutlineIcon
                        sx={{ mt: 1, mb: 1 }}
                        fontSize="large"
                        color="error"
                    />
                    <Typography
                        sx={{ mt: 1, mb: 1, whiteSpace: 'pre-line' }}
                        variant="body1"
                        component="span"
                        align="center"
                    >
                        {t('activation.label.errorexplanation')}
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{ width: '80%', m: 1 }}
                        onClick={changes.resend}
                        disabled
                    >
                        {t('activation.button.resend')}
                    </Button>
                </Box>
            ) : null}
        </Box>
    )
}
