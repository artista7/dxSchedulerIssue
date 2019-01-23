import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import MainPage from './Components/MainPage/MainPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="box">
          <Switch>
            <Route path="*" component={MainPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
