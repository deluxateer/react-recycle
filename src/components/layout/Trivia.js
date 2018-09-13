import React, { Component } from "react";

class Trivia extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="alert alert-info alert-dismissible fade show">
          <h5 className="alert-heading">Did You Know?</h5>
          <p>
            Recycling glass saves 30% of the energy required when producing
            glass from raw materials (soda, ash, sand and limestone). Crushed
            glass, called cullet, melts at a lower temperature than the raw
            materials, which saves energy.
          </p>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Trivia;
