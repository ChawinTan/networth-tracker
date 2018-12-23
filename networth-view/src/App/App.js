import React, { Component } from 'react';

import Banner from '../Banner/Banner';
import Login from '../Login/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner />
        <Login />
      </div>
    );
  }
}

export default App;
