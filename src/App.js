import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import store from './redux/store';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={ store }>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={ Login } />
              <Route exact path="/carteira" component={ Wallet } />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
