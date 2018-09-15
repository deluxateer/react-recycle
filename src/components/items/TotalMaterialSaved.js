import React, { Component } from "react";

class TotalMaterialSaved extends Component {
  //camelCase to spaces for the analogies
  toSpaces = analogyName =>
    analogyName.replace(/([A-Z])/g, " $1").toLowerCase();

  render() {
    const { type, analogies } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            23lbs of {type.charAt(0).toUpperCase() + type.slice(1)} Recycled
          </h5>
          <p className="card-text">You saved:</p>
          <ul className="list-group list-group-flush">
            {analogies.map((analogy, i) => (
              <li key={i} className="list-group-item">
                <span className="badge badge-success badge-pill">XX</span>{" "}
                {analogy.unit} of{" "}
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

export default TotalMaterialSaved;
