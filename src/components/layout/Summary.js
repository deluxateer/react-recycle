import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import convert from "convert-units";
import PropTypes from "prop-types";

import Trivia from "./Trivia";
import TotalMaterialSaved from "../items/TotalMaterialSaved";

class Summary extends Component {
  state = {
    totalEnergy: 0,
    totalMaterials: [
      {
        type: "Aluminum",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 14000 },
          { name: "oil", unit: "gal", perTon: 1663 },
          { name: "landfillSpace", unit: "yd3", perTon: 10 }
        ]
      },
      {
        type: "Cardboard",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 390 },
          { name: "oil", unit: "gal", perTon: 46 }
        ]
      },
      {
        type: "Glass",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 42 },
          { name: "oil", unit: "gal", perTon: 5 },
          { name: "landfillSpace", unit: "yd3", perTon: 2 },
          { name: "airPollutants", unit: "lb", perTon: 7.5 },
          { name: "sand", unit: "lb", perTon: 1330 },
          { name: "sodaAsh", unit: "lb", perTon: 433 }
        ]
      },
      {
        type: "Paper",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 4100 },
          { name: "oil", unit: "gal", perTon: 380 },
          { name: "landfillSpace", unit: "yd3", perTon: 3.3 },
          { name: "airPollutants", unit: "lb", perTon: 60 },
          { name: "water", unit: "gal", perTon: 7000 },
          { name: "trees", unit: "n/a", perTon: 17 }
        ]
      },
      {
        type: "Plastic",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 5774 },
          { name: "oil", unit: "gal", perTon: 685 },
          { name: "landfillSpace", unit: "yd3", perTon: 30 }
        ]
      },
      {
        type: "Steel",
        analogies: [
          { name: "energy", unit: "kWh", perTon: 642 },
          { name: "oil", unit: "gal", perTon: 76 },
          { name: "landfillSpace", unit: "yd3", perTon: 4 }
        ]
      }
    ]
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
