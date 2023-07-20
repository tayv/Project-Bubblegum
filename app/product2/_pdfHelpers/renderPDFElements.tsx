import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import {
  AllProductLocationKeys,
  DocTemplateCommonType,
} from "../_schemas/productTypes"

export type RenderPDFElementsProps = {
  contentArray: DocTemplateCommonType[0]["content"] // [0] index needed since map iterator refers to single objects not arrays
  sectionNumber: number
  contentIndex: number
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
  sectionNumber: number
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
  sectionNumber: number,
  paragraphNumber: number
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

// Renderer Dictionary
const renderers = {
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
  contentIndex,
}: RenderPDFElementsProps) => {
  // Iterate over the contentArray with .reduce()
  // The reduce function is a method that reduces the array to a single value,
  // by performing a function (supplied as the first argument) on each element of the array, from left to right.
  const result = contentArray.reduce<AccumulatorType>(
    // The reduce method takes two arguments (callback function, initial value). The callback function takes up to four arguments.
    // Calback arguments breakdown:
    // accumulator object (represents current state), current value being processed, current index, source array (not used here)
    // Example:
    // array.reduce((accumulator, currentValue, currentIndex, array) => {
    //   // callback function body
    // }, initialValue)

    // pass this callback function to reduce that runs on each iteration:
    (
      { components, paragraphNumber }: AccumulatorType,
      contentObj: ContentObjType,
      index: number
    ) => {
      // This function is the callback being run for each item in the contentArray.
      // The returned value will be used as the accumulator in the next call.
      // Here you are supposed to return an object containing updated `components` and `paragraphNumber`.

      // Get the location array inside each section.content object
      const validContentLocations = contentObj.location
      // Check if at least one location in the location array matches
      const hasValidContentLocation = validContentLocations.some(
        (location) => location === "all" || location === selectedLocation
      )
      // Check if the section.content object has a condition property. If it does, check if it's satisfied
      const isContentConditionSatisfied =
        contentObj.condition === undefined || contentObj.condition

      if (hasValidContentLocation && isContentConditionSatisfied) {
        if (contentObj.value === undefined) {
          throw new Error(
            `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
              contentObj
            )} at index: ${JSON.stringify(index)}
           \n Troubleshooting: Review the docTempate schema and also check that schemaGenericFiltered and schemaLocationFiltered are correct as they can lead to undefined values.`
          )
        }

        const render = renderers[contentObj.type]
        if (contentObj.type === "paragraph") {
          // increment paragraph number when type is 'paragraph'
          paragraphNumber += 1
        }
        const renderedComponent = render(
          contentObj.value,
          sectionNumber,
          paragraphNumber
        )
        return {
          components: [...components, renderedComponent],
          paragraphNumber,
        }
      }
      return { components, paragraphNumber }
    },
    { components: [], paragraphNumber: 0 }
  )

  return result.components
}
