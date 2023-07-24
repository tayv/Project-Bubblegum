import { View, Text, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"

const pdfSigningStyles = StyleSheet.create({
  tableContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#919291",
    marginLeft: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingBottom: 2,
    paddingLeft: 6,
    alignItems: "flex-start",
    // border: "0.5 solid #000",
  },
  tableRowData: {
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 15,
    // border: "0.5 solid #000",
  },
  tableRowLine: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  tableCell: {
    fontSize: 10,
    width: 330,
    paddingRight: 2,
    alignItems: "flex-end",
    // alignContent: "flex-end",
    textAlign: "center",
  },
  tableCellTitle: {
    fontSize: 9,
    color: "#919291",
    width: 330,
    textAlign: "left",
    paddingLeft: 6,
  },
  tableCellLine: {
    lineHeight: 0.5,
    fontSize: 10,
    width: 330,
    paddingRight: 2,
    alignItems: "center",
    textAlign: "center",
  },
  tableCellLabel: {
    fontSize: 9,
    width: 330,
    textAlign: "center",
    opacity: 0.5,
  },
  tableCellData: {
    width: 330,
    textAlign: "center",
    alignItems: "flex-end",
    lineHeight: 0.9,
  },
})

export const renderSigning = () => {
  return (
    <View style={pdfStyles.section} wrap={false}>
      <Text style={pdfStyles.h2}>Party Type</Text>
      <View style={pdfSigningStyles.tableContainer}>
        <View style={pdfSigningStyles.tableRow}>
          <Text style={pdfSigningStyles.tableCellTitle}>PARTY TYPE 1</Text>
          <Text style={pdfSigningStyles.tableCell} />
          <Text style={pdfSigningStyles.tableCell} />
        </View>
        <View style={pdfSigningStyles.tableRowData}>
          <Text style={pdfSigningStyles.tableCellData}>John W. Smithers</Text>
          <Text style={pdfSigningStyles.tableCellData}>
            This is a signuature
          </Text>
          <Text style={pdfSigningStyles.tableCellData}>January 12, 3000</Text>
        </View>
        <View style={pdfSigningStyles.tableRowLine}>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
        </View>
        <View style={pdfSigningStyles.tableRow}>
          <Text style={pdfSigningStyles.tableCellLabel}>Full Name</Text>
          <Text style={pdfSigningStyles.tableCellLabel}>Signature</Text>
          <Text style={pdfSigningStyles.tableCellLabel}>Date</Text>
        </View>
      </View>
    </View>
  )
}
