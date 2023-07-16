import {
  genericSchemaA,
  genericSchemaB,
} from "../_schemas/schemaProductAGeneric"
import {
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"

// get generic schema
const getGenericSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return genericSchemaA
    case "location2":
      return genericSchemaB
    default:
      return genericSchemaA
  }
}

// get dynamic schema
const getLocationSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return schemaLocationA
    case "location2":
      return schemaLocationB
    default:
      return schemaLocationA
  }
}

// export from separate file
export const combineSubSchemas = ({ selectedLocation }) => {
  // The schemas are specific to the location so need to be fetched dynamically
  const locationSchema = getLocationSchema({ selectedLocation })
  const genericSchema = getGenericSchema({ selectedLocation })

  return { locationSchema, genericSchema } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
}
