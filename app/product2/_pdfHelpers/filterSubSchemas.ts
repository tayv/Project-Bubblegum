import {
  schemaGenericA,
  schemaGenericB,
} from "../_schemas/schemaProductAGeneric"
import {
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"
import { SelectedLocation } from "../_schemas/productATypes"

type FilterSubSchemaProps = {
  selectedLocation: SelectedLocation
}

// get generic schema
const getGenericSchema = ({ selectedLocation }: FilterSubSchemaProps) => {
  switch (selectedLocation) {
    case "location1":
      return schemaGenericA
    case "location2":
      return schemaGenericB
    default:
      return schemaGenericA
  }
}

// get dynamic schema
const getLocationSchema = ({ selectedLocation }: FilterSubSchemaProps) => {
  switch (selectedLocation) {
    case "location1":
      return schemaLocationA
    case "location2":
      return schemaLocationB
    default:
      return schemaLocationA
  }
}

// Only show schemas for the selected location
export const filterSubSchemas = ({
  selectedLocation,
}: FilterSubSchemaProps) => {
  // The schemas are specific to the selected location so need to be fetched dynamically
  const schemaLocationFiltered = getLocationSchema({ selectedLocation })
  const schemaGenericFiltered = getGenericSchema({ selectedLocation })

  return { schemaLocationFiltered, schemaGenericFiltered } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
}
