import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

export const renderPDFComponents = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
}) => {
  const sectionNumber = sectionIndex + 1 // used for numbering sections
  const contentNumber = contentIndex + 1 // used for numbering content within a section

  // ------------------------------ Check for missing value field in schema ------------------------------
  if (schemaSectionContent.value === undefined) {
    throw new Error(
      `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
        schemaSectionContent.sectionID
      )} at index: ${JSON.stringify(sectionIndex)}
         \n Troubleshooting: Review the following docTempate schema and also check that genericSchema and locationSchema are correct as they can lead to undefined values.`
    )
  }
  // ------------------------------ End ------------------------------

  switch (schemaSectionContent.type) {
    case "header":
      return (
        <Text
          style={pdfStyles.h1}
        >{`${sectionNumber}. ${schemaSectionContent.value}`}</Text>
      )
    case "subheader":
      return (
        <Text
          style={pdfStyles.h2}
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    case "body":
      return (
        <View style={pdfStyles.section}>
          {schemaSectionContent.value.map((item, index) => {
            return (
              <Text key={index} style={pdfStyles.paragraph}>
                {`${sectionNumber}.${contentIndex} ${item} `}
              </Text>
            )
          })}
        </View>
      )

    case "listUnordered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={pdfStyles.listUnordered}>
            - {item}
          </Text>
        )
      })
    case "listOrdered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={pdfStyles.listOrdered}>
            {index + 1}. {item}
          </Text>
        )
      })
    case "sectionStart":
      return (
        <Text
          {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
          style={pdfStyles.sectionStart}
          id="test"
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    default:
      return null
  }
}
