import {
  DISPLAY_WEIGHT_UNIT,
  RESOURCE_UNITS,
  SHOW_TRIVIA
} from "../actions/types";

const initialState = {
  displayWeightUnit: "oz",
  resourceUnits: {
    oil: "gal",
    landfillSpace: "yd3",
    airPollutants: "lb",
    sand: "lb",
    sodaAsh: "lb",
    water: "gal"
  },
  showTrivia: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_WEIGHT_UNIT:
      return {
        ...state,
        displayWeightUnit: action.payload
      };
    case RESOURCE_UNITS:
      return {
        ...state,
        resourceUnits: action.payload
      };
    case SHOW_TRIVIA:
      return {
        ...state,
        showTrivia: action.payload
      };
    default:
      return state;
  }
}
