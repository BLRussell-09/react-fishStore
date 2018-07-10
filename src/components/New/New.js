import React from 'react';
import Fish from '../Fish/Fish';
import fishRequests from '../../firebaseRequests/fishes';
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
  }

  addToOrder = (key) =>
  {
    const newOrder = {...this.state.order};
    newOrder[key] = newOrder[key] + 1 || 1;
    this.setState({order: newOrder});
  }

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
        <Order />
      </div>
    );
  }
};

export default New;
