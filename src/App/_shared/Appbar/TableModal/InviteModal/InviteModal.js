import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    Button,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

// Services
import { serviceUserInvite } from '../../../_services/user/user.services.js'
// Reducers
import appStore from '../../../../_store/appStore.js'

export default function InviteModal() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('InviteModal')
    }
    // i18n
    const { t } = useTranslation()

    // Selects
    const select = {
        open: useSelector((state) => state.inviteModalSlice.open),
        inputs: useSelector((state) => state.inviteModalSlice.inputs),
        errors: useSelector((state) => state.inviteModalSlice.errors),
        disabled: useSelector((state) => state.inviteModalSlice.disabled),
        loading: useSelector((state) => state.inviteModalSlice.loading),
    }

    // Changes
    const changes = {
        pseudo: (e) => {
            appStore.dispatch({
                type: 'inviteModalSlice/change',
                payload: {
                    inputs: { pseudo: e.target.value },
                    errors: { pseudo: false },
                },
            })
        },
        login: (e) => {
            appStore.dispatch({
                type: 'inviteModalSlice/change',
                payload: {
                    inputs: { login: e.target.value },
                    errors: { login: false },
                },
            })
        },
        acknowledgement: (e) => {
            appStore.dispatch({
                type: 'inviteModalSlice/change',
                payload: {
                    inputs: { acknowledgement: e.target.checked },
                    errors: { acknowledgement: false },
                },
            })
        },
        invite: () => {
            console.log(
                'InviteModal.invite',
                appStore.getState().inviteModalSlice
            )
            serviceUserInvite()
        },
        close: () => {
            appStore.dispatch({ type: 'inviteModalSlice/close' })
        },
    }

    // Constants
    const componentHeight = window.innerHeight - 115

    return (
        <Box>
            <Dialog
                id="dialog_invite"
                open={select.open}
                onClose={changes.close}
                fullWidth={true}
                data-testid="modal-invite"
            >
                <DialogTitle>{t('invite.label.title')}</DialogTitle>
                <DialogContent
                    sx={{
                        height: componentHeight,
                    }}
                >
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <TextField
                            name="pseudo"
                            label={t('generic.input.pseudo')}
                            variant="standard"
                            value={select.inputs.pseudo || ''}
                            onChange={changes.pseudo}
                            autoComplete="off"
                            sx={{ mb: 1 }}
                            required
                            error={select.errors.pseudo}
                            data-testid="modal-invite#input-pseudo"
                        />
                        <TextField
                            name="login"
                            label={t('generic.input.email')}
                            variant="standard"
                            value={select.inputs.login || ''}
                            onChange={changes.login}
                            autoComplete="off"
                            sx={{ mb: 1 }}
                            required
                            error={select.errors.login}
                            data-testid="modal-invite#input-login"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="acknowledgement"
                                    checked={select.inputs.acknowledgement}
                                    onChange={changes.acknowledgement}
                                    required
                                />
                            }
                            label={t('invite.input.acknowledgement')}
                            error={select.errors.acknowledgement}
                            data-testid="modal-invite#checkbox-acknowledgement"
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={changes.close}
                        data-testid="modal-invite#button-cancel"
                    >
                        {t('generic.button.cancel')}
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={changes.invite}
                        disabled={select.disabled}
                        loading={select.loading}
                        data-testid="modal-invite#button-invite"
                    >
                        {t('invite.button.invite')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
