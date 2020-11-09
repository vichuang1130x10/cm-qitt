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
import SelectPrimary from './Pages/SelectPrimary'
import DetailPage from './Pages/ModelDetail'
import AppEntrance from './Pages/AppEntrance'
/* Redux store */
import { store, persistor } from './Data/createStore'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={1} persistor={persistor}>
                <Router>
                    {/* <ChooseFiles path="/" /> */}
                    <AppEntrance path="/" />
                    <Dashboard path="/dashboard" />
                    <Models path="/models" />
                    <RepairData path="/repairs" />
                    <SelectPrimary path="/selectPrimary" />
                    <DetailPage path="detail" />
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App
