import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import convert from "convert-units";
import PropTypes from "prop-types";

import Trivia from "./Trivia";
import TotalMaterialSaved from "../items/TotalMaterialSaved";

import { materialsAndAnalogies as totalMaterials } from "../../lib/materialsAndAnalogies";

class Summary extends Component {
  state = {
    totalEnergy: 0,
    totalMaterials
  };

  static getDerivedStateFromProps(props, state) {
    const { items } = props;
    const { totalMaterials } = state;

    if (items) {
      const totalResourcesSaved = {
        totalEnergy: 0
      };
      // Calculate total resources saved for each material type
      totalMaterials.forEach(totalMaterial => {
        // take only elements that match the material you are calcuating for
        const singleElementItems = items.filter(
          item => item.material === totalMaterial.type
        );

        const totalWeight = singleElementItems.reduce((total, item) => {
          // convert item to user chosen weight unit here
          // @todo: change to units chosen from user settings
          const adjustedWeight = convert(item.weight)
            .from(item.weightUnit)
            .to("oz");
          return total + parseFloat(adjustedWeight * item.quantity);
        }, 0);

        // convert to tons for calculating correct ratios
        const totalTons = convert(totalWeight)
          .from("oz") //units chosen from user settings
          .to("t");

        const resourcesSaved = {};
        totalMaterial.analogies.forEach(
          analogy =>
            (resourcesSaved[analogy.name] = parseFloat(
              totalTons * analogy.perTon
            ))
        );
        resourcesSaved["totalWeight"] = totalWeight;
        resourcesSaved["totalWeightUnit"] = "oz";

        totalResourcesSaved[totalMaterial.type] = resourcesSaved;
        totalResourcesSaved.totalEnergy += resourcesSaved.energy;
      });

      return {
        ...totalResourcesSaved
      };
    }

    return null;
  }

  render() {
    const { totalEnergy, totalMaterials } = this.state;
    return (
      <React.Fragment>
        <Trivia />
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
              resourcesSaved={this.state[material.type]}
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
    items: state.firestore.ordered.items
  }))
)(Summary);
