function serviceProceedCheck(changePasswordInputs) {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('serviceProceedCheck')
    }
    let proceed = true
    let errors = []
    let stateChanges = {}

    // Checks

    // Is current passworod empty?
    if (
        changePasswordInputs.current === null ||
        changePasswordInputs.current === ''
    ) {
        proceed = false
        errors.push('changepassword.error.missingcurrent')
        if (stateChanges.errors === undefined) {
            stateChanges.errors = {}
        }
        stateChanges.errors.current = true
    }

    // Is new password empty?
    if (changePasswordInputs.new === null || changePasswordInputs.new === '') {
        proceed = false
        errors.push('changepassword.error.missingnew')
        if (stateChanges.errors === undefined) {
            stateChanges.errors = {}
        }
        stateChanges.errors.new = true
    } else {
        // Is repeat empty?
        if (
            changePasswordInputs.repeat === null ||
            changePasswordInputs.repeat === ''
        ) {
            proceed = false
            errors.push('changepassword.error.missingrepeat')
            if (stateChanges.errors === undefined) {
                stateChanges.errors = {}
            }
            stateChanges.errors.repeat = true
        } else {
            // Are new and repeat identical?
            if (changePasswordInputs.new !== changePasswordInputs.repeat) {
                proceed = false
                errors.push('changepassword.error.missmatch')
                if (stateChanges.errors === undefined) {
                    stateChanges.errors = {}
                }
                stateChanges.errors.repeat = true
            }
        }
    }

    // Outcome
    return {
        stateChanges: stateChanges,
        proceed: proceed,
        errors: errors,
    }
}

export default serviceProceedCheck
