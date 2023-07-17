import { renderPDFElements } from "./renderPDFElements"
import { SelectedLocation, DocTemplate } from "../_schemas/productATypes"
import { View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

type RenderFullPDFProps = {
  docTemplate: DocTemplate
  selectedLocation: SelectedLocation
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
    // and only return section values that match the location
    if (hasCorrectLocation) {
      // CATCH ERRORS -----------------
      // Check if sectionValidLocations is defined since everything breaks if we don't have this info
      if (!sectionValidLocations) {
        throw new Error(
          `Location isn't defined for section: ${JSON.stringify(
            sectionIndex
          )} at index: ${JSON.stringify(sectionIndex)}`
        )
      }

      return schemaSection.content.map((schemaSectionContent, contentIndex) => {
        return (
          <View key={schemaSection.sectionID} style={pdfStyles.section}>
            {renderPDFElements({
              schemaSectionContent: schemaSectionContent,
              sectionIndex: sectionIndex,
              contentIndex: contentIndex,
            })}
          </View>
        )
      })
    } else {
      return null // to prevent rendering content for sections that don't match the location
    }
  })
}
