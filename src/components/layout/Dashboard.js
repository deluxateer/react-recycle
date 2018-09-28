import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Summary from "./Summary";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import Statistics from "./Statistics";

class Dashboard extends Component {
  render() {
    const { items, history } = this.props;

    if (items) {
      return (
        <div className="dashboard row">
          <div className="col-lg non-sidebar order-lg-2">
            {history.location.pathname === "/statistics" ? (
              <Statistics />
            ) : (
              <Summary />
            )}
          </div>
          <div className="col-lg-4 sidebar order-lg-1 mt-3 mt-lg-0">
            <Sidebar />
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Dashboard.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Dashboard);
