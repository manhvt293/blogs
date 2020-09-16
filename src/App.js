import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AlertInfo from './alert/AlertInfo';
import './App.css';
import Nav from './features/layouts/Nav';
import RouterUrl from './router/RouterUrl';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AlertInfo />
          <Nav />
          <RouterUrl />
        </Router>
      </div>
    );
  }
}

export default App;
