import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import {
  AllProductLocationKeys,
  DocTemplateCommonType,
} from "../_schemas/productTypes"

export type RenderPDFElementsProps = {
  schemaSectionContent: DocTemplateCommonType[0]["content"][0] // [0] index needed since map iterator refers to single objects not arrays
  sectionIndex: number
  contentIndex: number
  selectedLocation: AllProductLocationKeys
}

export const renderPDFElements = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
  selectedLocation,
}: RenderPDFElementsProps) => {
  const sectionNumber = String(sectionIndex + 1) // used for numbering sections. Convert to string since section ID must be a string

  // ------------------------- Location and Condition checks -------------------------
  // 1. Get the location array inside each section
  const sectionValidLocations = schemaSectionContent.location
  // 2. See if at least one location in the location array matches
  const hasValidLocation = sectionValidLocations.some((location: string) => {
    return location === "all" || location === selectedLocation
  })
  // 3. Check if the section.content object has a condition property. If it does, check if it's satisfied
  const isConditionSatisfied =
    schemaSectionContent.condition === undefined ||
    schemaSectionContent.condition

  // 4. Only return section.content value if it has a valid location and passes the condition from the user's answers
  if (hasValidLocation && isConditionSatisfied) {
    // ------------------------------ Check for missing value field in schema ------------------------------
    if (schemaSectionContent.value === undefined) {
      throw new Error(
        `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
          schemaSectionContent
        )} at index: ${JSON.stringify(sectionIndex)}
         \n Troubleshooting: Review the docTempate schema and also check that schemaGenericFiltered and schemaLocationFiltered are correct as they can lead to undefined values.`
      )
    }

    // ------------------------------ 5. Render PDF elements ------------------------------
    // section.content.type is the key that determines which PDF element to render. Some elements need additional level of mapping (e.g. paragraph)
    switch (schemaSectionContent.type) {
      case "sectionTitle":
        return (
          <View
            {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
            style={[pdfStyles.sectionTitle, pdfStyles.inlineItems]}
            id={sectionNumber}
          >
            <View style={pdfStyles.numberSection}>
              <Text
                style={{ justifyContent: "flex-end" }}
              >{`${sectionNumber}. `}</Text>
            </View>
            <Text>{schemaSectionContent.value}</Text>
          </View>
        )
      case "header":
        return (
          <Text style={pdfStyles.h1}>{`${schemaSectionContent.value}`}</Text>
        )
      case "subheader":
        // subheaders don't have numbers because it messes up the numbering of the sibling elements that follow
        return (
          <Text style={pdfStyles.h2}>{`${schemaSectionContent.value}`}</Text>
        )
      case "paragraph":
        const paragraphNumber = String(contentIndex)
        if (Array.isArray(schemaSectionContent.value)) {
          return (
            <View style={pdfStyles.paragraph}>
              {schemaSectionContent.value.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={{ textAlign: "right" }}>
                      <Text
                        style={pdfStyles.numberParagraph}
                      >{`${sectionNumber}.${paragraphNumber}`}</Text>
                    </View>
                    <View>
                      <Text key={index} style={pdfStyles.paragraph}>
                        {`${item}`}
                      </Text>
                    </View>
                  </View>
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
        // Need type guard since only some items are arrays
        // Use ${sectionNumber}.${index + 1} if want heirarchical numbering
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
        if (Array.isArray(schemaSectionContent.value)) {
          return schemaSectionContent.value.map((item, index) => {
            return (
              <Text key={index} style={pdfStyles.listOrdered}>
                {`${index + 1}.${item}`}
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
}

// Psuedo code

// ----- Set up rendering logic -----
// Define render functions for each type
// Create a dictionary mapping each type to render function

// ----- In main function. Iterate through each element object in the filtered section array passed from renderFullPDF() -----
// 1. Get the location array inside each section
// 2. See if at least one location in the location array matches
// 3. Check if the section.content object has a condition property. If it does, check if it's satisfied
// 4. Only return section.content value if it has a valid location and passes the condition from the user's answers. Otherwise reduce() skips it
// 5. Print the Section number passed from renderFullPDF() if the element type is a sectionTitle
// 5. Render PDF elements

// ----- Return result from reduce() -----
// 1. After the above reduce method finishes iterating through all the elements in the section, return the result (array of all rendered components in the section)
// 2. The reduce() return object is saved to a result variable. The shape is: {components: ..., paragraphNumber: ...}
// 3. The renderPDFElements() function returns the result variable to be rendered via renderFullPDF()
// Example: let contentArray = [...];  // some array of content items
// let selectedLocation = ...;  // some location
// let components = renderPDFElements(contentArray, selectedLocation);

// return (
//   <Document>
//     <Page style={styles.page}>
//       {components}
//     </Page>
//   </Document>
// );
//
