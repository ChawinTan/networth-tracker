import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Banner from '../Banner/Banner';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Networth from '../Networth/networth';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner />

        <Switch>
          <Route exact path={'/'}
           render={
             props => (
               <Login
               saveUserDetail={(email) => {
                 this.props.saveUserDetail(email);
               }}
                />
             )
           } />
          <Route path={'/signup'} component={SignUp} />
          <Route path={'/networth'} component={Networth} />
        </Switch>
      </div>
    );
  }
}

export default App;
