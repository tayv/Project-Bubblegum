import React from "react"
import {
  Page,
  Text,
  View,
  Image,
  Document,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"
import buildFinalDoc from "./product1SchemaTestRefactor"

// Register custom fonts. See: https://github.com/diegomura/react-pdf/issues/1075
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
})

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
    fontFamily: "Inter",
  },
  body: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    textIndent: 10,
  },
  sectionTitle: {
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
        <View>
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          <Image
            src="/home.png"
            style={{
              width: 15,
              height: 15,
            }}
          />
          <Text style={pdfStyles.h1}>This is a title page</Text>
          <Link src="#test"> Go to section 5</Link>
        </View>
      </Page>

      {/* Dynamic content goes here */}
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

      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text style={pdfStyles.h1}>This is an appendix / last page</Text>
        </View>
      </Page>
    </Document>
  )
}

export default TestPDFDoc
