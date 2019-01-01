import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Banner from '../Banner/Banner';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner />

        <Switch>
          <Route exact path={'/'} component={Login} />
          <Route path={'/signup'} component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
