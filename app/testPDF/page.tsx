"use client"
import React from "react"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { blob } from "stream/consumers"
import { set } from "date-fns"
import Product1Template from "@product1/product1Template.mdx"

// pdfMake fonts setup
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default function TestPDF() {

  // pdfMake document definition
  const docDefinition = {
    content: [
      {
        text: "This is a header",
        style: "header",
      },
      "No styling here, this is a standard paragraph",
      {
        text: "Another text",
        style: "anotherStyle",
      },
      {
        text: "Multiple styles applied",
        style: ["header", "anotherStyle"],
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: "right",
      },
    },
  }

  // Save the url that PDF visible on browser
  const [url, setUrl] = React.useState("")

  // pdfMake generate PDF
  const generatePDF = () => {
    const PDFGenerator = pdfMake.createPdf(docDefinition)
    PDFGenerator.getBlob(blob => {
     const url = (URL.createObjectURL(blob))
     setUrl(url)
    })
  }

  return (
    <>
      <h1>Test PDF URL</h1>
      <p>This is a test PDF page with PDFMake. Get the URL: {!!url && url } </p>
      <button className="bg-sky-200 border-2 p-2 rounded" onClick={generatePDF}>Generate PDF</button>

    </>
  )
}