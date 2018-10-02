import { DISPLAY_WEIGHT_UNIT, RESOURCE_UNITS, SHOW_TRIVIA } from "./types";

export const displayWeightUnit = weightUnit => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.displayWeightUnit = weightUnit;
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISPLAY_WEIGHT_UNIT,
    payload: weightUnit
  };
};

export const resourceUnits = resourceUnits => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.resourceUnits = resourceUnits;
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: RESOURCE_UNITS,
    payload: resourceUnits
  };
};

export const showTrivia = showTrivia => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.showTrivia = showTrivia;
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SHOW_TRIVIA,
    payload: showTrivia
  };
};
