import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.itemNameInput = React.createRef();
    this.materialInput = React.createRef();
    this.quantityInput = React.createRef();
    this.weightInput = React.createRef();
    this.weightUnitInput = React.createRef();
  }

  // checkWeight = weightInput => {
  //   display warning if inputed weight is zero

  //   if (weightInput.value == 0) {
  //     // weightInput.setCustomValidity("Weight must not be zero.");
  //   } else {
  //     // input is fine -- reset the error message
  //     // weightInput.setCustomValidity("");
  //   }
  // };

  // Updates Item
  onSubmit = e => {
    e.preventDefault();

    const updatedItem = {
      itemName: this.itemNameInput.current.value,
      material: this.materialInput.current.value,
      quantity: parseInt(this.quantityInput.current.value, 10),
      weight: parseFloat(this.weightInput.current.value),
      weightUnit: this.weightUnitInput.current.value
    };

    const { firestore, item, history } = this.props;

    firestore
      .update({ collection: "items", doc: item.id }, updatedItem)
      .then(() => history.goBack());
  };

  render() {
    const { item } = this.props;

    if (item) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link text-success">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Edit Item</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="itemName">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    minLength="2"
                    required
                    defaultValue={item.itemName}
                    ref={this.itemNameInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="material">Material</label>
                  <select
                    name="material"
                    className="custom-select"
                    required
                    defaultValue={item.material}
                    ref={this.materialInput}
                  >
                    <option defaultValue>Choose a Material</option>
                    <option value="Aluminum">Aluminum</option>
                    <option value="Cardboard">Cardboard</option>
                    <option value="Glass">Glass</option>
                    <option value="Paper">Paper</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Steel">Steel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity (minimum of 1)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    min="1"
                    required
                    defaultValue={item.quantity}
                    ref={this.quantityInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight Per Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="weight"
                    required
                    // min="0"
                    // onInput={this.checkWeight}
                    defaultValue={item.weight}
                    ref={this.weightInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weightUnit">Weight Unit</label>
                  <select
                    name="weightUnit"
                    className="custom-select"
                    required
                    defaultValue={item.weightUnit}
                    ref={this.weightUnitInput}
                  >
                    <option defaultValue>Choose a Unit</option>
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lb">Pounds (lb)</option>
                  </select>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditItem.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "items", doc: props.match.params.id, storeAs: "item" }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    item: ordered.item && ordered.item[0]
  }))
)(EditItem);
