import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import {
  AllProductLocationKeys,
  DocTemplateCommonType,
} from "../_schemas/productTypes"

export type RenderPDFElementsProps = {
  contentArray: DocTemplateCommonType[0]["content"] // [0] index needed since map iterator refers to single objects not arrays
  sectionNumber: number
  selectedLocation: AllProductLocationKeys
}
type ContentObjType = DocTemplateCommonType[0]["content"][0]
type ContentObjValueType =
  | DocTemplateCommonType[0]["content"][0]["value"]
  | DocTemplateCommonType[0]["content"][0]["value"][]
type AccumulatorType = {
  components: React.ReactNode[]
  paragraphNumber: number
}

// HELPER FUNCTIONS ---------------------

// Render functions for each content type
const renderSectionTitle = (
  contentObjValue: ContentObjValueType,
  sectionNumber: RenderPDFElementsProps["sectionNumber"]
) => (
  <View style={pdfStyles.sectionTitle}>
    <Text>{`${sectionNumber}. ${contentObjValue}`}</Text>
  </View>
)

const renderHeader = (contentObjValue: ContentObjValueType) => (
  <View style={pdfStyles.h1}>
    <Text>{contentObjValue}</Text>
  </View>
)

const renderSubheader = (contentObjValue: ContentObjValueType) => (
  <View style={pdfStyles.h2}>
    <Text>{contentObjValue}</Text>
  </View>
)

const renderParagraph = (
  contentObjValue: ContentObjValueType,
  sectionNumber: RenderPDFElementsProps["sectionNumber"],
  paragraphNumber: AccumulatorType["paragraphNumber"]
) => (
  <View style={pdfStyles.paragraph}>
    <Text>{`${sectionNumber}.${paragraphNumber} ${contentObjValue}`}</Text>
  </View>
)

const renderListUnordered = (contentObjValue: ContentObjValueType) => {
  if (Array.isArray(contentObjValue)) {
    // type guard as value has string or array type
    ;<View style={pdfStyles.listUnordered}>
      {contentObjValue.map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}
    </View>
  } else {
    return null // Return null when contentObjValue is not an array
  }
}

const renderListOrdered = (contentObjValue: ContentObjValueType) => {
  if (Array.isArray(contentObjValue)) {
    // type guard as value has string or array type
    ;<View style={pdfStyles.listOrdered}>
      {contentObjValue.map((item, index) => (
        <Text key={index}>{`${index + 1}. ${item}`}</Text>
      ))}
    </View>
  } else {
    return null // Return null when contentObjValue is not an array
  }
}

// Renderer Dictionary. Used inside the reduce() method to dynamically call the correct render function based on the contentObj.type
const rendererDictionary = {
  sectionTitle: renderSectionTitle,
  header: renderHeader,
  subheader: renderSubheader,
  paragraph: renderParagraph,
  listUnordered: renderListUnordered,
  listOrdered: renderListOrdered,
}

// MAIN FUNCTION ---------------------
export const renderPDFElements = ({
  contentArray,
  selectedLocation,
  sectionNumber,
}: RenderPDFElementsProps) => {
  // 1. Iterate over the array of content objects in the current section (passed from renderFullPDF() with reduce() method
  // Note: using reduce because need to keep track of paragraph numbers between mappings.
  // Reduce() returns a single value after iterating through the array. We use that return value in renderFullPDF() to render the PDF elements
  const result = contentArray.reduce<AccumulatorType>(
    // We pass this callback function to reduce that runs on each iteration. It's goal is to return an object containing updated PDF components and paragraphNumber.
    (
      { components, paragraphNumber }: AccumulatorType,
      contentObj: ContentObjType,
      index: number
    ) => {
      // ------------------------- 2. Location and Condition checks -------------------------
      const validContentLocations = contentObj.location
      // We only want to render elements suitable for the user's selected location
      const hasValidContentLocation = validContentLocations.some(
        (location) => location === "all" || location === selectedLocation
      )
      // Check if the section.content object has an optional condition property. If it does, check if it's satisfied
      const isContentConditionSatisfied =
        contentObj.condition === undefined || contentObj.condition

      if (hasValidContentLocation && isContentConditionSatisfied) {
        if (contentObj.value === undefined) {
          throw new Error(
            `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
              contentObj
            )} at index: ${JSON.stringify(index)}
           \n Troubleshooting: Review the docTempate schema.`
          )
        }

        // 3. Dynamically call the correct render function using the renderers dictionary
        const render = rendererDictionary[contentObj.type]
        if (contentObj.type === "paragraph") {
          // Note: only increment this number for paragraphs, otherwise we get miscounts from counting other elements
          paragraphNumber += 1
        }

        // 4. Save the rendered PDF element
        const renderedComponent = render(
          contentObj.value,
          sectionNumber,
          paragraphNumber
        )
        // 5. Return the updated components array and paragraphNumber to be used in the next iteration
        return {
          components: [...components, renderedComponent],
          paragraphNumber,
        }
      }
      // 6. If the location or condition check fails, return the original accumulator object
      return { components, paragraphNumber }
    },
    { components: [], paragraphNumber: 0 } // Initial value of the accumulator
  )
  // 7. Return the components array from the accumulator object so it can be used in renderFullPDF() to render the PDF elements
  return result.components
}
