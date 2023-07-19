import { StyleSheet } from "@react-pdf/renderer"

// Used to style the product PDF. For supported css see: https://react-pdf.org/styling
export const pdfStyles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "100vh",
  },
  page: {
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 30,
    paddingBottom: 50,
    marginBottom: 0,
    fontFamily: "Inter",
    fontSize: 14,
    color: "#000",
  },
  documentTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottom: "0.25 solid #3306B4",
    paddingBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    color: "#3306B4",
  },
  h1: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 0,
    color: "#3306B4",
  },
  h2: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#3306B4",
    marginBottom: 0,
    opacity: 0.8,
  },
  paragraph: {
    // fontSize: 14,
    fontWeight: "normal",
    paddingBottom: 2,
  },
  listUnordered: {
    textIndent: 10,
  },
  listOrdered: {
    textIndent: 10,
  },
  footer: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 0,
    paddingTop: 6,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.5,
    borderTop: "0.25 solid #000",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  inlineItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 10,
  },
  numberSection: {
    position: "absolute",
    left: -5,
    paddingTop: 2,
    paddingRight: 10,
    marginLeft: -20,
    fontWeight: "medium",
    fontSize: 18,
  },
  numberParagraph: {
    position: "absolute",
    left: -5,
    paddingTop: 2,
    paddingRight: 10,
    marginLeft: -20,
    opacity: 0.5,
    textAlign: "right",
    fontSize: 10,
  },
})
