import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/base_components/Login';
import Main from './components/base_components/Main';
import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
            <Redirect path="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }

}
