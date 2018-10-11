import React from "react";

function constructBranches(branchNumber) {
  if (branchNumber > 0) {
    return (
      <React.Fragment>
        <div>{constructBranches(branchNumber - 1)}</div>
        <div>{constructBranches(branchNumber - 1)}</div>
      </React.Fragment>
    );
  }
}

export const animatedTree = branchNumber => {
  const tree = <div className="trunk">{constructBranches(branchNumber)}</div>;
  return tree;
};
