import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Item from "../items/Item";

class Sidebar extends Component {
  render() {
    const { items } = this.props;

    if (items) {
      const mostRecentItems = items.map((item, currIndex) => (
        <Item
          key={item.id}
          id={item.id}
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
      return null;
    }
  }
}

Sidebar.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "items",
      // possible bug, but as of now sorting will not work with just orderBy parameter.
      // However, limit parameter is intentional in this case.
      orderBy: ["creationTimestamp", "desc"],
      limit: 5
    }
  ]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Sidebar);
