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
        material: "Paper",
        weight: 2,
        weightUnit: "oz",
        quantity: 1
      }
    ]
  };

  render() {
    const { items } = this.state;

    const mostRecentSize = 2;
    const mostRecentItems = items
      .slice(0, mostRecentSize)
      .map((item, currIndex) => <p key={currIndex}>{item.itemName}</p>);

    return (
      <div id="sidebar">
        <h2 className="text-sm-center text-md-center">
          Most Recent Recycled Items
        </h2>
        <Item />
        <Item />
      </div>
    );
  }
}

export default Sidebar;
