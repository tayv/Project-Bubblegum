import React from "react"
// import makePDF dependencies
import {
  Page,
  Text,
  View,
  Image,
  Document,
  Link,
  StyleSheet,
} from "@react-pdf/renderer"
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
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 30,
    paddingBottom: 50,
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
        <View>
          <Text style={pdfStyles.h1}>This is a title page</Text>
          <Link src="#test"> Go to section 5</Link>
        </View>
      </Page>

      {/* Dynamic content goes here */}
      <Page size="A4" style={pdfStyles.page}>
        <View>
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          <Image
            src="/home.png"
            style={{
              width: 15,
              height: 15,
            }}
          />
        </View>
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

      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text style={pdfStyles.h1}>This is an appendix / last page</Text>
        </View>
      </Page>
    </Document>
  )
}

export default TestPDFDoc
