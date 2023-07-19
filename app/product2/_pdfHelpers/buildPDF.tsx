import { filterSubSchemas } from "./filterSubSchemas"
import { renderFullPDF } from "./renderFullPDF"
import { createTemplateSchema } from "./createTemplateSchema"
import { FormDataType } from "../_schemas/productTypes"
import { createSchemaTemplateA } from "./createSchemaTemplateA"

// render final doc based on the docTemplate
const buildPDF = ({ formData }: { formData: FormDataType }) => {
  // Get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // Combined schemas needed for generating docTemplate
  const { schemaLocationFiltered, schemaGenericFiltered } = filterSubSchemas({
    selectedLocation: selectedLocation,
  })

  // const docTemplate = createTemplateSchema<typeof selectedLocation>(
  //   schemaLocationFiltered,
  //   schemaGenericFiltered
  // )
  const docTemplate = createSchemaTemplateA(formData)

  const generatedPDF = renderFullPDF({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedPDF
}

export default buildPDF
