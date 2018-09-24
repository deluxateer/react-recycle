import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import aluminum from "../../media/aluminum.jpeg";
import cardboard from "../../media/cardboard.jpeg";
import glass from "../../media/glass.jpeg";
import paper from "../../media/paper.jpeg";
import plastic from "../../media/plastic.jpeg";
import steel from "../../media/steel.jpeg";

class Item extends Component {
  onDeleteClick = () => {
    const { id, firestore, history } = this.props;
    firestore.delete({ collection: "items", doc: id });
  };

  onDuplicateClick = e => {
    e.preventDefault();

    const {
      itemName,
      material,
      weight,
      weightUnit,
      quantity,
      firestore
    } = this.props;

    const newItem = {
      itemName,
      material,
      quantity: parseInt(quantity, 10),
      weight: parseFloat(weight),
      weightUnit,
      creationTimestamp: firestore.Timestamp.now()
    };

    firestore.add({ collection: "items" }, newItem);
  };

  render() {
    // Use ES6 object computed keys to match material types to correct imgs
    const materials = {
      aluminum,
      cardboard,
      glass,
      paper,
      plastic,
      steel
    };

    const { id, itemName, material, weight, weightUnit, quantity } = this.props;

    return (
      <div className="item-card card">
        <img
          className="w-100 h-100"
          src={materials[material.toLowerCase()]}
          alt={material}
        />
        <div className="card-body p-3">
          <div className="d-flex justify-content-between mb-2">
            <div>
              <h5 className="card-title mb-2">{itemName}</h5>
              <h6 className="card-subtitle text-muted">
                {material}, Qty. {quantity}
              </h6>
            </div>
            <div className="d-flex">
              <Link
                className="d-flex text-success"
                to={`/item/edit/${id}`}
                style={{ textDecoration: "none" }}
              >
                <i className="fas fa-pencil-alt" />
              </Link>
              <button
                className="btn btn-link position-relative p-0 ml-3 mr-1"
                type="button"
                data-toggle="modal"
                data-target={`#deleteModal${id.substring(0, 5)}`}
              >
                <i
                  className="fas fa-times position-absolute text-danger"
                  style={{ top: 0 }}
                />
              </button>
              {/* Delete Modal */}
              <div
                className="modal fade"
                id={`deleteModal${id.substring(0, 5)}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`deleteModalLabel${id.substring(0, 5)}`}
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id={`deleteModalLabel${id.substring(0, 5)}`}
                      >
                        Warning
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete this item? This process is
                      irreversible.
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={this.onDeleteClick}
                        className="btn btn-danger"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Yes, I'm sure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text mb-0">
              {weight} {weightUnit} {quantity > 1 ? "each" : null}
            </p>
            <a
              href="#"
              onClick={this.onDuplicateClick}
              className="card-link text-success"
            >
              Duplicate
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  itemName: PropTypes.string.isRequired,
  material: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  weightUnit: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(Item);
