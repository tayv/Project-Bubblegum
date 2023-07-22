import { renderPDFTerms } from "./renderPDFTerms"
import { SelectedTemplateProps } from "../_schemas/productTypes"

// render final doc based on the docTemplate
const buildPDF = ({ docTemplate, selectedLocation }: SelectedTemplateProps) => {
  // MOVED up to DynamicPDF.tsx. May be able to remove this helper function
  // Get the user's selected location since this determines which parts of docTemplate to use
  // const selectedLocation = formData.jurisdiction

  // // Create docTemplate schema
  // const docTemplate = createSchemaTemplateA(formData)

  // Use schema to generate PDF using react-pdf renderer library
  const generatedPDF = renderPDFTerms({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedPDF
}

export default buildPDF
