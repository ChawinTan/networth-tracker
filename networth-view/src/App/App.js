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
          <Route exact path={'/'} component={Login} />
          <Route path={'/signup'} component={SignUp} />
          <Route path={'/networth'} 
            render={
              props => (
                <Networth 
                saveUserNetworth={(networth) => {
                  this.props.saveUserNetworth(networth);
                }}
                 />
              )
            } />
        </Switch>
      </div>
    );
  }
}

export default App;
