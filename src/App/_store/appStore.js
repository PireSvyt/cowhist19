import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from '../_shared/_services/auth/auth.slice.js'
import userSlice from '../_shared/_services/user/user.slice.js'
import tableSlice from '../_shared/_services/table/table.slice.js'
import adminSlice from '../Admin/_services/admin.slice.js'
// Modals
import signupModalSlice from '../_shared/Appbar/SignUpModal/_store/signup.slice.js'
import signinModalSlice from '../_shared/Appbar/SignInModal/_store/signin.slice.js'
import inviteModalSlice from '../_shared/Appbar/TableModal/InviteModal/_store/invite.slice.js'
import tableModalSlice from '../_shared/Appbar/TableModal/_store/table.slice.js'
import gameModalSlice from '../Table/GameModal/_store/game.slice.js'
import tocomeModalSlice from '../_shared/ToComeModal/_store/tocome.slice.js'
import feedbackModalSlice from '../_shared/Appbar/FeedbackModal/_store/feedback.slice.js'
// UI components
import sliceSnack from '../_shared/Appbar/Snack/_store/sliceSnack.js'

// Slices
const slices = {
    // Authentication
    authSlice: authSlice,
    // Collections
    userSlice: userSlice,
    tableSlice: tableSlice,
    adminSlice: adminSlice,
    // Modals
    signupModalSlice: signupModalSlice,
    signinModalSlice: signinModalSlice,
    inviteModalSlice: inviteModalSlice,
    tableModalSlice: tableModalSlice,
    gameModalSlice: gameModalSlice,
    tocomeModalSlice: tocomeModalSlice,
    feedbackModalSlice: feedbackModalSlice,
    // Snack bar
    sliceSnack: sliceSnack,
}

export default configureStore({
    reducer: slices,
})
