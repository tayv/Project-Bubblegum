import React from "react"
// import makePDF dependencies
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import buildFinalDoc from "./product1SchemaTestRefactor"

// Create PDF styles
const pdfStyles = StyleSheet.create({
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 0,
    paddingTop: 6,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.5,
    borderTop: "1 solid #000",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  page: {
    backgroundColor: "tomato",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 45,
    marginBottom: 0,
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
  console.log("TestPDFDoc formData", formData)
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View>{formData && buildFinalDoc({ formData: formData })}</View>
        <View style={pdfStyles.footer} fixed>
          <Text>Product Name: 123 Box on Road</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}

export default TestPDFDoc
