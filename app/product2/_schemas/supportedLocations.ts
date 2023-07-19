import { SupportedLocationsType } from "./productTypes"

// All the locations supported by this product
export const supportedLocations: SupportedLocationsType = {
  all: "all", // "all" is a special location that means "all locations
  location1: "location1",
  location2: "location2",
  location3: "location3",
  location4: "location4",
}
// Location groups to be used in creating the document template schema
// Makes conditional logic easier to manage when there's large numbers of supported locations
export const supportedLocationGroups = {
  locationGroupA: [supportedLocations.location1, supportedLocations.location2],
  locationGroupB: [supportedLocations.location3],
  locationGroupC: [supportedLocations.location4],
}
