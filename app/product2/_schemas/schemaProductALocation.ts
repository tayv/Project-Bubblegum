// SUPPORTED LOCATIONS FOR THIS PRODUCT --------------------------
// Used to batch closely related locations/countries to help streamline sub schema logic
export const locationGroups = {
  locationGroupA: ["location1", "location3"],
  locationGroupB: ["location2"],
}
export const allLocations = [
  ...locationGroups.locationGroupA,
  ...locationGroups.locationGroupB,
]
// --------------------------

// LOCATION SPECIFIC SCHEMAS --------------------------
// Used alongside generic schema to create docTemplate schema
export const schemaLocationA = {
  radioExample: {
    option1: {
      bodyA: ["LA: Radio option 1"],
    },
    option2: {
      bodyA: ["LA: Radio option 2"],
    },
    option3: {
      headerA: "LA: Radio option 3 header",
      bodyA: ["LA: Radio option 3 body"],
      headerB: "LA: Radio option 3 header B",
      bodyB: ["LA: Radio option 3 body B"],
      bodyC: ["LA: Radio option 3 body C"],
    },
  },
}

export const schemaLocationB = {
  radioExample: {
    option1: {
      bodyA: ["LB: Radio option 1"],
    },
    option2: {
      bodyA: ["LB: Radio option 2"],
    },
  },
}
