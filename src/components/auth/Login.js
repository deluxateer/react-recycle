import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";

import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailForReset: ""
  };

  componentDidMount() {
    // clear error message if it persisted from before
    this.props.notifyUser(null, null);
  }

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser("Invalid Login Credentials", "error"));
  };

  sendPasswordReset = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { emailForReset } = this.state;

    firebase
      .auth()
      .sendPasswordResetEmail(emailForReset)
      .then(() =>
        notifyUser("A Password Reset email was sent to you.", "success")
      )
      .catch(err =>
        notifyUser(
          "Password Reset has failed. Try making an account first.",
          "error"
        )
      );

    // close modal without jQuery
    const closeButton = document.querySelector(
      "#passwordResetForm .btn-secondary"
    );
    closeButton.click();
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
                  <i className="fas fa-lock" /> Login
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
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-success btn-block"
                />
              </form>
              <button
                type="button"
                className="btn btn-link btn-sm text-success px-0"
                data-toggle="modal"
                data-target="#passwordResetCenter"
              >
                Forgot Password?
              </button>
              {/* Password Reset Modal */}
              <div
                className="modal fade"
                id="passwordResetCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="passwordResetCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="passwordResetLongTitle">
                        Enter Your Email Address
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
                    <form
                      id="passwordResetForm"
                      onSubmit={this.sendPasswordReset}
                    >
                      <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="emailForReset" className="sr-only">
                          Password
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="emailForReset"
                          placeholder="user@mail.com"
                          name="emailForReset"
                          value={this.state.emailForReset}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-success">
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
