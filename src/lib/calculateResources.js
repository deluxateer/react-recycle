import { materialsAndAnalogies as totalMaterials } from "./materialsAndAnalogies";
import convert from "convert-units";

export function calculateResources(items) {
  const totalResourcesSaved = {
    totalEnergy: 0
  };
  // Calculate total resources saved for each material type
  totalMaterials.forEach(totalMaterial => {
    // take only elements that match the material you are calcuating for
    const singleElementItems = items.filter(
      item => item.material === totalMaterial.type
    );

    const totalWeight = singleElementItems.reduce((total, item) => {
      // convert item to user chosen weight unit here
      // @todo: change to units chosen from user settings
      const adjustedWeight = convert(item.weight)
        .from(item.weightUnit)
        .to("oz");
      return total + parseFloat(adjustedWeight * item.quantity);
    }, 0);

    // convert to tons for calculating correct ratios
    const totalTons = convert(totalWeight)
      .from("oz") //units chosen from user settings
      .to("t");

    const resourcesSaved = {};
    totalMaterial.analogies.forEach(
      analogy =>
        (resourcesSaved[analogy.name] = parseFloat(totalTons * analogy.perTon))
    );
    resourcesSaved["totalWeight"] = totalWeight;
    resourcesSaved["totalWeightUnit"] = "oz";

    totalResourcesSaved[totalMaterial.type] = resourcesSaved;
    totalResourcesSaved.totalEnergy += resourcesSaved.energy;
  });

  return totalResourcesSaved;
}
