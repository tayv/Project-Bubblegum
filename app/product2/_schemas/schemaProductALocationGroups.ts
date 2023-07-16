// supported location groups
// Used to build docTemplate from correct schemas
// Intended to be used to batch closely related locations/countries so the number of genericSchemas can be limited
export const locationGroups = {
  locationGroupA: ["location1", "location3"],
  locationGroupB: ["location2"],
}
export const allLocations = [
  ...locationGroups.locationGroupA,
  ...locationGroups.locationGroupB,
]
