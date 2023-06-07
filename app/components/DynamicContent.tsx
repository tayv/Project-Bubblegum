"use client"

import React, { FC, useContext } from "react"
import { PageContext } from "@product1/page"

export type DynamicContentProps = {
  formData: { [key: string]: string | number | boolean | Date  } // Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  schema: { [key: string]: { [key: string]: { [key: string]: string } } } // 2 level deep nested object with key/value pairs
  inputName: string
  condition: string
}

// Helper functions ----------------------------
const RenderDynamicContent = ({
  formData,
  schema,
  inputName,
  condition,
}: DynamicContentProps) => {

    // Check if inputName exists in schema. Can't checl for formData since it's unavailable at initial render (requires form submission)
    if (!(inputName in schema)) {
      throw new Error(
        `inputName "${inputName}" doesn't exist in schema. Please check the inputName prop passed to DynamicContent component`
      )
    }
    // 1. Narrow down schema for specific inputName
    const subSchema = schema[inputName]
    // 2. Get current value of inputName from formData. NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
    const selectedInputValue = String(formData[inputName]) 
    // 3. Check if selectedInputValue exists in subSchema and return the condition or null
    const existsInSubSchema = subSchema[selectedInputValue]
    return existsInSubSchema ? <> {subSchema[selectedInputValue][condition]} </> : null
  }

// Component Function Starts Here ----------------------------
const DynamicContent: FC<DynamicContentProps> = ({
  inputName,
  condition,
  ...props
}) => {

  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "DynamicContent must be used within a PageContext provider"
    )
  }
  const { formData, schema } = contextValue

  return <>{RenderDynamicContent({ formData, inputName, schema, condition })}</>
}

export default DynamicContent


 
