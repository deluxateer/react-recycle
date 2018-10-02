import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import convert from "convert-units";

class TotalMaterialSaved extends Component {
  //camelCase to spaces for the analogies
  toSpaces = analogyName =>
    analogyName.replace(/([A-Z])/g, " $1").toLowerCase();

  render() {
    const { type, analogies, resourcesSaved, settings } = this.props;
    const { totalWeight, totalWeightUnit } = resourcesSaved;
    const { resourceUnits } = settings;

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {/* Lists total weight (rounded to 2 decimal places) and weight unit (conversions already made in parent component). Also lists material type */}
            {parseFloat(totalWeight).toFixed(2)} {totalWeightUnit} of {type}{" "}
            Recycled
          </h5>
          <p className="card-text">You saved:</p>
          <ul className="list-group list-group-flush">
            {analogies.map((analogy, i) => (
              <li key={i} className="list-group-item">
                <span className="badge badge-success badge-pill">
                  {/* 
                    analogy.name = resource name
                    resourcesSaved[analogy.name] = numeric amount saved for that resource unconverted
                    analogy.unit = default unit for this resource.
                    resourceUnits[analogy.name] = user selected unit for this resource

                    Helpful log to see all values:
                    console.log(
                      analogy.name,
                      resourcesSaved[analogy.name],
                      analogy.unit,
                      resourceUnits[analogy.name]
                    )
                  */}

                  {/*
                    Convert numeric amount saved to user-chosen units, unless it is trees or energy.
                    Trees is unitless and energy will always be kWh.
                  */}
                  {analogy.name === "energy" || analogy.name === "trees"
                    ? parseFloat(resourcesSaved[analogy.name]).toFixed(2)
                    : parseFloat(
                        convert(resourcesSaved[analogy.name])
                          .from(analogy.unit)
                          .to(resourceUnits[analogy.name])
                      ).toFixed(2)}
                </span>{" "}
                {/*
                  Selects the correct unit for the numeric amount saved.
                  Trees is unitless, so always render null.
                  Energy is always kWh, so don't convert it.
                  Otherwise, convert the default unit to user-selected unit
                */}
                {analogy.name === "trees" ? null : null}
                {analogy.name === "energy"
                  ? convert().describe(analogy.unit).plural + " of"
                  : null}
                {analogy.name !== "trees" && analogy.name !== "energy"
                  ? convert().describe(resourceUnits[analogy.name]).plural +
                    " of"
                  : null}{" "}
                {/* Capitalized name of the resource */}
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

export default connect((state, props) => ({
  settings: state.settings
}))(TotalMaterialSaved);
