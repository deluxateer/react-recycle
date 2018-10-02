import {
  DISPLAY_WEIGHT_UNIT,
  RESOURCE_UNITS,
  SHOW_TRIVIA
} from "../actions/types";

export default function(state = {}, action) {
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
