import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import AdminStats from './AdminStats/AdminStats.js'
import AdminActions from './AdminActions/AdminActions.js'
// Shared
import Appbar from '../_shared/Appbar/Appbar.js'

export default function Admin() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('Admin')
    }

    // Selects
    const select = {
        authLoaded: useSelector((state) => state.authSlice.loaded),
        signedin: useSelector((state) => state.authSlice.signedin),
        userLoaded: useSelector((state) => state.userSlice.loaded),
        priviledges: useSelector((state) => state.userSlice.priviledges),
    }

    return (
        <Box>
            <Appbar route="admin" title={'ADMIN'} />
            <Box sx={{ height: 80 }} />
            {select.authLoaded === false ? (
                <Box sx={{ left: '10%', right: '10%' }}>
                    <LinearProgress color="secondary" />
                </Box>
            ) : select.signedin === false ? null : (
                <Box>
                    {!select.priviledges.includes('admin') ? null : (
                        <Box>
                            <AdminStats />
                            <AdminActions />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    )
}
