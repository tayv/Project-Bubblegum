import React from "react"
// import makePDF dependencies
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import buildFinalDoc from "./product1SchemaTestRefactor"

// Create PDF styles
const pdfStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  page: {
    backgroundColor: "tomato",
    padding: 20,
  },
  body: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    textIndent: 10,
  },
  sectionStart: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingBottom: 5,
  },
})

// Helper functions

const TestPDFDoc = ({ docTemplate, formData }) => {
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text>PDF Fixed Heading</Text>
        {/* <View>{generateSections()}</View> */}
        <View>{buildFinalDoc({ formData })}</View>
      </Page>
    </Document>
  )
}

export default TestPDFDoc
