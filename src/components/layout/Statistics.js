import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import convert from "convert-units";
import Chart from "chart.js";
import PropTypes from "prop-types";

class Statistics extends Component {
  componentDidMount() {
    let ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
    // console.log(chart);
    // console.log(this.props.items);
  }

  render() {
    return (
      <div id="statistics">
        <div className="time-denominations d-flex justify-content-around mb-3">
          <button className="btn btn-success">Weekly</button>
          <button className="btn btn-success">Monthly</button>
          <button className="btn btn-success">Yearly</button>
        </div>
        <canvas id="chart" />
        <div className="chart-types d-flex justify-content-around mt-3 mb-2">
          <button className="btn btn-success">Pie</button>
          <button className="btn btn-success">Bar</button>
        </div>
        <p>
          The Pie chart emphasizes the composition of your recycled materials.
        </p>
        <p>The Bar chart emphasizes the quantity of your recycled materials.</p>
      </div>
    );
  }
}

Statistics.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect((state, props) => ({
    items: state.firestore.ordered.items
  }))
)(Statistics);
