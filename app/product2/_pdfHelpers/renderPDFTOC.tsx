import { Page, Text, Link, View, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { filterInvalidSections } from "./filterInvalidSections"
import { SelectedTemplateProps } from "../_schemas/productTypes"

export const renderPDFTOC = ({
  docTemplate,
  selectedLocation,
}: SelectedTemplateProps) => {
  const validDocSectionsArray = filterInvalidSections({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  const tocElements = validDocSectionsArray.map(
    (documentSection, sectionIndex) => {
      const sectionNumber = sectionIndex + 1
      const sectionContentArray = documentSection.content

      const sectionTitlesArray = sectionContentArray.map(
        (contentObj, contentIndex) => {
          if (contentObj.type === "sectionTitle") {
            const sectionTitle = contentObj.value
            return (
              // <Text key={sectionNumber} style={pdfStyles.h2}>
              <Link key={sectionNumber} src={`#${sectionNumber}`}>
                {sectionNumber}. {sectionTitle}
              </Link>
              // </Text>
            )
          } else null
        }
      )

      return sectionTitlesArray
    }
  )

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.h1}>Table of Contents</Text>
        {tocElements}
      </View>
    </Page>
  )
}
