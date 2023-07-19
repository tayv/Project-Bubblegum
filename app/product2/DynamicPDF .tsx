import React, { FC } from "react"
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
import { pdfStyles } from "./_pdfHelpers/pdfStyles"
import buildPDF from "./_pdfHelpers/buildPDF"
import { FormDataType } from "./_schemas/productTypes"

// TYPES
type DynamicPDFProps = {
  formData: FormDataType
}

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

// Helper functions

const DynamicPDF: FC<DynamicPDFProps> = ({ formData }) => {
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
          <Link src="#3"> Go to section (hardcoded)</Link>
        </View>
      </Page>

      {/* Dynamic content goes here */}
      <Page size="A4" style={pdfStyles.page}>
        <View>{formData && buildPDF({ formData: formData })}</View>
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

export default DynamicPDF
