export const tipsAndFactsSource = {
  aluminum: {
    tips: [
      "Prepare aluminum cans for recycling by either crushing the cans to save space or leaving them uncrushed.",
      "Cans that are rinsed out will have little or no odor and are less likely to attract bugs."
    ],
    facts: [
      "Recycling aluminum takes 95% less energy than making aluminum from raw materials."
    ]
  },
  cardboard: {
    tips: [
      "Prepare cardboard for recycling by removing all other materials in the box such as plastic wrap, polystyrene peanuts and other packing materials.",
      "Break down cardboard boxes to save storage space.",
      "Try to keep cardboard dry and free from food waste. Cardboard can get wet and still be recycled, but is more difficult to carry due to the added weight of the water."
    ],
    facts: [
      "Recycling one ton of cardboard saves over 9 cubic yards of landfill space.",
      "Recycled cardboard saves 24% of the total energy needed for virgin cardboard."
    ]
  },
  glass: {
    tips: [
      "Prepare glass containers for recycling by rinsing out with water.",
      "Labels on glass containers do not have to be removed because they are removed during the crushing process and/or burned off during the melting process.",
      "Avoid breaking the glass and mixing broken colors together as this may make the glass unacceptable for recycling."
    ],
    facts: [
      "Recycling glass saves 30% of the energy required when producing glass from raw materials (soda, ash, sand and limestone). Crushed glass, called cullet, melts at a lower temperature than the raw materials, which saves energy.",
      "The United States throws away enough glass bottles and jars to fill a 1,350 square foot building every week."
    ]
  },
  paper: {
    tips: [
      "Recyclable paper includes: Magazines and catalogs, telephone books, direct mail, brochures, pamphlets and booklets in addition to cereal, cake, chip and cracker boxes.",
      "Be sure to remove the liner and all food from the box, flatten the box and place flattened box in a paper sack with your junk mail, mixed paper, magazines and catalogs.",
      "Non-recyclable paper includes tissue, waxed and carbon paper."
    ],
    facts: [
      "Recycled newspaper saves 34 to 60% of the total energy needed for virgin newsprint.",
      "10 million tons of newsprint is thrown away each year in the United States.",
      "Approximately 65,000 to 75,000 trees are needed to produce paper for the Sunday edition of the New York Times.",
      "4.5 million tons of office paper is thrown away each year in the United States.",
      "Enough office and writing paper is thrown away each year to build a 12-foot high wall of paper from Los Angeles to New York City.",
      "Annually, each person in the United States uses paper equivalent to two pine trees. Recycled paper saves 33% of the total energy needed for virgin paper.",
      "The average American uses 650 lbs. of paper per year.",
      "Producing recycled white paper creates 74% less air pollution, 35% less water pollution, and 75% less processed energy than producing paper from virgin fibers."
    ]
  },
  plastic: {
    tips: [
      "Remove plastic tops from the plastic containers being recycled and rinse containers with water.",
      "Crushing containers will help save space while storing them."
    ],
    facts: [
      "Enough plastic bottles are thrown away each year to circle the earth four times.",
      "Approximately 88% of the energy is saved by producing plastic from plastic as opposed to manufacturing plastic from the raw materials of oil and gas.",
      "The lives of more than 1,900 police officers have been saved through the use of protective vests made from plastic fibers."
    ]
  },
  steel: {
    tips: [
      "Prepare steel cans for recycling by rinsing them with water to remove any food residue.",
      "To save space, remove both ends of the steel can and crush flat.",
      "Labels on the steel cans do not have to be removed since they are burned off during the melting process."
    ],
    facts: [
      "Steel cans, which are used for holding coffee, vegetables and other food products are often referred to as tin cans, but there is only 0.15% tin in a steel can.",
      "The United States throws away enough iron and steel to continuously supply all the nation's automakers."
    ]
  },
  source:
    "http://www.wm.com/location/california/ventura-county/west-hills/recycle/facts.jsp"
};

export const getRandomFact = () => {
  const tipsAndFacts = { ...tipsAndFactsSource };
  delete tipsAndFacts["source"];

  const allFacts = [];
  for (let material in tipsAndFacts) {
    const materialFacts = tipsAndFacts[material].facts;
    Array.prototype.push.apply(allFacts, materialFacts);
  }
  // pick a random fact
  const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
  return randomFact;
};
