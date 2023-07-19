import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { ProductLocationKeys } from "../_schemas/productTypes"
import { DocTemplateAType } from "../_schemas/createSchemaTemplateA"

export type RenderPDFElementsProps = {
  schemaSectionContent: DocTemplateAType[0]["content"][0]
  sectionIndex: number
  contentIndex: number
  selectedLocation: ProductLocationKeys
}

export const renderPDFElements = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
  selectedLocation,
}: RenderPDFElementsProps) => {
  const sectionNumber = String(sectionIndex + 1) // used for numbering sections. Convert to string since section ID must be a string
  const contentNumber = contentIndex // used for numbering content within a section

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
        if (Array.isArray(schemaSectionContent.value)) {
          return (
            <View style={pdfStyles.paragraph}>
              {schemaSectionContent.value.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={{ textAlign: "right" }}>
                      <Text
                        style={pdfStyles.numberParagraph}
                      >{`${sectionNumber}.${index + 1}`}</Text>
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
