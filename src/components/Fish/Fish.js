import React from 'react';
import './Fish.css';
import formatPrice from '../../helpers';
class Fish extends React.Component
{
  addClickEvent = () =>
  {
    this.props.addToOrder(this.props.details.id);
  }
  render ()
  {
    const {details} = this.props;
    const isAvailable = details.status === 'available';
    const image = require(`${details.image}`);
    return (
      <li className="Fish">
        <img src={image} alt={details.name}/>
        <h3 className="name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          disabled={!isAvailable}
          onClick={this.addClickEvent}
        >
          {isAvailable ? 'Add to Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
};

export default Fish;
