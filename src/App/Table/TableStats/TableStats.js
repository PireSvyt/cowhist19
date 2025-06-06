import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    Box,
    List,
    ListItem,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import SsidChartIcon from '@mui/icons-material/SsidChart'

// Components
import RankingCard from './RankingCard/RankingCard.js'
import StatGraph from './StatGraph/StatGraph.js'
// Service
import { serviceTableGetStats } from '../../_shared/_services/table/table.services.js'
// Store
import appStore from '../../_store/appStore.js'

export default function TableStats() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('TableStats')
    }
    // i18n
    const { t } = useTranslation()

    // Selects
    const select = {
        tableState: useSelector((state) => state.tableSlice.state),
        players: useSelector((state) => state.tableSlice.players),
        view: useSelector((state) => state.tableSlice.view),
        userid: useSelector((state) => state.userSlice.userid),
        ranking: useSelector((state) => state.tableSlice.ranking),
        datafocus: useSelector((state) => state.tableSlice.datafocus),
        dataperiod: useSelector((state) => state.tableSlice.dataperiod),
    }

    // Load stats atr opening
    if (
        select.tableState.details === 'available' &&
        select.tableState.ranking === undefined
    ) {
        serviceTableGetStats()
    }

    let dimensions = [
        'averagepoints',
        'ratevictory',
        'rateattack',
        'gamenumber',
    ]
    let periods = ['sliding', '2025', '2024', '2023', '2022', '2021', '2020']

    // Changes
    const changes = {
        view: (newView) => {
            // Change view
            appStore.dispatch({
                type: 'tableSlice/setView',
                payload: {
                    view: newView,
                },
            })
            // Fire loading
            serviceTableGetStats()
        },
        datafocus: (e) => {
            appStore.dispatch({
                type: 'tableSlice/datafocus',
                payload: {
                    datafocus: e.target.value,
                },
            })
        },
        dataperiod: (e) => {
            appStore.dispatch({
                type: 'tableSlice/dataperiod',
                payload: {
                    dataperiod: e.target.value,
                },
            })
            serviceTableGetStats()
        },
    }

    let c = -1

    return (
        <Box data-testid="component-table stats">
            {!(
                select.tableState.details === 'available' &&
                select.tableState.ranking === 'available'
            ) ? (
                <Box sx={{ left: '10%', right: '10%' }}>
                    <LinearProgress />
                </Box>
            ) : select.ranking.length === 0 &&
              select.dataperiod == 'sliding' ? (
                <Box
                    data-testid="component-table stats#box-no ranking"
                    sx={{
                        m: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('table.label.nogames')}
                    </Typography>
                    <SmsFailedIcon
                        sx={{ mt: 2, mb: 2 }}
                        fontSize="large"
                        color="primary"
                    />
                    <Typography
                        sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                        variant="body1"
                        component="span"
                        align="center"
                    >
                        {t('table.label.nogamesstatsexplanation')}
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        <FormControl variant="standard" sx={{ ml: 1 }}>
                            <InputLabel>{t('table.label.period')}</InputLabel>
                            <Select
                                name="period"
                                value={select.dataperiod}
                                onChange={changes.dataperiod}
                                data-testid="component-table stats#select-graph period"
                            >
                                {periods.map((period) => {
                                    return (
                                        <MenuItem key={period} value={period}>
                                            {period == 'sliding'
                                                ? t('table.label.sliding')
                                                : period}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        {select.view != 'graph' ? null : (
                            <FormControl
                                variant="standard"
                                sx={{ ml: 1, mr: 2 }}
                            >
                                <InputLabel>{t('table.label.data')}</InputLabel>
                                <Select
                                    name="dimension"
                                    value={select.datafocus}
                                    onChange={changes.datafocus}
                                    data-testid="component-table stats#select-graph dimension"
                                >
                                    {dimensions.map((dimension) => {
                                        return (
                                            <MenuItem
                                                key={dimension}
                                                value={dimension}
                                            >
                                                {t('table.label.' + dimension)}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        )}

                        <ToggleButtonGroup value={select.view}>
                            <ToggleButton
                                value="ranking"
                                data-testid="component-table stats#button-see ranking"
                                onClick={() => changes.view('ranking')}
                            >
                                <StarBorderIcon />
                            </ToggleButton>
                            <ToggleButton
                                value="graph"
                                data-testid="component-table stats#button-see graph"
                                onClick={() => changes.view('graph')}
                            >
                                <SsidChartIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {select.view === 'ranking' ? (
                        <List
                            dense={true}
                            data-testid="component-table stats#list-ranks"
                        >
                            {select.ranking.map((player) => {
                                let rankingPlayer = { ...player }
                                let pseudoPlayer = select.players.filter(
                                    (tablePlayer) => {
                                        return (
                                            tablePlayer.userid === player.userid
                                        )
                                    }
                                )
                                if (pseudoPlayer.length > 0) {
                                    rankingPlayer.pseudo =
                                        pseudoPlayer[0].pseudo
                                    c += 1
                                    return (
                                        <ListItem
                                            key={
                                                'ranking-' +
                                                rankingPlayer.userid
                                            }
                                        >
                                            <RankingCard
                                                player={rankingPlayer}
                                                index={c}
                                            />
                                        </ListItem>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </List>
                    ) : null}

                    {select.view === 'graph' ? <StatGraph /> : null}
                </Box>
            )}
        </Box>
    )
}
