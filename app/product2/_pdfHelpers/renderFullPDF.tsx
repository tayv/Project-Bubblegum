import { renderPDFElements } from "./renderPDFElements"
import { FormDataType, DocTemplateType } from "../_schemas/productTypes"
import { View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

type RenderFullPDFProps = {
  docTemplate: DocTemplateType
  selectedLocation: FormDataType["jurisdiction"]
}

export const renderFullPDF = ({
  docTemplate,
  selectedLocation,
}: RenderFullPDFProps) => {
  // Render PDF using docTemplate schema---------------------------
  return docTemplate.map((schemaSection: DocTemplateType[0], sectionIndex) => {
    // 1. get the location array inside each section
    const sectionValidLocations = schemaSection.location
    // 2. See if at least one location in the location array matches
    const hasValidLocation = sectionValidLocations.some((location: string) => {
      return location === "all" || location === selectedLocation
    })

    // 3. Check if section has a condition property. If it does, check if it's satisfied
    const isConditionSatisfied =
      schemaSection.condition === undefined || schemaSection.condition

    // 4. Only return section values if it has a valid location and passes the condition from the user's answers
    if (hasValidLocation && isConditionSatisfied) {
      // 5. Render the PDF element by mapping through the section.content array of objects.
      // Each object in the section.content array represents a paragraph, header, etc.
      return schemaSection.content.map((schemaSectionContent, contentIndex) => {
        return (
          <View key={schemaSection.sectionID} style={pdfStyles.section}>
            {renderPDFElements({
              schemaSectionContent: schemaSectionContent,
              sectionIndex: sectionIndex,
              contentIndex: contentIndex,
              selectedLocation: selectedLocation,
            })}
          </View>
        )
      })
    } else {
      return null // to prevent rendering content for sections that don't match the location
    }
  })
}
