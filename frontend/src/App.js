import React, {Component} from 'react';
import './App.css';
import HomePage from './pages/homepage.component';
import Login from './pages/login.component';

export default class App extends Component{
  render() {
    return(
      <Login/>
    );
  }
}
