"use client"

import React, { FC, useContext } from "react"
import { PageContext } from "@template/context"
import { PageContextType } from "@template/templateTypes"

export type DynamicTemplateContentProps = {
  formData: PageContextType["formData"]
  schema: PageContextType["schema"]
  inputName: string
  condition: string
}

// Helper functions ----------------------------
const RenderDynamicTemplateContent = ({
  formData,
  schema,
  inputName,
  condition,
}: DynamicTemplateContentProps) => {
  // Check if inputName exists in schema. Can't checl for formData since it's unavailable at initial render (requires form submission)
  if (!(inputName in schema)) {
    throw new Error(
      `inputName "${inputName}" doesn't exist in schema. Please check the inputName prop passed to DynamicTemplateContent component`
    )
  }
  // 1. Narrow down schema for specific inputName
  const subSchema = schema[inputName]
  // 2. Get current value of inputName from formData. NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
  const selectedInputValue = String(formData[inputName])
  // 3. Check if selectedInputValue exists in subSchema and return the condition or null
  const existsInSubSchema = subSchema[selectedInputValue]
  return existsInSubSchema ? (
    <> {subSchema[selectedInputValue][condition]} </>
  ) : null
}

// Component Function Starts Here ----------------------------
const DynamicTemplateContent: FC<DynamicTemplateContentProps> = ({
  inputName,
  condition,
  ...props
}) => {
  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "DynamicTemplateContent must be used within a PageContext provider"
    )
  }
  const { formData, schema } = contextValue

  return (
    <>
      {RenderDynamicTemplateContent({ formData, inputName, schema, condition })}
    </>
  )
}

export default DynamicTemplateContent
