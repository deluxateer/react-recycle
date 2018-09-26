import { CALCULATE_RESOURCES } from "./types";

export const calculateResources = items => {
  return {
    type: CALCULATE_RESOURCES,
    payload: items
  };
};
