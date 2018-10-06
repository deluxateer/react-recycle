import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";

import Alert from "../layout/Alert";
import { defaultItems } from "../../lib/defaultItems";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  componentDidMount() {
    // clear error message if it persisted from before
    this.props.notifyUser(null, null);
  }

  onSubmit = e => {
    e.preventDefault();

    const { firebase, firestore, notifyUser } = this.props;
    const { email, password, confirmPassword } = this.state;

    // check if confirmPassword matches
    if (password !== confirmPassword) {
      notifyUser("Your passwords do not match.", "error");
      return;
    }

    // Register with firebase
    firebase
      .createUser({ email, password })
      .then(userData => {
        defaultItems.forEach(item => {
          firestore.add(
            {
              collection: "users",
              doc: firebase.auth().currentUser.uid,
              subcollections: [{ collection: "items" }]
            },
            item
          );
        });
      })
      .catch(err => notifyUser("That User Already Exists", "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message, messageType } = this.props.notify;

    return (
      <div className="row" style={{ height: `${window.innerHeight}px` }}>
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-success">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    required
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
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
)(Register);
