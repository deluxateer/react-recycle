import { CALCULATE_RESOURCES } from "../actions/types";
import { calculateResources } from "../lib/calculateResources";

const initialState = {
  totalResources: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_RESOURCES:
      return {
        totalResources: calculateResources(action.payload)
      };
    default:
      return state;
  }
}
