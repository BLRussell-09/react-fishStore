import React from 'react';
import orderRequests from '../../firebaseRequests/orders';
import authRequests from '../../firebaseRequests/auth';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './OrderSpa.css';

class OrderSpa extends React.Component
{

  state =
  {
    orders: [],
  }

  componentDidMount ()
  {
    orderRequests
      .getRequest(authRequests.getUid())
      .then((orders) =>
      {
        this.setState({orders});
      })
      .catch((err) =>
      {
        console.error('There was an error getting orders' ,err);
      });
  };

  render ()
  {
    const orderComponents = this.state.orders.map((order) =>
    {
      const singleOrderClickEvent = () =>
      {
        this.props.history.push(`/order/${order.id}`);
      };

      return (
        <button
          className="col-xs-12 btn btn-default order-button"
          key={order.id}
          onClick={singleOrderClickEvent}
        >
          <span className="col-xs-6">Order Number: {order.id}</span>
          <span className="col-xs-6">Order Date: {moment(order.dateTime).format('LLL')}</span>
        </button>
      );
    });

    return (
      <div className="OrderSpa col-xs-12">
        <h2>Orders</h2>
        <button><Link to="/new">New Order</Link></button>
        <ul>
          {orderComponents}
        </ul>
      </div>
    );
  }
};

export default OrderSpa;
