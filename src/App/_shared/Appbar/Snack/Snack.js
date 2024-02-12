import * as React from 'react'
import { withTranslation } from 'react-i18next'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import snacks from '../../../resources/snacks.json'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

/*
SEVERITY
error
warning
info
success
*/

function getDummySnack() {
    return {
        uid: undefined,
        id: undefined,
        duration: undefined,
        message: undefined,
        severity: undefined,
        details: undefined,
    }
}

class Snack extends React.Component {
    constructor(props) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('Snack.constructor')
        }
        super(props)
        this.state = {
            snack: getDummySnack(),
        }
        // Handles
        this.handleClose = this.handleClose.bind(this)
    }
    render() {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('Snack.render')
        }
        // i18n
        const { t } = this.props

        return (
            <Snackbar
                open={this.props.open}
                autoHideDuration={this.state.snack.duration}
                onClose={this.handleClose}
            >
                <Alert
                    onClose={this.handleClose}
                    severity={this.state.snack.severity}
                    sx={{ width: '100%' }}
                >
                    {this.state.snack.message}
                </Alert>
            </Snackbar>
        )
    }
    componentDidUpdate(prevState) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('Snack.componentDidUpdate')
        }
        // i18n
        const { t } = this.props

        if (this.props.snack !== undefined) {
            if (prevState.snack.uid !== this.props.snack.uid) {
                // Add optional inputs
                var newSnack = { ...snacks[this.props.snack.id] }
                if (newSnack === undefined) {
                    newSnack = {
                        severity: 'error',
                        message: 'Inexisting snack : ' + this.props.snack.id,
                        duration: 10000,
                    }
                } else {
                    newSnack.id = this.props.snack.id
                    newSnack.uid = this.props.snack.uid
                    if (newSnack !== undefined) {
                        if (newSnack.duration === undefined) {
                            newSnack.duration = 3000
                        }
                        if (newSnack.severity === undefined) {
                            newSnack.severity = 'info'
                        }
                        if (newSnack.message === undefined) {
                            newSnack.message = t(this.props.snack.id)
                        }
                        if (
                            this.props.snack.details !== undefined &&
                            this.props.snack.details.length !== 0
                        ) {
                            let detailedErrors = ''
                            this.props.snack.details.forEach((detail) => {
                                detailedErrors =
                                    detailedErrors + t(detail) + ', '
                            })
                            newSnack.message =
                                newSnack.message +
                                ' ' +
                                detailedErrors.slice(
                                    0,
                                    detailedErrors.length - 2
                                )
                        }
                        this.setState((prevState, props) => ({
                            snack: newSnack,
                        }))
                    }
                }
            }
        }
    }

    // Handles
    handleClose(event, reason) {
        if (process.env.REACT_APP_DEBUG === 'TRUE') {
            console.log('Snack.handleClose')
        }
        if (reason !== 'clickaway') {
            this.props.callback('close')
        }
    }
}

export default withTranslation()(Snack)
