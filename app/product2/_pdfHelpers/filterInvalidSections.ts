"use client"
import {
  DocTemplateCommonType,
  FormDataType,
  SelectedTemplateProps,
} from "../_schemas/productTypes"

export const filterInvalidSections = ({
  docTemplate,
  selectedLocation,
}: SelectedTemplateProps) => {
  // Filter out invalid top level sections based on location and condition properties
  const validSections = docTemplate.filter(
    // NOTE: Use [0] since section is only ever a single object
    (section: DocTemplateCommonType[0]) => {
      // 1. get the array of valid locations inside each section
      const sectionValidLocations = section.location

      // 2. See if a location in section.location array matches the user's selected location or if it's valid for all locations
      const hasValidLocation = sectionValidLocations.some(
        (location: string) => {
          return location === "all" || location === selectedLocation
        }
      )

      // 3. Check if section has a condition property. If it does, check if it's satisfied
      const conditionIsMet =
        section.condition === undefined || section.condition
      // Return true if section is valid by meeting both conditions, false if it's not
      return hasValidLocation && conditionIsMet
    }
  )

  // 4. Return an array of the valid filtered sections so it can be used by renderPDFElement()
  return (
    // Want to return valid sections along with the index so that section numbering doesn't increment for hidden invalid sections
    validSections.map((section: DocTemplateCommonType[0], index: number) => {
      return { ...section, validSectionIndex: index }
    })
  )
}
