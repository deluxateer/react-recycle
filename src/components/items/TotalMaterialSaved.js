import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import convert from "convert-units";
import PropTypes from "prop-types";

class TotalMaterialSaved extends Component {
  state = {
    energy: 0,
    totalWeight: 0,
    totalWeightUnit: "oz"
  };

  componentDidMount() {
    // this.props.sendTotalEnergy(this.state.energy);
    // console.log(
    //   `sending energy now -compDidMount ${this.props.type} ${this.state.energy}`
    // );
    // this.props.sendTotalEnergy(5);
  }

  // @todo: figure out the math for calculating totals of materials and send it to Summary comp
  static getDerivedStateFromProps(props, state) {
    const { items } = props;

    if (items) {
      // take only elements that match the material you are calcuating for
      const singleElementItems = items.filter(
        item => item.material == props.type
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
      props.analogies.forEach(
        analogy =>
          (resourcesSaved[analogy.name] = parseFloat(
            totalTons * analogy.perTon
          ))
      );

      // //send total energy to Summary for calculating total Energy of All Materials
      // console.log(
      //   `Got energy in deriveStateFromProps - ${props.type} ${
      //     resourcesSaved["energy"]
      //   }`
      // );
      // props.sendTotalEnergy(state.energy);

      return {
        ...resourcesSaved,
        totalWeight: totalWeight,
        totalWeightUnit: "oz"
      };
    }

    return null;
  }

  //camelCase to spaces for the analogies
  toSpaces = analogyName =>
    analogyName.replace(/([A-Z])/g, " $1").toLowerCase();

  render() {
    const { type, analogies } = this.props;
    const { totalWeight, totalWeightUnit } = this.state;
    // console.log(`rendering - totalMaterial, material: ${type}`);

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {parseFloat(totalWeight).toFixed(2)} {totalWeightUnit} of {type}{" "}
            Recycled
          </h5>
          <p className="card-text">You saved:</p>
          <ul className="list-group list-group-flush">
            {analogies.map((analogy, i) => (
              <li key={i} className="list-group-item">
                <span className="badge badge-success badge-pill">
                  {parseFloat(this.state[analogy.name]).toFixed(2)}
                </span>{" "}
                {analogy.name !== "trees"
                  ? convert().describe(analogy.unit).plural + " of"
                  : null}{" "}
                <span className="text-capitalize">
                  {this.toSpaces(analogy.name)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TotalMaterialSaved.propTypes = {
  type: PropTypes.string.isRequired,
  analogies: PropTypes.array.isRequired,
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(TotalMaterialSaved);
