/* App Entry Point */
/* Dependencies*/
import React from 'react'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
/* Styles*/
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
/* Pages*/
import Dashboard from './Pages/Dashboard'
import Models from './Pages/Models'
import RepairData from './Pages/RepairData'
import ChooseFiles from './Pages/ChooseFiles'
/* Redux store */
import { store, persistor } from './Data/createStore'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <ChooseFiles path="/" />
                    <Dashboard path="/dashboard" />
                    <Models path="models" />
                    <RepairData path="repairs" />
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
