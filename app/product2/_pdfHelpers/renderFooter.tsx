import { Page, Text, View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

export const renderFooter = ({ productTitle, productHighlight }) => {
  return (
    <View style={pdfStyles.footer} fixed>
      <Text>
        {productTitle}: {productHighlight}
      </Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} of ${totalPages}`
        }
      />
    </View>
  )
}
