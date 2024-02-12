import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Card, Typography } from '@mui/material'

export default function RankingCard(props) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('RankingCard ' + props.player.userid)
    }
    // i18n
    const { t } = useTranslation()
    return (
        <Card
            sx={{ width: '100%', p: 1 }}
            index={props.index}
            data-testid={'list-ranks#listitem-' + props.index}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography gutterBottom>{props.player.pseudo}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Typography>
                        {t('table.label.averagepoints') +
                            ' ' +
                            parseFloat(props.player.averagepoints).toFixed(1)}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ typography: 'caption' }}>
                    {props.player.games + ' ' + t('table.label.games')}
                </Typography>
                <Typography sx={{ typography: 'caption' }}>
                    {parseFloat(props.player.ratevictory * 100).toFixed(0) +
                        '% ' +
                        t('table.label.victory')}
                </Typography>
                <Typography sx={{ typography: 'caption' }}>
                    {parseFloat(props.player.rateattack * 100).toFixed(0) +
                        '% ' +
                        t('table.label.attack')}
                </Typography>
            </Box>
        </Card>
    )
}
