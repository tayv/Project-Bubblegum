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
  pdf,
} from "@react-pdf/renderer"
import { pdfStyles } from "./_pdfHelpers/pdfStyles"
import buildPDF from "./_pdfHelpers/buildPDF"
import { FormDataType } from "./_schemas/productTypes"
import { renderPDFTOC } from "./_pdfHelpers/renderPDFTOC"
import { createSchemaTemplateA } from "./_schemas/createSchemaTemplateA"
import { renderFooter } from "./_pdfHelpers/renderFooter"
import { renderPDFTerms } from "./_pdfHelpers/renderPDFTerms"

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
  // Create docTemplate schema
  const docTemplate = createSchemaTemplateA(formData)
  const selectedLocation = formData.jurisdiction

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={pdfStyles.documentTitle}>Document Title Goes Here</Text>
          <Text style={pdfStyles.documentSubTitle}>
            Document Sub Title Goes Here
          </Text>
          <View
            style={[
              pdfStyles.centerItems,
              { paddingBottom: 70, fontSize: 12, lineHeight: 1.7 },
            ]}
          >
            <Text>Between:</Text>
            <Text>Party Name 1</Text>
            <Text>
              & {formData.textExample ? formData.textExample : "______________"}
            </Text>
          </View>
        </View>

        {/* Table of Contents */}
        {renderPDFTOC({ docTemplate, selectedLocation })}
        {/* Fixed footer */}
        {renderFooter({
          productTitle: "Product Title",
          productHighlight: "1.0",
        })}
      </Page>

      {/* Contract terms go here */}
      <Page size="A4" style={pdfStyles.page}>
        <View>
          {
            /* need to wait for formData to be available */
            formData &&
              renderPDFTerms({
                docTemplate,
                selectedLocation,
              })
          }
        </View>
        {renderFooter({
          productTitle: "Product Title",
          productHighlight: "1.0",
        })}
      </Page>

      <Page size="A4" style={pdfStyles.page}>
        <View>
          <Text style={pdfStyles.h1}>This is an appendix / last page</Text>
        </View>
        {renderFooter({
          productTitle: "Product Title",
          productHighlight: "1.0",
        })}
      </Page>
    </Document>
  )
}

export default DynamicPDF
