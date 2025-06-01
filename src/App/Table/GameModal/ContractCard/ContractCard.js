import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Card,
    Typography,
    Slider,
    Select,
    Autocomplete,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Chip,
} from '@mui/material'
// Reducers
import appStore from '../../../_store/appStore.js'

export default function ContractCard(props) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('ContractCard ' + props.index)
    }
    // i18n
    const { t } = useTranslation()
    // Constants
    const menuItemHeight = 54

    console.log('ContractCard.props', props)

    // Changes
    const changes = {
        contract: (e) => {
            // Auto open next menu ?
            if (
                props.contract.inputs.contract === '' &&
                props.contract.inputs.players.length === 0 &&
                props.contract.inputs.outcome === 0
            ) {
                appStore.dispatch({
                    type: 'gameModalSlice/openMenu',
                    payload: {
                        contractposition: props.index,
                        menu: 'attack',
                    },
                })
            } else {
                appStore.dispatch({
                    type: 'gameModalSlice/closeMenu',
                    payload: {
                        contractposition: props.index,
                        menu: 'contract',
                    },
                })
            }
            // Select contract
            let contract = props.contracts.filter(
                (c) => c.key === e.target.value
            )[0]
            appStore.dispatch({
                type: 'gameModalSlice/change',
                payload: {
                    contractposition: props.index,
                    inputs: { contract: e.target.value },
                    errors: { contract: false },
                    requirements: {
                        attack: contract.attack,
                        defense: contract.defense,
                        outcome: 13 - contract.folds,
                    },
                },
            })
        },
        addToAttack: (userid) => {
            // Auto open next menu ?
            if (
                props.contract.inputs.contract !== '' &&
                props.contract.inputs.players.filter((p) => p.role === 'attack')
                    .length +
                    1 ===
                    props.contract.requirements.attack && // Not yet stored
                props.contract.inputs.players.filter(
                    (p) => p.role === 'defense'
                ).length === 0 &&
                props.contract.inputs.outcome === 0
            ) {
                appStore.dispatch({
                    type: 'gameModalSlice/openMenu',
                    payload: {
                        contractposition: props.index,
                        menu: 'defense',
                    },
                })
            }
            // Store selected attackant
            let selectedPlayer = props.players.filter(
                (player) => player.userid === userid
            )[0]
            appStore.dispatch({
                type: 'gameModalSlice/addplayer',
                payload: {
                    contractposition: props.index,
                    player: {
                        userid: userid,
                        pseudo: selectedPlayer.pseudo,
                        status: selectedPlayer.status,
                        role: 'attack',
                    },
                    errors: { attack: false },
                },
            })
        },
        removeFromAttack: (userid) => {
            appStore.dispatch({
                type: 'gameModalSlice/removeplayer',
                payload: {
                    contractposition: props.index,
                    player: userid,
                    errors: { attack: false },
                },
            })
        },
        addToDefense: (userid) => {
            // Auto open next menu ?
            if (
                props.contract.inputs.contract !== '' &&
                props.contract.inputs.players.filter((p) => p.role === 'attack')
                    .length === props.contract.requirements.attack &&
                props.contract.inputs.players.filter(
                    (p) => p.role === 'defense'
                ).length +
                    1 ===
                    props.contract.requirements.defense && // Not yet stored
                props.contract.inputs.outcome === 0
            ) {
                appStore.dispatch({
                    type: 'gameModalSlice/closeMenu',
                    payload: {
                        contractposition: props.index,
                        menu: 'defense',
                    },
                })
            }
            // Store selected defenser
            let selectedPlayer = props.players.filter(
                (player) => player.userid === userid
            )[0]
            appStore.dispatch({
                type: 'gameModalSlice/addplayer',
                payload: {
                    contractposition: props.index,
                    player: {
                        userid: userid,
                        pseudo: selectedPlayer.pseudo,
                        status: selectedPlayer.status,
                        role: 'defense',
                    },
                    errors: { defense: false },
                },
            })
        },
        removeFromDefense: (userid) => {
            appStore.dispatch({
                type: 'gameModalSlice/removeplayer',
                payload: {
                    contractposition: props.index,
                    player: userid,
                    errors: { defense: false },
                },
            })
        },
        defense: (e) => {
            // Auto open next menu ?
            if (
                props.contract.inputs.contract !== '' &&
                props.contract.inputs.players.filter((p) => p.role === 'attack')
                    .length === props.contract.requirements.attack &&
                props.contract.inputs.players.filter(
                    (p) => p.role === 'defense'
                ).length +
                    1 ===
                    props.contract.requirements.defense && // Not yet stored
                props.contract.inputs.outcome === 0
            ) {
                appStore.dispatch({
                    type: 'gameModalSlice/closeMenu',
                    payload: {
                        contractposition: props.index,
                        menu: 'defense',
                    },
                })
            }
            // Store selected defenser
            let newPlayers = props.contract.inputs.players.filter(
                (player) => player.role === 'attack'
            )
            e.target.value.forEach((defenser) => {
                newPlayers.push({
                    userid: defenser.userid,
                    pseudo: defenser.pseudo,
                    role: 'defense',
                })
            })
            appStore.dispatch({
                type: 'gameModalSlice/change',
                payload: {
                    contractposition: props.index,
                    inputs: { players: newPlayers },
                    errors: { defense: false },
                },
            })
        },
        outcome: (e) => {
            appStore.dispatch({
                type: 'gameModalSlice/change',
                payload: {
                    contractposition: props.index,
                    inputs: { outcome: e.target.value },
                    errors: { outcome: false },
                },
            })
        },
        openMenu: (menu) => {
            appStore.dispatch({
                type: 'gameModalSlice/openMenu',
                payload: {
                    contractposition: props.index,
                    menu: menu,
                },
            })
        },
        closeMenu: (menu) => {
            appStore.dispatch({
                type: 'gameModalSlice/closeMenu',
                payload: {
                    contractposition: props.index,
                    menu: menu,
                },
            })
        },
        remove: () => {
            appStore.dispatch({
                type: 'gameModalSlice/removecontract',
                payload: props.index,
            })
        },
    }
    return (
        <Card
            sx={{
                p: 1,
            }}
            data-testid={'list-contracts#listitem-' + props.index}
            index={props.index}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}
            >
                <FormControl variant="standard">
                    <InputLabel>{t('game.input.contract')}</InputLabel>
                    <Select
                        name="contract"
                        value={props.contract.inputs.contract}
                        onChange={changes.contract}
                        error={props.contract.errors.contract}
                        data-testid={
                            'list-contracts#listitem-' +
                            props.index +
                            '#select-contract'
                        }
                    >
                        {props.contracts.map((contract) => (
                            <MenuItem key={contract.key} value={contract.key}>
                                {t('game.label.contract.' + contract.key)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    variant="standard"
                    error={props.contract.errors.attack}
                >
                    <InputLabel>
                        {props.contract.requirements.attack !== 0
                            ? t('game.input.attack') +
                              ' (' +
                              props.contract.requirements.attack +
                              ')'
                            : t('game.input.attack')}
                    </InputLabel>
                    <Select
                        data-testid={
                            'list-contracts#listitem-' +
                            props.index +
                            '#select-attack'
                        }
                        name="attack"
                        multiple
                        value={props.contract.inputs.players
                            .filter((player) => player.role === 'attack')
                            .map((player) => player.userid)}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((playerid) => {
                                    let selectedPlayer =
                                        props.contract.inputs.players.filter(
                                            (player) =>
                                                player.userid === playerid
                                        )[0]
                                    return (
                                        <Chip
                                            key={playerid}
                                            label={
                                                selectedPlayer.status ===
                                                'guest'
                                                    ? t('game.label.guest')
                                                    : selectedPlayer.pseudo
                                            }
                                            onDelete={() =>
                                                changes.removeFromAttack(
                                                    playerid
                                                )
                                            }
                                            onMouseDown={(event) => {
                                                event.stopPropagation()
                                            }}
                                        />
                                    )
                                })}
                            </Box>
                        )}
                        MenuProps={{
                            style: { maxHeight: menuItemHeight * 4.5 },
                        }}
                        open={props.contract.focuses.attack}
                        onOpen={() => changes.openMenu('attack')}
                        onClose={() => changes.closeMenu('attack')}
                    >
                        {props.players
                            .filter(
                                (potentialPlayer) =>
                                    !props.contract.inputs.players
                                        .map(
                                            (selectedPlayer) =>
                                                selectedPlayer.userid
                                        )
                                        .includes(potentialPlayer.userid)
                            )
                            .map((potentialPlayer) => (
                                <MenuItem
                                    key={potentialPlayer.userid}
                                    value={potentialPlayer.userid}
                                    onClick={() =>
                                        changes.addToAttack(
                                            potentialPlayer.userid
                                        )
                                    }
                                >
                                    {potentialPlayer.pseudo}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <FormControl
                    variant="standard"
                    error={props.contract.errors.defense}
                >
                    <InputLabel>
                        {props.contract.requirements.defense !== 0
                            ? t('game.input.defense') +
                              ' (' +
                              props.contract.requirements.defense +
                              ')'
                            : t('game.input.defense')}
                    </InputLabel>
                    <Select
                        data-testid={
                            'list-contracts#listitem-' +
                            props.index +
                            '#select-defense'
                        }
                        name="defense"
                        multiple
                        value={props.contract.inputs.players
                            .filter((player) => player.role === 'defense')
                            .map((player) => player.userid)}
                        renderValue={(selected) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {selected.map((playerid) => {
                                    let selectedPlayer =
                                        props.contract.inputs.players.filter(
                                            (player) =>
                                                player.userid === playerid
                                        )[0]
                                    return (
                                        <Chip
                                            key={playerid}
                                            label={
                                                selectedPlayer.status ===
                                                'guest'
                                                    ? t('game.label.guest')
                                                    : selectedPlayer.pseudo
                                            }
                                            onDelete={() =>
                                                changes.removeFromDefense(
                                                    playerid
                                                )
                                            }
                                            onMouseDown={(event) => {
                                                event.stopPropagation()
                                            }}
                                        />
                                    )
                                })}
                            </Box>
                        )}
                        MenuProps={{
                            style: { maxHeight: menuItemHeight * 4.5 },
                        }}
                        open={props.contract.focuses.defense}
                        onOpen={() => changes.openMenu('defense')}
                        onClose={() => changes.closeMenu('defense')}
                    >
                        {props.players
                            .filter(
                                (potentialPlayer) =>
                                    !props.contract.inputs.players
                                        .map(
                                            (selectedPlayer) =>
                                                selectedPlayer.userid
                                        )
                                        .includes(potentialPlayer.userid)
                            )
                            .map((potentialPlayer) => (
                                <MenuItem
                                    key={potentialPlayer.userid}
                                    value={potentialPlayer.userid}
                                    onClick={() =>
                                        changes.addToDefense(
                                            potentialPlayer.userid
                                        )
                                    }
                                >
                                    {potentialPlayer.pseudo}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>

                <Typography variant="caption" gutterBottom>
                    {t('game.input.outcome') +
                        ' (max. ' +
                        props.contract.requirements.outcome +
                        ')'}
                </Typography>
                <Slider
                    data-testid={
                        'list-contracts#listitem-' +
                        props.index +
                        '#slider-outcome'
                    }
                    name="outcome"
                    defaultValue={0}
                    value={props.contract.inputs.outcome || 0}
                    onChange={changes.outcome}
                    step={1}
                    marks
                    min={-8}
                    max={8}
                    valueLabelDisplay="on"
                    sx={{ mt: 4 }}
                    color={props.contract.errors.outcome ? 'error' : 'primary'}
                />
            </Box>
        </Card>
    )
}
