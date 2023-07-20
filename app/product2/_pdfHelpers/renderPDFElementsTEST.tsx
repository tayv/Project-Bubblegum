import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import {
  AllProductLocationKeys,
  DocTemplateCommonType,
} from "../_schemas/productTypes"

export type RenderPDFElementsProps = {
  schemaSectionContent: DocTemplateCommonType[0]["content"][0]
  sectionIndex: number
  contentIndex: number
  selectedLocation: AllProductLocationKeys
  paragraphNumber: number
}

// Each type will get its own render function
const renderParagraph = (
  schemaSectionContent,
  sectionNumber,
  paragraphNumber
) => {
  // guard in case don't pass an array for paragraph value
  if (!Array.isArray(schemaSectionContent.value)) {
    throw new Error(
      `Expected an array for 'paragraph' value, but got something else.`
    )
  }
  // map through and render each paragraph in the section.content.value array
  const paragraphs = schemaSectionContent.value.map((item, index) => (
    <View key={index}>
      <View style={{ textAlign: "right" }}>
        <Text style={pdfStyles.numberParagraph}>
          {`${sectionNumber}.${paragraphNumber}`}
        </Text>
      </View>
      <View>
        <Text key={index} style={pdfStyles.paragraph}>
          {`${item}`}
        </Text>
      </View>
    </View>
  ))

  // return the component and the new paragraph count as an object so we can increment
  // the paragraph count across counted elements within this section
  return {
    // all the paragraphs in the array are wrapped in a View
    component: <View style={pdfStyles.paragraph}>{paragraphs}</View>,
    newCount: paragraphNumber + schemaSectionContent.value.length,
  }
}

// MAIN FUNCTION
export const renderPDFElements = ({
  schemaSectionContent,
  sectionIndex,
  paragraphNumber,
}: RenderPDFElementsProps) => {
  // renderContent is a helper function that will render the correct component based on the type property
  const renderContent = (
    schemaSectionContent,
    sectionNumber,
    paragraphNumber
  ) => {
    switch (schemaSectionContent.type) {
      case "paragraph":
        return renderParagraph(
          schemaSectionContent,
          sectionNumber,
          paragraphNumber
        )
      default:
        throw new Error(`Unsupported type: ${schemaSectionContent.type}`)
    }
  }

  // save the result so we can return it to the main function
  const renderResult = renderContent(
    schemaSectionContent,
    sectionIndex,
    paragraphNumber
  )

  return {
    component: renderResult.component,
    paragraphNumber: renderResult.newCount,
  }
}

// this part of the code is responsible for calling renderPDFElements for each section of your document, collecting all the rendered components, and keeping track of the paragraph number as it increases. The result will be an object with the structure { components: [...], paragraphNumber: n }, where components is an array of all the rendered components, and paragraphNumber is the total count of paragraphs rendered.
const result = schemaSections.reduce(
  (accumulator, sectionContent, sectionIndex) => {
    const res = renderPDFElements({
      ...props,
      schemaSectionContent: sectionContent,
      sectionIndex,
      paragraphNumber: accumulator.paragraphNumber,
    })
    return {
      components: [...accumulator.components, res.component],
      paragraphNumber: res.paragraphNumber,
    }
  },
  { components: [], paragraphNumber: 0 }
)
