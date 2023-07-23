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
  // bookmarks used by the pdf viewer. Not the same as build in anchor links used by TOC.
  <View
    wrap={false}
    style={pdfStyles.sectionTitle}
    {...{ bookmark: sectionNumber }}
  >
    <View style={pdfStyles.inlineItems}>
      <Text
        style={pdfStyles.numberSection}
        id={String(sectionNumber)} // used for TOC anchor links
      >
        {`${sectionNumber}.`}
      </Text>
      <Text>{`${contentObjValue}`}</Text>
    </View>
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
) => {
  if (Array.isArray(contentObjValue)) {
    const paragraphNodes = contentObjValue.map((paragraph, index) => (
      <View key={index} style={pdfStyles.paragraph}>
        <View style={pdfStyles.inlineItems}>
          <Text style={pdfStyles.numberParagraph}>{`${sectionNumber}.${
            paragraphNumber + index
          }`}</Text>
          <Text>{`${paragraph}`}</Text>
        </View>
      </View>
    ))
    // update paragraphNumber based on index
    paragraphNumber += contentObjValue.length

    // return both the paragraph nodes and the updated paragraphNumber
    return {
      paragraphNodes: paragraphNodes,
      paragraphNumber: paragraphNumber,
    }
  }
}

const renderListUnordered = (contentObjValue: ContentObjValueType) => {
  if (Array.isArray(contentObjValue)) {
    // type guard as value has string or array type
    return (
      <View wrap={false} style={pdfStyles.listUnordered}>
        {contentObjValue.map((item, index) => (
          <Text key={index}>- {item}</Text>
        ))}
      </View>
    )
  } else {
    return null // Return null when contentObjValue is not an array
  }
}

const renderListOrdered = (contentObjValue: ContentObjValueType) => {
  if (Array.isArray(contentObjValue)) {
    // type guard as value has string or array type
    return (
      <View wrap={false} style={pdfStyles.listOrdered}>
        {contentObjValue.map((item, index) => (
          <Text key={index}>{`${index + 1}. ${item}`}</Text>
        ))}
      </View>
    )
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
  // 1. ----- Iterate over the array of content objects in the current section (passed from renderFullPDF() with reduce() method -----
  // Note: using reduce because need to keep track of paragraph numbers between mappings.
  // Reduce() returns a single value after iterating through the array. We use that return value in renderPDFTerms() to render the PDF elements
  const result = contentArray.reduce<AccumulatorType>(
    // We pass this callback function to reduce that runs on each iteration. It's goal is to return an accummulator object containing updated PDF components and paragraphNumber.
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
        // An undefined value shouldn't happen but throw an error since it's make final doc incorrect
        if (contentObj.value === undefined) {
          throw new Error(
            `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
              contentObj
            )} at index: ${JSON.stringify(index)}
           \n Troubleshooting: Review the docTempate schema.`
          )
        }

        // 3. ------------- Render all components in the current document template's section.content array  -------------

        // Each content type needs its own render function. Dynamically call the correct one using the renderers dictionary defined above
        const render = rendererDictionary[contentObj.type]

        // First check if the rendered component is a paragraph as it has unique logic to update the paragraphNumber
        if (contentObj.type === "paragraph") {
          const renderParagraphResult = render(
            contentObj.value,
            sectionNumber,
            paragraphNumber
          )
          // Update the components array and paragraphNumber with the return value from renderParagraph()
          // so that any other paragraph types in the same section.content array can use the correct paragraphNumber
          if (renderParagraphResult !== undefined) {
            components = [
              ...components,
              ...renderParagraphResult.paragraphNodes,
            ]
            paragraphNumber = renderParagraphResult.paragraphNumber
          }
        } else {
          // If the contentObj is not of type "paragraph", just add it to the components array
          const renderedComponent = render(contentObj.value, sectionNumber)
          components = [...components, renderedComponent]
        }
        // 4. Return the updated components array and paragraphNumber to the accumulator object
        return {
          components,
          paragraphNumber,
        }
      } else {
        // If there are no components to render then just return the current state of the accumulator
        return {
          components,
          paragraphNumber,
        }
      }
    },
    { components: [], paragraphNumber: 1 } // Initial value of the accumulator
  )
  // 7. Return the components array from the accumulator object so it can be used in renderPDFTerms() to render the PDF elements
  return result.components
}
