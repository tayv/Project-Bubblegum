import { renderPDFComponents } from "./renderPDFComponents"

export const fillDocTemplate = ({ docTemplate, selectedLocation }) => {
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
          `Jurisdiction isn't defined for section: ${JSON.stringify(
            sectionIndex
          )} at index: ${JSON.stringify(sectionIndex)}`
        )
      }

      // ------------------------------ MOVE TO schema content map function
      // Check if the value field exists in content since template is incorrect if this is missing
      // if (schemaSection.value === undefined) {
      //   //return <Text key={sectionIndex}>Nothing to see here</Text>
      //   throw new Error(
      //     `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
      //       schemaSection.sectionID
      //     )} at index: ${JSON.stringify(sectionIndex)}
      //    \n Troubleshooting: Review the following docTempate schema and also check that genericSchema and locationSchema are correct as they can lead to undefined values. => ${JSON.stringify(
      //      docTemplate,
      //      null,
      //      2
      //    )}.`
      //   )
      // }
      // End  ----------------

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
