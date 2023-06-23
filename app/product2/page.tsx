"use client"
import React from "react"
import ReactDOM from "react-dom"
import { PDFViewer, StyleSheet } from "@react-pdf/renderer"
import dynamic from "next/dynamic"
import MyDocument from "./MyDocument"

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#E4E4E4",
  },
})

export default function Product2() {
  // Dynamically import PDFViewer to fix build bug since Next uses SSR
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  return (
    <PDFViewer style={styles.page}>
      <MyDocument />
    </PDFViewer>
  )
}
