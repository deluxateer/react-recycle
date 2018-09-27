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
      const mostRecentSize = 5;
      const mostRecentItems = items
        .sort(
          (a, b) => b.creationTimestamp.seconds - a.creationTimestamp.seconds
        )
        .slice(0, mostRecentSize)
        .map(item => (
          <Item
            key={item.id}
            id={item.id}
            itemName={item.itemName}
            material={item.material}
            weight={item.weight}
            weightUnit={item.weightUnit}
            quantity={item.quantity}
            timeStamp={item.creationTimestamp}
          />
        ));

      return (
        <div id="sidebar">
          <h2 className="text-sm-center text-md-center">
            Most Recent Recycled Items
          </h2>
          {mostRecentItems}
          {items.length > 0 ? (
            <Link to="/items" className="text-success d-block text-center">
              See All Items
            </Link>
          ) : (
            <p className="d-block text-center">
              You don't have any items.{" "}
              <Link to="/item/add" className="text-success">
                Try adding some!
              </Link>
            </p>
          )}
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
      collection: "items"
      // Bugs with this package: orderBy doesn't work on its own, rerendering
      // a page with this sidebar after another previous query mutates
      // the Redux state.

      // orderBy: ["creationTimestamp", "desc"],
      // limit: 5
    }
  ]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Sidebar);
