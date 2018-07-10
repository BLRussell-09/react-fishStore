import React from 'react';
import './Inventory.css';
import fishRequests from '../../firebaseRequests/fishes';
import Fish from '../Fish/Fish';

class Inventory extends React.Component
{

  state =
  {
    fishes: [],
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

  render ()
  {

    const fishComponents = this.state.fishes.map((fish) =>
    {
      return (
        <Fish
          details={fish}
          key={fish.id}
        />
      );
    });

    return (
      <div className="Inventory col-xs-12">
        <h1>Inventory</h1>
        <ul className="fishes">
          {fishComponents}
        </ul>
      </div>
    );
  }
};

export default Inventory;
