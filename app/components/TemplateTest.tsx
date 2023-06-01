"use client"

import React, { FC, JSXElementConstructor } from "react"
import Paragraph from "@designSystem/atoms/Paragraph"
import Divider from "@designSystem/atoms/Divider"

export type FormDataObj = {
  docID: number
  formData: {} | { key: string; value: string } // Will typecheck specific key/value pairs in actual implementation
}

export type TemplateProps = {
  docData: FormDataObj
  location: string
}

// Helper functions ----------------------------
let renderTable = ({ docID, formData }: FormDataObj) => {
  return (
  
        Object.entries(formData).map(([key, value], index) => {
          return (
            <span key={index} className="bg-yellow-100">
             <Paragraph className="inline bg-yellow-100">{key}, {value}</Paragraph>
            </span>
          )
        })

  )
}

const renderTemplate = ({ location, docData }: TemplateProps) => {
  let { docID, formData } = docData

  switch (location) {
    case "a":
      return (
        <Paragraph size="small">
          Here&apos;s boilerplate text plus some dynamic content based on the
          form values 👉 <strong>{docID}</strong>
        </Paragraph>
      )

    case "b":
      return // (formData.input1 === "some data") && <Paragraph size="large" text="This is boilerplate text. The following is dynamic content 👉 " > <strong>{ formData.input2 }</strong></Paragraph>

    case "c":
      return renderTable({ docID, formData })

    default:
      return null
  }
}

// Component Function Starts Here ----------------------------
const TemplateTest: FC<TemplateProps> = ({
  docData,
  location,
  ...props
}) => {
  let docID = docData.docID
  let formData = docData.formData

  return (
    <>
      {renderTemplate({ location, docData })}
    </>
  )
}

export default TemplateTest
