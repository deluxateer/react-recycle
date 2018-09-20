import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddItem extends Component {
  state = {
    itemName: "",
    material: "",
    quantity: 1,
    weight: 0,
    weightUnit: ""
  };

  // checkWeight = weightInput => {
  //   display warning if inputed weight is zero

  //   if (weightInput.value == 0) {
  //     // weightInput.setCustomValidity("Weight must not be zero.");
  //   } else {
  //     // input is fine -- reset the error message
  //     // weightInput.setCustomValidity("");
  //   }
  // };

  onSubmit = e => {
    e.preventDefault();

    const { state } = this;
    const { firestore, history } = this.props;

    const newItem = {
      ...state,
      quantity: parseInt(state.quantity, 10),
      weight: parseFloat(state.weight),
      creationTimestamp: firestore.FieldValue.serverTimestamp()
    };

    firestore
      .add({ collection: "items" }, newItem)
      .then(() => history.push("/"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
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
          <div className="card-header">Add Item</div>
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
                  onChange={this.onChange}
                  value={this.state.itemName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="material">Material</label>
                <select
                  name="material"
                  className="custom-select"
                  required
                  onChange={this.onChange}
                  value={this.state.material}
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
                  onChange={this.onChange}
                  value={this.state.quantity}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight Per Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  required
                  onChange={this.onChange}
                  onInput={this.checkWeight}
                  value={this.state.weight}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weightUnit">Weight Unit</label>
                <select
                  name="weightUnit"
                  className="custom-select"
                  required
                  onChange={this.onChange}
                  value={this.state.weightUnit}
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
  }
}

AddItem.propTypes = {
  firestore: PropTypes.object.isRequired
  // settings: PropTypes.object.isRequired
};

// export default compose(
//   firestoreConnect(),
//   connect((state, props) => ({
//     settings: state.settings
//   }))
// )(AddItem);
export default firestoreConnect()(AddItem);
