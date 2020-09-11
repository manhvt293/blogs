import React, { Component } from 'react';
import './App.css';
import New from './features/news/New';
import Nav from './features/layouts/Nav';
import AlertInfo from './alert/AlertInfo';

class App extends Component {
  render() {
    return (
      <div>
        <AlertInfo />
        <Nav />
        <New />
      </div>
    );
  }
}

export default App;
