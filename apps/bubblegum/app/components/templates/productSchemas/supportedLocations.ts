import { AllSupportedLocationsType } from "./productTypes"

// All the locations supported by this product
export const supportedLocations: AllSupportedLocationsType = {
  all: "all", // "all" is a special location that means "all locations
  location1: "location1",
  location2: "location2",
  location3: "location3",
  location4: "location4",
  location5: "location5",
}
// Location groups to be used in creating the document template schema
// Makes conditional logic easier to manage when there's large numbers of supported locations
// export const supportedLocationGroups = {
//   locationGroupA: [supportedLocations.location1, supportedLocations.location2],
//   locationGroupB: [supportedLocations.location3],
//   locationGroupC: [supportedLocations.location4],
// }

export const supportedLocationGroups = {
  locationGroupA: [
    supportedLocations.location1,
    supportedLocations.location2,
  ] as const,
  locationGroupB: [supportedLocations.location3] as const,
}

export const supportedLocationGroupsTemplateB = {
  locationGroupA: [supportedLocations.location4] as const,
  locationGroupB: [supportedLocations.location5] as const,
}
