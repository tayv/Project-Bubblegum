import { StyleSheet } from "@react-pdf/renderer"

// Used to style the product PDF. For supported css see: https://react-pdf.org/styling
export const pdfStyles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "100vh",
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
  section: {
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    borderBottom: "2 solid #ccc",
    paddingBottom: 5,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  h2: {
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 0,
    opacity: 0.8,
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 2,
    textIndent: 15,
  },
  listUnordered: {
    textIndent: 25,
  },
  listOrdered: {
    textIndent: 25,
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
    borderTop: "1 solid #000",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
})
