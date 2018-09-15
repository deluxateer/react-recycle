import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Item from "../items/Item";
import Spinner from "./Spinner";

class Sidebar extends Component {
  render() {
    const { items } = this.props;

    if (items) {
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
    } else {
      return (
        <div id="sidebar">
          <h2 className="text-sm-center text-md-center">
            Most Recent Recycled Items
          </h2>
          <Spinner />
        </div>
      );
    }
  }
}

Sidebar.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Sidebar);
