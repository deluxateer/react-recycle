import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Trivia from "../layout/Trivia";
import Item from "./Item";
import Spinner from "../layout/Spinner";

class Items extends Component {
  state = {
    sortType: "mostRecent"
  };

  setSortType = e => {
    this.setState({ sortType: e.target.value });
  };

  sortFunction = () => {
    switch (this.state.sortType) {
      case "oldest":
        return (a, b) =>
          a.creationTimestamp.seconds - b.creationTimestamp.seconds;
      case "materials":
        return (a, b) => {
          if (a.material < b.material) return -1;
          if (a.material > b.material) return 1;
          return 0;
        };
      case "highestWeight":
        return (a, b) => {
          if (b.weight * b.quantity < a.weight * a.quantity) return -1;
          if (b.weight * b.quantity > a.weight * a.quantity) return 1;
          return 0;
        };
      case "highestQuantity":
        return (a, b) => b.quantity - a.quantity;
      // default: mostRecent
      default:
        return (a, b) =>
          b.creationTimestamp.seconds - a.creationTimestamp.seconds;
    }
  };

  render() {
    const { items, showTrivia } = this.props;
    if (items) {
      const sortedItems = items
        .sort(this.sortFunction())
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
        <div id="items">
          <div className="container">
            {showTrivia ? <Trivia /> : null}
            <h2>Recycled Items History</h2>
            <div className="d-flex justify-content-center mt-3">
              <h3>Sort By: </h3>
              <select
                onChange={this.setSortType}
                className="custom-select w-50 ml-3"
              >
                <option value="mostRecent">Most Recently Added</option>
                <option value="oldest">Oldest</option>
                <option value="materials">Materials</option>
                <option value="highestWeight">Highest Total Weight</option>
                <option value="highestQuantity">Highest Quantity</option>
              </select>
            </div>
            <div className="items-group">{sortedItems}</div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items,
    showTrivia: state.settings.showTrivia
  }))
)(Items);
