import React, { Component } from 'react';
import './App.css';
import Fish from '../components/Fish/Fish.js';
import Home from '../components/Home/Home.js';
import Inventory from '../components/Inventory/Inventory.js';
import Login from '../components/Login/Login.js';
import Navbar from '../components/Navbar/Navbar.js';
import New from '../components/New/New.js';
import Order from '../components/Order/Order.js';
import OrderSpa from '../components/OrderSpa/OrderSpa.js';
import Register from '../components/Register/Register.js';
import SingleOrder from '../components/SingleOrder/SingleOrder.js';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Fish/>
        <Home/>
        <Inventory/>
        <Login/>
        <Navbar/>
        <New/>
        <Order/>
        <OrderSpa/>
        <Register/>
        <SingleOrder/>
      </div>
    );
  }
}

export default App;
