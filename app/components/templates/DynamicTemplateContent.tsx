"use client"

import React, { FC, useContext } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { PageContext } from "@components/templates/context"
import product1SchemaTest from "@product1/product1SchemaTest.json"
import {
  DynamicContentProps,
  Schema,
} from "@components/templates/templateTypes"

export type DynamicTemplateContentProps = DynamicContentProps & {
  schema: Schema
  condition: string
}

// Helper functions ----------------------------
const RenderDynamicTemplateContent = ({
  watchedInputName,
  watchedInputValue,
  schema,
  condition,
}: DynamicTemplateContentProps) => {
  // Check if watchedInputName exists in schema. Can't checl for formData since it's unavailable at initial render (requires form submission)
  if (!(watchedInputName in schema)) {
    throw new Error(
      `watchedInputName "${watchedInputName}" doesn't exist in schema. Please check the watchedInputName prop passed to DynamicTemplateContent component`
    )
  }
  // 1. Narrow down schema for specific watchedInputName
  const subSchema = schema[watchedInputName]
  // 2. Get current value of watchedInputName from formData. NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
  const currentInputValue = String(watchedInputValue)
  // 3. Check if currentInputValue exists in subSchema and return the condition or null
  const existsInSubSchema = subSchema[currentInputValue]
  return existsInSubSchema ? (
    <> {subSchema[currentInputValue][condition]} </>
  ) : null
}

// Component Function Starts Here ----------------------------
const DynamicTemplateContent: FC<DynamicTemplateContentProps> = ({
  watchedInputName,
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

  // Schema holds all the conditions for the template.
  // It matches the formData structure and must be a child of PageContext.Provider

  //const { schema } = contextValue // no longer using this after refactore
  const schema = product1SchemaTest // TODO: Remove this after testing

  // Check as useWatch won't work if watchedInputName is undefined
  if (!watchedInputName === undefined) {
    throw new Error(
      `watchedInputName is ${watchedInputName}. Check the watchedInputName prop passed to DynamicTemplateContent component`
    )
  }

  // Use RHF to watch input value so don't need to pass formData via PageContext and manually handle defaultValues
  const { control } = useFormContext() // Must be child of RHF FormContext.Provider
  const watchedInputValue = useWatch({
    control,
    name: watchedInputName,
    // defaultValue: // keep this disabled or the defaultValues won't auto load on initial render. Will have to manually pass defaultValues via PageContext
  })

  return (
    <>
      {RenderDynamicTemplateContent({
        watchedInputName,
        watchedInputValue,
        schema,
        condition,
      })}
    </>
  )
}

export default DynamicTemplateContent

// This component uses react hook form's FormProvier and useWatch to get input values instead of PageContext.
// This is so the formData and defaultValues don't have to be manually handled and passed via PageContext
// PageContext is still required for the condition schema to work though
