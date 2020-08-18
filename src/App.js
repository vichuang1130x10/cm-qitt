/* App Entry Point */
/* Dependencies*/
import React from 'react';
import { Router} from '@reach/router'
/* Styles*/
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
/* Pages*/
import Dashboard from './Pages/Dashboard'
import Models from './Pages/Models'
import RepairData from './Pages/RepairData'



function App() {
  return (
    <>
      <Router>
          <Dashboard path="/" />
          <Models path="models" />
          <RepairData path="repairs"/>
      </Router>
    </>
  );
}

export default App;
