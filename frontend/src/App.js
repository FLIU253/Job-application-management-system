import React, {Component} from 'react';
import './App.css';
import HomePage from './pages/homepage.component';
import Login from './pages/login.component';
import Register from './pages/register.component';
import Alert from './components/alert.component';
import {loadUser} from './redux/actions/auth';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

export default class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }
   
  render() {
    return(
      <div>
        <Alert/>
        <Switch>
        <Route  exact path = "/login" component = {Login}/>
        <Route  exact path = "/" component = {Login}/>
        <Route exact path = "/register" component = {Register}/>
        <PrivateRoute exact path = "/home" component = {HomePage}/>
        </Switch>
      </div>
    );
  }
}
