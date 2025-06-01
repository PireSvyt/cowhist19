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
import serviceProceed from './_services/serviceProceed.js'
// Reducers
import appStore from '../../../store/appStore.js'

export default function ChangePasswordModal() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('ChangePasswordModal')
    }
    // i18n
    const { t } = useTranslation()

    // Selects
    const select = {
        open: useSelector((state) => state.sliceChangePasswordModal.open),
        inputs: useSelector((state) => state.sliceChangePasswordModal.inputs),
        errors: useSelector((state) => state.sliceChangePasswordModal.errors),
        disabled: useSelector(
            (state) => state.sliceChangePasswordModal.disabled
        ),
        loading: useSelector((state) => state.sliceChangePasswordModal.loading),
    }

    // Changes
    const changes = {
        current: (e) => {
            appStore.dispatch({
                type: 'sliceChangePasswordModal/change',
                payload: {
                    inputs: { current: e.target.value },
                    errors: { current: false },
                },
            })
        },
        new: (e) => {
            appStore.dispatch({
                type: 'sliceChangePasswordModal/change',
                payload: {
                    inputs: { new: e.target.value },
                    errors: { new: false },
                },
            })
        },
        repeat: (e) => {
            appStore.dispatch({
                type: 'sliceChangePasswordModal/change',
                payload: {
                    inputs: { repeat: e.target.value },
                    errors: { repeat: false },
                },
            })
        },
    }

    // Constants
    const componentHeight = window.innerHeight - 115

    return (
        <Box>
            <Dialog
                id="dialog_changepassword"
                open={select.open}
                onClose={() => {
                    appStore.dispatch({
                        type: 'sliceChangePasswordModal/close',
                    })
                }}
                fullWidth={true}
            >
                <DialogTitle>
                    {t('changepassword.label.modaltitle')}
                </DialogTitle>
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
                            name="current"
                            required
                            label={t('changepassword.input.current')}
                            variant="standard"
                            value={select.inputs.current}
                            onChange={changes.current}
                            autoComplete="off"
                            type="password"
                            error={select.errors.current}
                        />
                        <TextField
                            name="new"
                            required
                            label={t('changepassword.input.new')}
                            variant="standard"
                            value={select.inputs.new}
                            onChange={changes.new}
                            autoComplete="off"
                            type="password"
                            error={select.errors.new}
                        />
                        <TextField
                            name="repeat"
                            required
                            label={t('changepassword.input.repeat')}
                            variant="standard"
                            value={select.inputs.repeat || ''}
                            onChange={changes.repeat}
                            autoComplete="off"
                            type="password"
                            error={select.errors.repeat}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            appStore.dispatch({
                                type: 'sliceChangePasswordModal/close',
                            })
                        }}
                    >
                        {t('generic.button.cancel')}
                    </Button>
                    <LoadingButton
                        variant="contained"
                        onClick={serviceProceed}
                        disabled={select.disabled}
                        loading={select.loading}
                    >
                        {t('generic.button.save')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
