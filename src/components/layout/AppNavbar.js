import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { calculateResources } from "../../actions/calculateResourcesAction";

class AppNavbar extends Component {
  componentDidUpdate() {
    const { items } = this.props;
    if (items) {
      const { calculateResources } = this.props;
      calculateResources(items);
    }
  }

  render() {
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
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Summary
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
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
                  name@gmail.com
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
                    <i className="fas fa-door-open" /> Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect(
    (state, props) => ({
      items: state.firestore.ordered.items
    }),
    { calculateResources }
  )
)(AppNavbar);
