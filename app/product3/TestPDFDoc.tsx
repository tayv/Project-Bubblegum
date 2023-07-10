import React from "react"
// import makePDF dependencies
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import buildFinalDoc from "./product1SchemaTestRefactor"

// Helper functions

const TestPDFDoc = ({ docTemplate, formData }) => {
  const generateSections = () => {
    return docTemplate.map((section, index) => {
      const hasCorrectLocation = section.location.some(
        (location) => location === "all" || location === "location1"
      )
      {
        console.log(alert(section.location))
      }
      if (hasCorrectLocation) {
        // TO DO: Need to generate the correct PDF component based on the type property
        return <Text key={index}>Dynamic content should go here</Text>
      } else {
        return null // Return null if you don't want to render anything
      }
    })
  }

  return (
    <Document>
      <Page size="A4">
        <Text>PDF Test Heading</Text>
        {/* <View>{generateSections()}</View> */}
        <View>{buildFinalDoc({ FormData })}</View>
      </Page>
    </Document>
  )
}

export default TestPDFDoc
