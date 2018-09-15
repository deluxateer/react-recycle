import React, { Component } from "react";
import aluminum from "../../media/aluminum.jpeg";
import cardboard from "../../media/cardboard.jpeg";
import glass from "../../media/glass.jpeg";
import paper from "../../media/paper.jpeg";
import plastic from "../../media/plastic.jpeg";
import steel from "../../media/steel.jpeg";

class Item extends Component {
  render() {
    return (
      <div className="item-card card">
        <img className="w-100 h-100" src={glass} alt="glass" />
        <div className="card-body p-3">
          <div className="d-flex justify-content-between mb-2">
            <div>
              <h5 className="card-title mb-2">Coke Bottles</h5>
              <h6 className="card-subtitle text-muted">Plastic, Qty. 3</h6>
            </div>
            <div className="d-flex">
              <i className="fas fa-pencil-alt" />
              <i className="fas fa-times ml-4 text-danger" />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text mb-0">3 oz each</p>
            <a href="#" className="card-link text-success">
              Duplicate
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
