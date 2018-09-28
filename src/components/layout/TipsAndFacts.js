import React, { Component } from "react";
import { tipsAndFactsSource } from "../../lib/tipsAndFacts";

class TipsAndFacts extends Component {
  render() {
    const tipsAndFacts = { ...tipsAndFactsSource };
    // get source link
    const sourceLink = tipsAndFacts.source;
    delete tipsAndFacts["source"];

    const tipsAndFactsJSX = [];
    for (let material in tipsAndFacts) {
      const materialName = (
        <h3 className="mt-3 mb-3" key={material}>
          {material.charAt(0).toUpperCase() + material.slice(1)}
        </h3>
      );
      tipsAndFactsJSX.push(materialName);

      tipsAndFactsJSX.push(<h4 key={`${material}Tips`}>Tips</h4>);
      const materialTips = tipsAndFacts[material].tips.map((tip, currIndex) => (
        <li className="my-2" key={currIndex}>
          {tip}
        </li>
      ));
      tipsAndFactsJSX.push(<ul key={`${material}TipsList`}>{materialTips}</ul>);

      tipsAndFactsJSX.push(<h4 key={`${material}Facts`}>Facts</h4>);
      const materialFacts = tipsAndFacts[material].facts.map(
        (fact, currIndex) => (
          <li className="my-2" key={currIndex}>
            {fact}
          </li>
        )
      );
      tipsAndFactsJSX.push(
        <ul key={`${material}FactsList`}>{materialFacts}</ul>
      );
    }

    return (
      <div className="tipsAndFacts">
        <div className="container">
          <h2 className="mb-4">Tips And Facts</h2>
          {tipsAndFactsJSX}
          <p className="text-secondary mt-3">
            Source for this information can be found{" "}
            <a className="text-success" target="_blank" href={sourceLink}>
              here.
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default TipsAndFacts;
