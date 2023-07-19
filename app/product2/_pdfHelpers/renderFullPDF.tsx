import { renderPDFElements } from "./renderPDFElements"
import { FormDataType, DocTemplate } from "../_schemas/productTypes"
import { View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

type RenderFullPDFProps = {
  docTemplate: DocTemplate
  selectedLocation: FormDataType["jurisdiction"]
}

export const renderFullPDF = ({
  docTemplate,
  selectedLocation,
}: RenderFullPDFProps) => {
  // Render PDF according to docTemplate layout
  return docTemplate.map((schemaSection, sectionIndex) => {
    // get the location array inside each section
    const sectionValidLocations = schemaSection.location

    // See if at least one location matches
    const hasCorrectLocation = sectionValidLocations.some(
      (location: string) => {
        return location === "all" || location === selectedLocation
      }
    )

    // Check if section has a condition. If it does, check if it's satisfied
    const isConditionSatisfied =
      schemaSection.condition === undefined || schemaSection.condition

    // and only return section values that match the location and pass the condition
    if (hasCorrectLocation && isConditionSatisfied) {
      // CATCH ERRORS -----------------
      // Check if sectionValidLocations is defined since everything breaks if we don't have this info
      if (!sectionValidLocations) {
        throw new Error(
          `Location isn't defined for section: ${JSON.stringify(
            sectionIndex
          )} at index: ${JSON.stringify(sectionIndex)}`
        )
      }

      // Map through the content array of objects inside each section. Each content object represents a paragraph, header, etc.
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
