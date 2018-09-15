import React from "react";
import Summary from "./Summary";
import Sidebar from "./Sidebar";

export default () => {
  return (
    <div className="dashboard row">
      <div className="col-lg non-sidebar order-lg-2">
        <Summary />
      </div>
      <div className="col-lg-4 sidebar order-lg-1 mt-3 mt-lg-0">
        <Sidebar />
      </div>
    </div>
  );
};
