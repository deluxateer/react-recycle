import React from "react";
import Summary from "./Summary";
import Sidebar from "./Sidebar";

export default () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md">
        <Summary />
      </div>
    </div>
  );
};
