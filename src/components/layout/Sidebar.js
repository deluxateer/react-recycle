import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "../items/Item";

class Sidebar extends Component {
  state = {
    items: [
      {
        itemName: "Coke Bottles",
        material: "Glass",
        weight: 3,
        weightUnit: "oz",
        quantity: 3
      },
      {
        itemName: "Ruled Notebook",
        material: "Paper",
        weight: 2,
        weightUnit: "oz",
        quantity: 1
      },
      {
        itemName: "Fork Set",
        material: "Steel",
        weight: 2,
        weightUnit: "oz",
        quantity: 1
      }
    ]
  };

  render() {
    const { items } = this.state;

    const mostRecentSize = 5;
    const mostRecentItems = items
      .slice(0, mostRecentSize)
      .map((item, currIndex) => (
        <Item
          key={currIndex}
          itemName={item.itemName}
          material={item.material}
          weight={item.weight}
          weightUnit={item.weightUnit}
          quantity={item.quantity}
        />
      ));

    return (
      <div id="sidebar">
        <h2 className="text-sm-center text-md-center">
          Most Recent Recycled Items
        </h2>
        {mostRecentItems}
        <a href="#" className="text-success d-block text-center">
          See All Items
        </a>
      </div>
    );
  }
}

export default Sidebar;
