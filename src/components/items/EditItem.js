import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";

import Alert from "../layout/Alert";
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

  componentDidMount() {
    // clear error message if it persisted from before
    this.props.notifyUser(null, null);
  }

  // Updates Item
  onSubmit = e => {
    e.preventDefault();

    const { firestore, firebase, item, history, notifyUser } = this.props;

    // reject input if weight = 0
    if (parseFloat(this.weightInput.current.value) === 0) {
      notifyUser("You cannot enter a weight value of zero.", "error");
      return;
    }
    // reject input if weight is not a number
    if (isNaN(this.weightInput.current.value)) {
      notifyUser("You must enter a number for weight", "error");
      return;
    }

    const updatedItem = {
      itemName: this.itemNameInput.current.value,
      material: this.materialInput.current.value,
      quantity: parseInt(this.quantityInput.current.value, 10),
      weight: parseFloat(this.weightInput.current.value),
      weightUnit: this.weightUnitInput.current.value
    };

    firestore
      .update(
        {
          collection: "users",
          doc: firebase.auth().currentUser.uid,
          subcollections: [
            {
              collection: "items",
              doc: item.id
            }
          ]
        },
        updatedItem
      )
      .then(() => history.goBack());
  };

  render() {
    const { item, match } = this.props;
    const { message, messageType } = this.props.notify;

    if (item) {
      // account for delay in updating redux state and this component's props
      if (item.id === match.params.id) {
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
              <div className="card-header">Edit Item</div>
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
                      defaultValue={item.quantity}
                      ref={this.quantityInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Weight Per Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      name="weight"
                      required
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
      } else {
        return <Spinner />;
      }
    } else {
      return <Spinner />;
    }
  }
}

EditItem.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  item: PropTypes.object,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.firebase.auth().currentUser.uid,
      subcollections: [
        {
          collection: "items",
          doc: props.match.params.id
        }
      ],
      storeAs: "item"
    }
  ]),
  connect(
    ({ firestore: { ordered }, notify }, props) => ({
      item: ordered.item && ordered.item[0],
      notify
    }),
    { notifyUser }
  )
)(EditItem);
