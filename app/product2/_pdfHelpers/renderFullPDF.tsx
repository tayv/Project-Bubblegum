import { renderPDFElements } from "./renderPDFElements"
import { FormDataType, DocTemplateCommonType } from "../_schemas/productTypes"
import { View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { filterInvalidSections } from "./filterInvalidSections"

type RenderFullPDFProps = {
  docTemplate: DocTemplateCommonType
  selectedLocation: FormDataType["jurisdiction"]
}

export const renderFullPDF = ({
  docTemplate,
  selectedLocation,
}: RenderFullPDFProps) => {
  // 1. Filter out sections that don't have a valid location or don't pass the condition.
  // This is so section numbers don't increment on skipped sections
  const displayValidSections = filterInvalidSections({
    sectionsToFilter: docTemplate,
    selectedLocation: selectedLocation,
  })

  // 2. Map through remaining valid sections and render PDF elements
  return displayValidSections.map(
    (sections: DocTemplateCommonType[0], sectionIndex: number) => {
      return sections.content.map((schemaSectionContent, contentIndex) => {
        return (
          <View key={sections.sectionID} style={pdfStyles.section}>
            {renderPDFElements({
              schemaSectionContent: schemaSectionContent,
              sectionIndex: sectionIndex,
              contentIndex: contentIndex,
              selectedLocation: selectedLocation,
            })}
          </View>
        )
      })
    }
  )
}
