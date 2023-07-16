import { combineSubSchemas } from "./combineSubSchemas"
import { renderTemplateAsPDF } from "./renderTemplateAsPDF"
import { createTemplateSchema } from "./createTemplateSchema"

// helper functions

// render final doc based on the docTemplate
const buildPDF = ({ formData }) => {
  // Get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // Combined schemas needed for generating docTemplate
  const { locationSchema, genericSchema } = combineSubSchemas({
    selectedLocation: selectedLocation,
  })

  const docTemplate = createTemplateSchema(locationSchema, genericSchema)

  const generatedPDF = renderTemplateAsPDF({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedPDF
}

export default buildPDF
