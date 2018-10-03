import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Item from "../items/Item";

class Sidebar extends Component {
  // if server hasn't returned a Timestamp after the item was
  // freshly created, then temporarily sort by quantity
  sortFunction = (a, b) => {
    if (b.creationTimestamp !== null && a.creationTimestamp !== null) {
      return b.creationTimestamp.seconds - a.creationTimestamp.seconds;
    } else {
      return b.quantity - a.quantity;
    }
  };

  render() {
    const { items } = this.props;

    if (items) {
      const mostRecentSize = 5;
      const mostRecentItems = items
        .sort((a, b) => this.sortFunction(a, b))
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
            creationTimestamp={item.creationTimestamp}
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

// export default compose(
//   firestoreConnect(props => [{ collection: "items" }]),
//   connect((state, props) => ({
//     items: state.firestore.ordered.items
//   }))
// )(Sidebar);

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.firebase.auth().currentUser.uid,
      subcollections: [
        {
          collection: "items"
        }
      ],
      storeAs: "userItems"
    }
  ]),
  connect((state, props) => ({
    items: state.firestore.ordered.userItems
  }))
)(Sidebar);
