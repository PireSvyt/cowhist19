import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Typography,
} from '@mui/material'

export default function ConfirmModal(props) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('ConfirmModal')
    }
    // i18n
    const { t } = useTranslation()

    // State
    const [open, setOpen] = useState(props.open)

    // Effects
    React.useEffect(() => {
        if (props.open !== undefined) {
            setOpen(props.open)
        }
    }, [props])

    let c = -1

    return (
        <Box>
            <Dialog
                data-testid="modal-confirm"
                open={open}
                onClose={() => props.callback('close')}
                fullWidth={true}
            >
                <DialogTitle>{t(props.data.title)}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <Typography sx={{ whiteSpace: 'pre-line' }}>
                            {t(props.data.content)}
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions
                    data-testid={'modal-confirm#list-call to actions'}
                >
                    {props.data.callToActions.map((cta) => {
                        c += 1
                        return (
                            <Button
                                data-testid={
                                    'list-call to actions#listitem-' + c
                                }
                                key={cta.label}
                                onClick={() => props.callback(cta.choice)}
                                color={
                                    cta.color === undefined
                                        ? 'primary'
                                        : cta.color
                                }
                                variant={
                                    cta.variant === undefined
                                        ? 'text'
                                        : cta.variant
                                }
                            >
                                {t(cta.label)}
                            </Button>
                        )
                    })}
                </DialogActions>
            </Dialog>
        </Box>
    )
}
