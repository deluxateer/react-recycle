import React, { Component } from "react";
import Trivia from "./Trivia";
import TotalMaterialSaved from "../items/TotalMaterialSaved";

class Summary extends Component {
  state = {
    totalMaterials: [
      {
        type: "aluminum",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" },
          { name: "landfillSpace", unit: "yd3" }
        ]
      },
      {
        type: "cardboard",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" }
        ]
      },
      {
        type: "glass",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" },
          { name: "landfillSpace", unit: "yd3" },
          { name: "airPollutants", unit: "lb" },
          { name: "sand", unit: "lb" },
          { name: "sodaAsh", unit: "lb" }
        ]
      },
      {
        type: "paper",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" },
          { name: "landfillSpace", unit: "yd3" },
          { name: "airPollutants", unit: "lb" },
          { name: "water", unit: "gal" },
          { name: "trees", unit: "n/a" }
        ]
      },
      {
        type: "plastic",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" },
          { name: "landfillSpace", unit: "yd3" }
        ]
      },
      {
        type: "steel",
        analogies: [
          { name: "energy", unit: "kWh" },
          { name: "oil", unit: "gal" },
          { name: "landfillSpace", unit: "yd3" }
        ]
      }
    ]
  };

  render() {
    const { totalMaterials } = this.state;

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
          <h1 className="display-4">Total Savings: 768kWh!</h1>
          <p className="lead">
            Way to go! Keep up the good work. You can find tips on saving more
            energy <b>here.</b>
          </p>
        </div>
        <div className="totalMaterialsGrid">
          {totalMaterials.map((material, i) => (
            <TotalMaterialSaved
              key={i}
              type={material.type}
              analogies={material.analogies}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Summary;
