import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import './App.css';
import Home from '../components/Home/Home.js';
import Inventory from '../components/Inventory/Inventory.js';
import Login from '../components/Login/Login.js';
import Navbar from '../components/Navbar/Navbar.js';
import New from '../components/New/New.js';
import OrderSpa from '../components/OrderSpa/OrderSpa.js';
import Register from '../components/Register/Register.js';
import SingleOrder from '../components/SingleOrder/SingleOrder.js';
import firebase from 'firebase';
import fbConnection from '../firebaseRequests/connection';
fbConnection();

const PrivateRoute = ({component: Component, authed, ...rest}) =>
{
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ?
          (
            <Component {...props} />
          ) :
          (
            <Redirect
              to={{pathname: '/login', state: {from: props.location}}}
            />
          )
      }
    />
  );
};

const PublicRoute = ({component: Component, authed, ...rest}) =>
{
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ?
          (
            <Component {...props} />
          ) :
          (
            <Redirect
              to={{pathname: '/orders', state: {from: props.location}}}
            />
          )
      }
    />
  );
};

class App extends Component {

  state=
  {
    authed: false,
  }

  componentDidMount ()
  {
    this.removeListener = firebase.auth().onAuthStateChanged((user) =>
    {
      if (user)
      {
        this.setState({authed: true});
      }
      else
      {
        this.setState({authed: false});
      }
    });
  };

  componentWillUnmount ()
  {
    this.removeListener();
  }

  runAway = () =>
  {
    this.setState({authed: false});
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <PrivateRoute
                    path="/inventory"
                    authed={this.state.authed}
                    component={Inventory}
                  />
                  <PrivateRoute
                    path="/new"
                    authed={this.state.authed}
                    component={New}
                  />
                  <PrivateRoute
                    path="/orders"
                    authed={this.state.authed}
                    component={OrderSpa}
                  />
                  <PrivateRoute
                    path="/order/:id"
                    authed={this.state.authed}
                    component={SingleOrder}
                  />
                  <PublicRoute
                    path='/register'
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path='/login'
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
