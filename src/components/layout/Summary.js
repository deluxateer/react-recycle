import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

import Trivia from "./Trivia";
import TotalMaterialSaved from "../items/TotalMaterialSaved";

import { materialsAndAnalogies as totalMaterials } from "../../lib/materialsAndAnalogies";
import { calculateResources } from "../../lib/calculateResources";

class Summary extends Component {
  state = { totalMaterials };

  render() {
    const { items, settings } = this.props;
    const totalResources = calculateResources(items, settings);
    const { totalEnergy } = totalResources;
    const { totalMaterials } = this.state;

    return (
      <React.Fragment>
        {settings.showTrivia ? <Trivia /> : null}
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
          <p className="lead">
            Way to go! Keep up the good work. You can find tips on saving more
            energy{" "}
            <b>
              <Link to="/tipsfacts" className="text-success">
                here.
              </Link>
            </b>
          </p>
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
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items,
    settings: state.settings
  }))
)(Summary);
