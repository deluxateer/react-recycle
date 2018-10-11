import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";

import Alert from "../layout/Alert";

class AddItem extends Component {
  state = {
    itemName: "",
    material: "",
    quantity: 1,
    weight: 0,
    weightUnit: ""
  };

  componentDidMount() {
    // clear error message if it persisted from before
    this.props.notifyUser(null, null);
  }

  onSubmit = e => {
    e.preventDefault();

    const { state } = this;
    const { firestore, firebase, history, notifyUser } = this.props;

    // reject input if weight = 0
    if (parseFloat(state.weight) === 0) {
      notifyUser("You cannot enter a weight value of zero.", "error");
      return;
    }
    // reject input if weight is not a number
    if (isNaN(state.weight)) {
      notifyUser("You must enter a number for weight", "error");
      return;
    }

    const newItem = {
      ...state,
      quantity: parseInt(state.quantity, 10),
      weight: parseFloat(state.weight),
      creationTimestamp: firestore.FieldValue.serverTimestamp()
    };

    firestore
      .add(
        {
          collection: "users",
          doc: firebase.auth().currentUser.uid,
          subcollections: [{ collection: "items" }]
        },
        newItem
      )
      .then(() => history.goBack());
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/dashboard" className="btn btn-link text-success">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Item</div>
          <div className="card-body">
            {message ? (
              <Alert message={message} messageType={messageType} />
            ) : null}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="itemName">
                  Item Name (Max Length: 25 Characters)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="itemName"
                  minLength="2"
                  maxLength="25"
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
                  <option value="">Choose a Material</option>
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
                  type="text"
                  className="form-control"
                  name="weight"
                  required
                  onChange={this.onChange}
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
                  <option value="">Choose a Unit</option>
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
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(AddItem);
