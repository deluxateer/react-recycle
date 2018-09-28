import React from "react";

const Spinner = () => {
  return (
    <div style={{ minHeight: "350px", height: "90vh" }}>
      <div
        className="w-50 position-relative mx-auto"
        style={{ height: "100%" }}
      >
        <div className="spinner" />
      </div>
    </div>
  );
};

export default Spinner;
