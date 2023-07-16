import { StyleSheet } from "@react-pdf/renderer"

// Used to style the product PDF. For supported css see: https://react-pdf.org/styling
export const pdfStyles = StyleSheet.create({
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
  body: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  section: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  paragraph: {
    marginBottom: 2,
  },
  listUnordered: {
    textIndent: 10,
  },
  listOrdered: {
    textIndent: 10,
  },
  sectionStart: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
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
