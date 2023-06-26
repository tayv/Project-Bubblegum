"use client"
import React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
})

const testSchema = [
  {
    input1: {
      true: {
        heading: "This is a FIRST heading",
        text: "This is some text",
      },
      false: {
        heading: "This is a SECOND heading",
        text: "This is some more text",
      },
    },
    input2: {
      true: {
        heading: "This is a THIRD heading",
        text: "This is some text",
      },
      false: {
        heading: "This is a FOURTH heading",
        text: "This is some more text",
      },
    },
  },
]

const testValues = {
  input1: true,
  input2: false,
}

const testMapper = (testSchema, testValues) => {
  return testSchema.map((item, index) => {
    if (item.input1 && item.input1[testValues.input1]) {
      return (
        <Document key={index}>
          <Page size="A4" style={styles.page}>
            <Text style={styles.h1}>
              {item.input1[testValues.input1].heading}
            </Text>
            <View style={styles.section}>
              <Text key={index}>{item.input1[testValues.input1].text}</Text>
            </View>
          </Page>
        </Document>
      )
    } else {
      return null
    }
  })
}

// Create Document Component
const MyDocument = () => {
  //const DynamicText = () => "testme" // `${lastname}`;
  const DynamicText = ({ children }: { children: React.ReactNode }) => (
    <Text>{children}</Text>
  )

  return <>{testMapper(testSchema, testValues)}</>
}

export default MyDocument
