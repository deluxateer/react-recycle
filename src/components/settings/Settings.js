import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  displayWeightUnit,
  resourceUnits,
  showTrivia
} from "../../actions/settingsActions";
import { compose } from "redux";

class Settings extends Component {
  state = {
    ...this.props.settings.resourceUnits
  };

  setWeightUnit = e => {
    this.props.displayWeightUnit(e.target.value);
  };

  setResourceUnits = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });

    // recreating object here because setState can only run after this func resolves
    this.props.resourceUnits({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  setShowTrivia = e => {
    this.props.showTrivia(e.target.checked);
  };

  render() {
    const {
      showTrivia,
      displayWeightUnit,
      resourceUnits
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link text-success">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  id="showTriviaBox"
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!showTrivia}
                  onChange={this.setShowTrivia}
                  className="mr-2"
                />
                <label htmlFor="showTriviaBox">
                  Show "Did You Know?" Trivia Box
                </label>{" "}
              </div>
              <div className="form-group">
                <label htmlFor="weightUnit">
                  Weight Unit to display (Items you add in the future will be
                  converted to this unit):{" "}
                </label>
                <select
                  name="weightUnit"
                  className="custom-select"
                  onChange={this.setWeightUnit}
                  defaultValue={displayWeightUnit}
                >
                  <option value="" disabled>
                    Choose a Unit
                  </option>
                  <option value="g">Grams (g)</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <h5>Units to use for Resources Saved: </h5>
                </div>
                <div className="col-md">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="mr-2">Oil:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="oil-gal"
                          name="oil"
                          value="gal"
                          checked={this.state.oil === "gal"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="oil-gal"
                        >
                          Gallons (gal)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="oil-l"
                          name="oil"
                          value="l"
                          checked={this.state.oil === "l"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label className="custom-control-label" htmlFor="oil-l">
                          Liters (l)
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mr-2">Landfill Space:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="landfillSpace-ft3"
                          name="landfillSpace"
                          value="ft3"
                          checked={this.state.landfillSpace === "ft3"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="landfillSpace-ft3"
                        >
                          Feet Cubed (ft3)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="landfillSpace-yd3"
                          name="landfillSpace"
                          value="yd3"
                          checked={this.state.landfillSpace === "yd3"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="landfillSpace-yd3"
                        >
                          Yards Cubed (yd3)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="landfillSpace-m3"
                          name="landfillSpace"
                          value="m3"
                          checked={this.state.landfillSpace === "m3"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="landfillSpace-m3"
                        >
                          Meters Cubed (m3)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="landfillSpace-km3"
                          name="landfillSpace"
                          value="km3"
                          checked={this.state.landfillSpace === "km3"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="landfillSpace-km3"
                        >
                          Kilometers Cubed (km3)
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mr-2">Air Pollutants:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="airPollutants-oz"
                          name="airPollutants"
                          value="oz"
                          checked={this.state.airPollutants === "oz"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="airPollutants-oz"
                        >
                          Ounces (oz)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="airPollutants-lb"
                          name="airPollutants"
                          value="lb"
                          checked={this.state.airPollutants === "lb"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="airPollutants-lb"
                        >
                          Pounds (lb)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="airPollutants-g"
                          name="airPollutants"
                          value="g"
                          checked={this.state.airPollutants === "g"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="airPollutants-g"
                        >
                          Grams (g)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="airPollutants-kg"
                          name="airPollutants"
                          value="kg"
                          checked={this.state.airPollutants === "kg"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="airPollutants-kg"
                        >
                          Kilograms (kg)
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mr-2">Sand:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sand-oz"
                          name="sand"
                          value="oz"
                          checked={this.state.sand === "oz"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sand-oz"
                        >
                          Ounces (oz)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sand-lb"
                          name="sand"
                          value="lb"
                          checked={this.state.sand === "lb"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sand-lb"
                        >
                          Pounds (lb)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sand-g"
                          name="sand"
                          value="g"
                          checked={this.state.sand === "g"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sand-g"
                        >
                          Grams (g)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sand-kg"
                          name="sand"
                          value="kg"
                          checked={this.state.sand === "kg"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sand-kg"
                        >
                          Kilograms (kg)
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mr-2">Soda Ash:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sodaAsh-oz"
                          name="sodaAsh"
                          value="oz"
                          checked={this.state.sodaAsh === "oz"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sodaAsh-oz"
                        >
                          Ounces (oz)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sodaAsh-lb"
                          name="sodaAsh"
                          value="lb"
                          checked={this.state.sodaAsh === "lb"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sodaAsh-lb"
                        >
                          Pounds (lb)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sodaAsh-g"
                          name="sodaAsh"
                          value="g"
                          checked={this.state.sodaAsh === "g"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sodaAsh-g"
                        >
                          Grams (g)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="sodaAsh-kg"
                          name="sodaAsh"
                          value="kg"
                          checked={this.state.sodaAsh === "kg"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="sodaAsh-kg"
                        >
                          Kilograms (kg)
                        </label>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label className="mr-2">Water:</label>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="water-gal"
                          name="water"
                          value="gal"
                          checked={this.state.water === "gal"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="water-gal"
                        >
                          Gallons (gal)
                        </label>
                      </div>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          id="water-l"
                          name="water"
                          value="l"
                          checked={this.state.water === "l"}
                          onChange={this.setResourceUnits}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="water-l"
                        >
                          Liters (l)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <p className="text-secondary">
              <b>Tip:</b> Changes you make to these settings will automatically
              be saved.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  displayWeightUnit: PropTypes.func.isRequired,
  resourceUnits: PropTypes.func.isRequired,
  showTrivia: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    settings: state.settings
  }),
  { displayWeightUnit, resourceUnits, showTrivia }
)(Settings);
