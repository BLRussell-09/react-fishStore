import React from 'react';
import Fish from '../Fish/Fish';
import authRequests from '../../firebaseRequests/auth';
import fishRequests from '../../firebaseRequests/fishes';
import orderRequests from '../../firebaseRequests/orders';
import Order from '../Order/Order';
import './New.css';

class New extends React.Component
{

  state =
  {
    fishes: [],
    order: {},
  };

  componentDidMount ()
  {
    fishRequests
      .getRequest()
      .then((fishes) =>
      {
        this.setState({fishes});
      })
      .catch((err) =>
      {
        console.error('There was an error getting fish' ,err);
      });
  };

  addToOrder = (key) =>
  {
    const newOrder = {...this.state.order};
    newOrder[key] = newOrder[key] + 1 || 1;
    this.setState({order: newOrder});
  };

  removeFromOrder = (key) =>
  {
    const newOrder = {...this.state.order};
    delete newOrder[key];
    this.setState({order: newOrder});
  };

  saveNewOrder = () =>
  {
    const newOrder = {fishes: {...this.state.order}};
    newOrder.uid = authRequests.getUid();
    newOrder.dateTime = Date.now();
    orderRequests.postRequest(newOrder)
      .then(() =>
      {
        this.props.history.push('/orders');
      })
      .catch((err) => { console.error(err); });
  };

  render ()
  {

    const fishComponents = this.state.fishes.map((fish) =>
    {
      return (
        <Fish
          details={fish}
          key={fish.id}
          addToOrder={this.addToOrder}
        />
      );
    });

    return (
      <div className="New">
        <div className="col-xs-8 inventory-container">
          <h2>Inventory</h2>
          <ul className="fishes">
            {fishComponents}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          saveNewOrder={this.saveNewOrder}
        />
      </div>
    );
  }
};

export default New;
