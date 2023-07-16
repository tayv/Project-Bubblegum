import { combineSchemas } from "./combineSchemas"
import { renderDocTemplateAsPDF } from "./renderDocTemplateAsPDF"
import { generateDocTemplate } from "./generateDocTemplate"

// helper functions

// render final doc based on the docTemplate
const buildPDF = ({ formData }) => {
  // Get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // Combined schemas needed for generating docTemplate
  const { locationSchema, genericSchema } = combineSchemas({
    selectedLocation: selectedLocation,
  })

  const docTemplate = generateDocTemplate(locationSchema, genericSchema)

  const generatedPDF = renderDocTemplateAsPDF({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedPDF
}

export default buildPDF
