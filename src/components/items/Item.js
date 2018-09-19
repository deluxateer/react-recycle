import React, { Component } from "react";
import PropTypes from "prop-types";

import aluminum from "../../media/aluminum.jpeg";
import cardboard from "../../media/cardboard.jpeg";
import glass from "../../media/glass.jpeg";
import paper from "../../media/paper.jpeg";
import plastic from "../../media/plastic.jpeg";
import steel from "../../media/steel.jpeg";

class Item extends Component {
  render() {
    const { itemName, material, weight, weightUnit, quantity } = this.props;

    // Use ES6 object computed keys to match material types to correct imgs
    const materials = {
      aluminum,
      cardboard,
      glass,
      paper,
      plastic,
      steel
    };

    return (
      <div className="item-card card">
        <img
          className="w-100 h-100"
          src={materials[material.toLowerCase()]}
          alt={material}
        />
        <div className="card-body p-3">
          <div className="d-flex justify-content-between mb-2">
            <div>
              <h5 className="card-title mb-2">{itemName}</h5>
              <h6 className="card-subtitle text-muted">
                {material}, Qty. {quantity}
              </h6>
            </div>
            <div className="d-flex">
              <i className="fas fa-pencil-alt" />
              <i className="fas fa-times ml-4 text-danger" />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text mb-0">
              {weight} {weightUnit} {quantity > 1 ? "each" : null}
            </p>
            <a href="#" className="card-link text-success">
              Duplicate
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  itemName: PropTypes.string.isRequired,
  material: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  weightUnit: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default Item;
