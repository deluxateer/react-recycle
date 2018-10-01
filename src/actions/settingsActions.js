import { DISPLAY_WEIGHT_UNIT, RESOURCE_UNITS, SHOW_TRIVIA } from "./types";

export const displayWeightUnit = weightUnit => {
  return {
    type: DISPLAY_WEIGHT_UNIT,
    payload: weightUnit
  };
};

export const resourceUnits = resourceUnits => {
  return {
    type: RESOURCE_UNITS,
    payload: resourceUnits
  };
};

export const showTrivia = showTrivia => {
  return {
    type: SHOW_TRIVIA,
    payload: showTrivia
  };
};
