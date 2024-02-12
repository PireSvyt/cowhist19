import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Home from './Home/Home.js'
import Activation from './Activation/Activation.js'
import PasswordReset from './PasswordReset/PasswordReset.js'
import Table from './Table/Table.js'
import Account from './Account/Account.js'
import About from './About/About.js'
import Help from './Help/Help.js'
import Admin from './Admin/Admin.js'

// Services
import { serviceAuthAssessCookie } from './_shared/_services/auth/auth.services.js'

export default function App() {
    if (process.env.REACT_APP_DEBUG === 'TRUE') {
        console.log('App')
    }

    // Gather token from cookies
    serviceAuthAssessCookie()

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/activation/:token" element={<Activation />} />
                <Route
                    path="/passwordreset/:token"
                    element={<PasswordReset />}
                />
                <Route path="/account" element={<Account />} />
                <Route path="/table/:id" element={<Table />} />
                <Route path="/help" element={<Help />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    )
}
