import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Paper, Button, Typography, Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import Appbar from '../_shared/Appbar/Appbar.js'
// Reducers
import appStore from '../_store/appStore.js'

export default function Account() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('Account')
    }
    // i18n
    const { t } = useTranslation()

    // Selects
    const select = {
        authLoaded: useSelector((state) => state.authSlice.loaded),
        signedin: useSelector((state) => state.authSlice.signedin),
        userState: useSelector((state) => state.userSlice.state),
        login: useSelector((state) => state.userSlice.login),
        pseudo: useSelector((state) => state.userSlice.pseudo),
    }

    // Changes
    const toComePayload = {
        title: 'feedback.label.tocome',
        contents: [
            {
                type: 'typography',
                variant: 'h6',
                text: 'feedback.label.tocomeintro',
                gutterbottom: true,
                sx: {
                    whiteSpace: 'pre-line',
                },
            },
            {
                type: 'typography',
                text: 'feedback.label.tocomedetails',
                gutterbottom: true,
                sx: {
                    whiteSpace: 'pre-line',
                },
            },
            {
                type: 'typography',
                variant: 'caption',
                text: 'feedback.label.addmessage',
                gutterbottom: true,
                sx: {
                    whiteSpace: 'pre-line',
                },
            },
        ],
        inputs: {
            source: 'teaser',
            tag: '',
            text: '',
        },
    }
    const changes = {
        changepassword: () => {
            appStore.dispatch({
                type: 'sliceChangePasswordModal/open',
            })
        },
        feedback_changepseudo: () => {
            let payload = toComePayload
            payload.inputs.tag = 'changepseudo'
            appStore.dispatch({
                type: 'feedbackModalSlice/change',
                payload: payload,
            })
        },
        feedback_changeemail: () => {
            let payload = toComePayload
            payload.inputs.tag = 'changeemail'
            appStore.dispatch({
                type: 'feedbackModalSlice/change',
                payload: payload,
            })
        },
        feedback_mergeaccounts: () => {
            let payload = toComePayload
            payload.inputs.tag = 'mergeaccounts'
            appStore.dispatch({
                type: 'feedbackModalSlice/change',
                payload: payload,
            })
        },
        feedback_anonymizeaccount: () => {
            let payload = toComePayload
            payload.inputs.tag = 'anonymizeaccount'
            appStore.dispatch({
                type: 'feedbackModalSlice/change',
                payload: payload,
            })
        },
        feedback_closeaccount: () => {
            let payload = toComePayload
            payload.inputs.tag = 'closeaccount'
            appStore.dispatch({
                type: 'feedbackModalSlice/change',
                payload: payload,
            })
        },
    }

    return (
        <Box data-testid="page-account">
            <Appbar route="account" title={t('generic.menu.account')} />
            <Box sx={{ height: 55 }} />
            {select.authLoaded === false ||
            select.userState.details !== 'available' ? (
                <Box sx={{ left: '10%', right: '10%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            ) : !(
                  select.signedin === true &&
                  select.userState.details === 'available'
              ) ? null : (
                <Box
                    component="span"
                    data-testid="page-account#box-account details"
                >
                    <Paper
                        sx={{
                            p: 2,
                            g: 2,
                            m: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                {t('account.label.mydata')}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.mypseudo')}
                            </Typography>
                            <Box textAlign="center">
                                <Typography variant="body1" gutterBottom>
                                    {select.pseudo}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.feedback_changepseudo}
                                    data-testid="box-account details#button-change pseudo"
                                >
                                    {t('account.button.changepseudo')}
                                </Button>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.myemail')}
                            </Typography>
                            <Box textAlign="center">
                                <Typography variant="body1" gutterBottom>
                                    {select.login}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.feedback_changeemail}
                                    data-testid="box-account details#button-change email"
                                >
                                    {t('account.button.changeemail')}
                                </Button>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.mypassword')}
                            </Typography>
                            <Box textAlign="center">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.changepassword}
                                    data-testid="box-account details#button-change password"
                                >
                                    {t('account.button.changepassword')}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            g: 2,
                            m: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                {t('account.label.myaccount')}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.merge')}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {t('account.label.mergedetails')}
                            </Typography>
                            <Box textAlign="center">
                                <Button
                                    color="error"
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.feedback_mergeaccounts}
                                    data-testid="box-account details#button-merge accounts"
                                >
                                    {t('account.button.merge')}
                                </Button>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.anonymize')}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {t('account.label.anonymizedetails')}
                            </Typography>
                            <Box textAlign="center">
                                <Button
                                    color="error"
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.feedback_anonymizeaccount}
                                    data-testid="box-account details#button-anonymize account"
                                >
                                    {t('account.button.anonymize')}
                                </Button>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    pt: 1,
                                }}
                            >
                                {t('account.label.close')}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {t('account.label.closedetails')}
                            </Typography>
                            <Box textAlign="center">
                                <Button
                                    color="error"
                                    variant="outlined"
                                    sx={{
                                        width: '80%',
                                        m: 1,
                                    }}
                                    onClick={changes.feedback_closeaccount}
                                    data-testid="box-account details#button-close account"
                                >
                                    {t('account.button.close')}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>

                    {select.openChangePasswordModal ? (
                        <ChangePasswordModal />
                    ) : null}
                </Box>
            )}
        </Box>
    )
}
