import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { DocTemplate } from "../_schemas/productATypes"

export type RenderPDFElementsProps = {
  schemaSectionContent: DocTemplate[0]["content"][0]
  sectionIndex: number
  contentIndex: number
}

export const renderPDFElements = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
}: RenderPDFElementsProps) => {
  const sectionNumber = sectionIndex + 1 // used for numbering sections
  const contentNumber = contentIndex // used for numbering content within a section

  // ------------------------------ Check for missing value field in schema ------------------------------
  if (schemaSectionContent.value === undefined) {
    throw new Error(
      `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
        schemaSectionContent
      )} at index: ${JSON.stringify(sectionIndex)}
         \n Troubleshooting: Review the docTempate schema and also check that schemaGenericFiltered and schemaLocationFiltered are correct as they can lead to undefined values.`
    )
  }
  // ------------------------------ End ------------------------------

  switch (schemaSectionContent.type) {
    case "sectionTitle":
      return (
        <Text
          {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
          style={pdfStyles.sectionTitle}
          id="test"
        >{`${sectionNumber}. ${schemaSectionContent.value}`}</Text>
      )
    case "header":
      return (
        <Text
          style={pdfStyles.h1}
        >{`${sectionNumber}. ${schemaSectionContent.value}`}</Text>
      )
    case "subheader":
      // subheaders don't have numbers because it messes up the numbering of the sibling elements that follow
      return <Text style={pdfStyles.h2}>{`${schemaSectionContent.value}`}</Text>
    case "paragraph":
      if (Array.isArray(schemaSectionContent.value)) {
        return (
          <View style={pdfStyles.paragraph}>
            {schemaSectionContent.value.map((item, index) => {
              return (
                <Text key={index} style={pdfStyles.paragraph}>
                  {`${sectionNumber}.${index + 1} ${item} `}
                </Text>
              )
            })}
          </View>
        )
      } else {
        throw new Error(
          `Expected an array for 'paragraph' value, but got something else.`
        )
      }
    case "listUnordered":
      if (Array.isArray(schemaSectionContent.value)) {
        return schemaSectionContent.value.map((item, index) => {
          return (
            <Text key={index} style={pdfStyles.listUnordered}>
              - {item}
            </Text>
          )
        })
      } else {
        throw new Error(
          `Expected an array for 'listUnordered' value, but got something else.`
        )
      }
    case "listOrdered":
      // Need type guard since only some items are arrays
      if (Array.isArray(schemaSectionContent.value)) {
        return schemaSectionContent.value.map((item, index) => {
          return (
            <Text key={index} style={pdfStyles.listOrdered}>
              {`${sectionNumber}.${index + 1}.${item}`}
            </Text>
          )
        })
      } else {
        throw new Error(
          `Expected an array for 'listOrdered' value, but got something else.`
        )
      }
    default:
      return null
  }
}
