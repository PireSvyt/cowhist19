import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import Landing from './Landing/Landing.js'
import MyStats from './MyStats/MyStats.js'
import MyTables from './MyTables/MyTables.js'
// Shared
import Appbar from '../_shared/Appbar/Appbar.js'
import ToComeModal from '../_shared/ToComeModal/ToComeModal.js'

export default function Home() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('Home')
    }
    // i18n
    const { t } = useTranslation()

    // Selects
    const select = {
        loaded: useSelector((state) => state.authSlice.loaded),
        signedin: useSelector((state) => state.authSlice.signedin),
        snackData: useSelector((state) => state.sliceSnack.snackData),
        tocomeData: useSelector((state) => state.tocomeModalSlice.tocomeData),
    }

    return (
        <Box data-testid="page-home">
            <Appbar route="home" title={t('generic.label.product')} />
            <Box sx={{ height: 80 }} />
            {select.loaded === false ? (
                <Box sx={{ left: '10%', right: '10%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            ) : select.signedin === false ? (
                <Box data-testid="page-home#component-showroom">
                    <Landing />
                </Box>
            ) : (
                <Box data-testid="page-home#component-my home">
                    <MyStats />
                    <MyTables />
                </Box>
            )}
            <ToComeModal data={select.tocomeData} />
        </Box>
    )
}
