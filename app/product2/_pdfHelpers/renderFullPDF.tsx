import { renderPDFElements } from "./renderPDFElements"
import { FormDataType, DocTemplateCommonType } from "../_schemas/productTypes"
import { View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { filterInvalidSections } from "./filterInvalidSections"

type RenderFullPDFProps = {
  docTemplate: DocTemplateCommonType
  selectedLocation: FormDataType["jurisdiction"]
}
type DocumentSectionType = DocTemplateCommonType[0]

export const renderFullPDF = ({
  docTemplate,
  selectedLocation,
}: RenderFullPDFProps) => {
  // 1. Filter out sections that don't have a valid location or don't pass the condition
  // This is so section numbers don't increment on skipped sections
  const validDocSectionsArray = filterInvalidSections({
    sectionsToFilter: docTemplate,
    selectedLocation: selectedLocation,
  })

  // 2. Map through remaining valid document sections and render PDF elements that exist in each section
  return validDocSectionsArray.map(
    (documentSection: DocumentSectionType, sectionIndex: number) => {
      // 3. For the current documentSection object, map through its section.content array to find child elements to render

      const sectionNumber = sectionIndex + 1 // used for numbering section titles

      //4. Save the components returned from renderPDFElements via reduce() method
      const pdfElements = renderPDFElements({
        contentArray: documentSection.content,
        sectionNumber: sectionNumber,
        selectedLocation: selectedLocation,
      })
      return (
        <View key={documentSection.sectionID} style={pdfStyles.section}>
          {/* // 5. All the valid PDF Elements are rendered here */}
          {pdfElements}
        </View>
      )
    }
  )
}
