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
  const validDocSectionsArray = filterInvalidSections({
    sectionsToFilter: docTemplate,
    selectedLocation: selectedLocation,
  })

  // 2. Map through remaining valid sections and render PDF elements
  return validDocSectionsArray.map(
    (sections: DocTemplateCommonType[0], sectionIndex: number) => {
      // 3. Map through the valid section.content array and render PDF elements
      return sections.content.map((contentArray, contentIndex) => {
        // The components returned from renderPDFElements via reduce() method
        const pdfElements = renderPDFElements({
          contentArray: sections.content,
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
          selectedLocation: selectedLocation,
        })
        return (
          <View key={sections.sectionID} style={pdfStyles.section}>
            {/* // All the valid PDF Elements are rendered here */}
            {pdfElements}
          </View>
        )
      })
    }
  )
}
