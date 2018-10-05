import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Trivia from "./Trivia";
import TotalMaterialSaved from "../items/TotalMaterialSaved";

import { materialsAndAnalogies as totalMaterials } from "../../lib/materialsAndAnalogies";
import { calculateResources } from "../../lib/calculateResources";
import { getRandomFact } from "../../lib/tipsAndFacts";

class Summary extends Component {
  constructor(props) {
    super(props);
    const randomFact = getRandomFact();

    this.state = {
      totalMaterials,
      randomFact
    };
  }

  render() {
    const { items, settings } = this.props;
    const totalResources = calculateResources(items, settings);
    const { totalEnergy } = totalResources;
    const { totalMaterials } = this.state;

    return (
      <React.Fragment>
        {settings.showTrivia ? <Trivia fact={this.state.randomFact} /> : null}
        <div
          className="jumbotron"
          style={{
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
            color: "#155724"
          }}
        >
          <h1 className="display-4">
            Total Savings: {parseFloat(totalEnergy).toFixed(2)} kWh!
          </h1>
          {items.length > 0 ? (
            <p className="lead">
              Way to go! Keep up the good work. You can find tips on saving more
              energy{" "}
              <b>
                <Link to="/tipsfacts" className="text-success">
                  here.
                </Link>
              </b>
            </p>
          ) : (
            <p className="lead">
              You have not recycled any items yet. You should try{" "}
              <Link to="/items/add" className="text-success">
                adding some!
              </Link>
            </p>
          )}
        </div>
        <div className="totalMaterialsGrid">
          {totalMaterials.map((material, i) => (
            <TotalMaterialSaved
              key={i}
              type={material.type}
              analogies={material.analogies}
              resourcesSaved={totalResources[material.type]}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

Summary.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  items: PropTypes.array,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.firebase.auth().currentUser.uid,
      subcollections: [{ collection: "items" }],
      storeAs: "userItems"
    }
  ]),
  connect((state, props) => {
    return {
      items: state.firestore.ordered.userItems,
      settings: state.settings
    };
  })
)(Summary);
