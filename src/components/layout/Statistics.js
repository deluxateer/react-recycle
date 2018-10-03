import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import Chart from "chart.js";
import PropTypes from "prop-types";
import { calculateResources } from "../../lib/calculateResources";

class Statistics extends Component {
  state = {
    displayDuration: "Weekly",
    graphType: "pie"
  };

  renderChart = () => {
    const { items, settings, firestore } = this.props;
    const { Timestamp } = firestore;

    // filter and keep the most recent items by this week/month/year
    let timeFilter = new Date();
    switch (this.state.displayDuration) {
      case "Weekly":
        timeFilter.setDate(timeFilter.getDate() - 7);
        break;
      case "Monthly":
        timeFilter.setMonth(timeFilter.getMonth() - 1);
        break;
      case "Yearly":
        timeFilter.setFullYear(timeFilter.getFullYear() - 1);
        break;
      // Lifetime by default
      default:
        timeFilter = new Date(0);
        break;
    }

    const filteredItems = items.filter(
      item =>
        item.creationTimestamp.seconds > Timestamp.fromDate(timeFilter).seconds
    );

    const totalResources = calculateResources(filteredItems, settings);

    if (totalResources) {
      // prepare data by removing totalEnergy and extracting totalWeights
      // recycled for each material
      delete totalResources["totalEnergy"];
      const amountsSaved = Object.values(totalResources);
      const weightsRecycled = amountsSaved.map(amount => amount.totalWeight);

      let ctx = document.getElementById("chart").getContext("2d");
      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: this.state.graphType,

        // The data for our dataset
        data: {
          labels: Object.keys(totalResources),
          datasets: [
            {
              label: "Recycled Amount",
              backgroundColor: [
                "rgba(195, 218, 137, 0.7)", // color for Aluminum
                "rgba(58, 81, 142, 0.7)", // color for Cardboard
                "rgba(179, 112, 156, 0.7)", // color for Glass
                "rgba(211, 166, 71, 0.7)", // color for Paper
                "rgba(134, 193, 122, 0.7)", // color for Plastic
                "rgba(224, 141, 149, 0.7)" // color for Steel
              ],
              data: weightsRecycled
            }
          ]
        },

        // Configuration options go here
        options: {
          events: ["mousemove"],
          // prevent graph from being small on mobile devices
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Recycled Amount vs. Material"
          },
          tooltips: {
            callbacks: {
              // renders correct weight units for y-axis
              label: function(tooltipItem, data) {
                let labelValue =
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ] || "";
                if (labelValue) {
                  labelValue = parseFloat(labelValue).toFixed(2);
                }

                return `${labelValue} ${settings.displayWeightUnit}`;
              }
            }
          },
          scales: this.state.graphType === "bar" && {
            yAxes: [
              {
                ticks: {
                  callback: function(value, index, values) {
                    return `${value} ${settings.displayWeightUnit}`;
                  }
                }
              }
            ]
          }
        }
      });
    }
  };

  chooseGraphType = e => {
    this.setState({ [e.target.name]: e.target.value });

    // reset all event handlers (ie hover) on chart by cloning it and removing old one
    const oldChart = document.getElementById("chart");
    const newChart = oldChart.cloneNode(true);
    oldChart.parentNode.replaceChild(newChart, oldChart);
  };

  componentDidMount() {
    this.renderChart();
  }
  componentDidUpdate() {
    this.renderChart();
  }

  render() {
    return (
      <div id="statistics">
        <div className="time-denominations d-flex justify-content-around mb-3">
          <button
            name="displayDuration"
            value="Weekly"
            onClick={this.chooseGraphType}
            className="btn btn-success"
          >
            Weekly
          </button>
          <button
            name="displayDuration"
            value="Monthly"
            onClick={this.chooseGraphType}
            className="btn btn-success"
          >
            Monthly
          </button>
          <button
            name="displayDuration"
            value="Yearly"
            onClick={this.chooseGraphType}
            className="btn btn-success"
          >
            Yearly
          </button>
          <button
            name="displayDuration"
            value="Lifetime"
            onClick={this.chooseGraphType}
            className="btn btn-success"
          >
            Lifetime
          </button>
        </div>
        <p className="text-center my-3">
          Rendering Duration: <b>{this.state.displayDuration}</b>
        </p>
        <div
          className="chart-container"
          style={{ position: "relative", minHeight: "300px" }}
        >
          <canvas id="chart" />
        </div>
        <div className="chart-types d-flex justify-content-around mt-3 mb-2">
          <button
            onClick={this.chooseGraphType}
            name="graphType"
            value="pie"
            className="btn btn-success"
          >
            Pie
          </button>
          <button
            onClick={this.chooseGraphType}
            name="graphType"
            value="bar"
            className="btn btn-success"
          >
            Bar
          </button>
        </div>
        <p>
          The Pie chart emphasizes the composition of your recycled materials.
        </p>
        <p>The Bar chart emphasizes the quantity of your recycled materials.</p>
        <p className="text-secondary">
          <b>Tip:</b> Hover over the chart to see exact values, or tap on it if
          viewing from a mobile device.
        </p>
      </div>
    );
  }
}

Statistics.propTypes = {
  firestore: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  items: PropTypes.array,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: "users",
      doc: props.firebase.auth().currentUser.uid,
      subcollections: [{ collection: "items" }],
      storeAs: "userItems"
    }
  ]),
  connect((state, props) => ({
    items: state.firestore.ordered.userItems,
    settings: state.settings
  }))
)(Statistics);
