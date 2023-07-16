import { renderPDFComponents } from "./renderPDFComponents"

export const renderDocTemplateAsPDF = ({ docTemplate, selectedLocation }) => {
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
        return renderPDFComponents({
          schemaSectionContent: schemaSectionContent,
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
        })
      })
    } else {
      return null // to prevent rendering content for sections that don't match the location
    }
  })
}
