import React, { Component } from "react";
import convert from "convert-units";
import PropTypes from "prop-types";

class TotalMaterialSaved extends Component {
  //camelCase to spaces for the analogies
  toSpaces = analogyName =>
    analogyName.replace(/([A-Z])/g, " $1").toLowerCase();

  render() {
    const { type, analogies, resourcesSaved } = this.props;
    const { totalWeight, totalWeightUnit } = resourcesSaved;

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
                  {parseFloat(resourcesSaved[analogy.name]).toFixed(2)}
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
  resourcesSaved: PropTypes.object.isRequired
};

export default TotalMaterialSaved;
