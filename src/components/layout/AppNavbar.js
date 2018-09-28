import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-recycle" /> React Recycle
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Summary
                  </Link>
                </li>
              ) : null}
            </ul>
            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/tipsfacts" className="nav-link">
                      <i className="fas fa-lightbulb" /> Tips &amp; Facts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/statistics" className="nav-link">
                      <i className="fas fa-chart-bar" /> Statistics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/items" className="nav-link">
                      <i className="fas fa-clipboard-list" /> Items
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/item/add" className="nav-link">
                      <i className="fas fa-plus" /> Add
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#!"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {auth.email}
                    </a>
                    <div
                      className="dropdown-menu bg-success"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link to="/settings" className="dropdown-item text-light">
                        <i className="fas fa-cog" /> Settings
                      </Link>
                      <a
                        className="dropdown-item text-light"
                        href="#!"
                        onClick={this.onLogoutClick}
                      >
                        <i className="fas fa-sign-out-alt" /> Logout
                      </a>
                    </div>
                  </li>
                </React.Fragment>
              ) : null}
              {!isAuthenticated ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <i className="fas fa-user-plus" /> Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <i className="fas fa-sign-in-alt" /> Login
                    </Link>
                  </li>
                </React.Fragment>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
