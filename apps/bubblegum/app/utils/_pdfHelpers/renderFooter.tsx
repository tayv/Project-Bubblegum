"use client"
import { Page, Text, View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

type RenderFooterProps = {
  productTitle: string
  productHighlight: string
}

export const renderFooter = ({
  productTitle,
  productHighlight,
}: RenderFooterProps) => {
  return (
    <View style={pdfStyles.footer} fixed>
      <View style={pdfStyles.inlineItems}>
        <Text style={{ fontWeight: "medium" }}>{`${productTitle}: `}</Text>
        <Text style={{ fontWeight: "light" }}>{productHighlight}</Text>
      </View>
      <Text
        style={{ fontWeight: "light" }}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  )
}
