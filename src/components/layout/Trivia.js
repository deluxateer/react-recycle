import React from "react";

const Trivia = props => {
  return (
    <div className="alert alert-info alert-dismissible fade show">
      <h5 className="alert-heading">Did You Know?</h5>
      <p>{props.fact}</p>
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Trivia;
