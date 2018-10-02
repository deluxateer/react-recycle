import { materialsAndAnalogies as totalMaterials } from "./materialsAndAnalogies";
import convert from "convert-units";

export function calculateResources(items, settings) {
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
      const adjustedWeight = convert(item.weight)
        .from(item.weightUnit)
        .to(settings.displayWeightUnit);
      // get the subtotal weight by multiplying the weight per quantity
      // by the total quantity
      return total + parseFloat(adjustedWeight * item.quantity);
    }, 0);

    // convert to tons for calculating correct ratios
    const totalTons = convert(totalWeight)
      .from(settings.displayWeightUnit) //units chosen from user settings
      .to("t");

    const resourcesSaved = {};
    // calculate the amounts saved for each analogy of the current material
    totalMaterial.analogies.forEach(
      analogy =>
        (resourcesSaved[analogy.name] = parseFloat(totalTons * analogy.perTon))
    );
    resourcesSaved["totalWeight"] = totalWeight;
    resourcesSaved["totalWeightUnit"] = settings.displayWeightUnit;

    // put all the data calculated for the current material into the
    // bucket that holds all materials' data
    totalResourcesSaved[totalMaterial.type] = resourcesSaved;
    totalResourcesSaved.totalEnergy += resourcesSaved.energy;
  });

  return totalResourcesSaved;
}
