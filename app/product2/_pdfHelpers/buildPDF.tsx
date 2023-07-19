import { renderFullPDF } from "./renderFullPDF"
import { FormDataType } from "../_schemas/productTypes"
import { createSchemaTemplateA } from "../_schemas/createSchemaTemplateA"

// render final doc based on the docTemplate
const buildPDF = ({ formData }: { formData: FormDataType }) => {
  // Get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction

  // Create docTemplate schema
  const docTemplate = createSchemaTemplateA(formData)

  // Use schema to generate PDF using react-pdf renderer library
  const generatedPDF = renderFullPDF({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedPDF
}

export default buildPDF
