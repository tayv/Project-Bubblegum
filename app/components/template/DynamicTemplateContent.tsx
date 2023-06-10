"use client"

import React, { FC, useContext } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { PageContext } from "@template/context"
import { DynamicContentProps } from "@template/templateTypes"

export type DynamicTemplateContentProps = DynamicContentProps & {
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

  const { schema } = contextValue // Needs to be child of PageContext.Provider
  const { control } = useFormContext() // Needs to be child of RHF FormContext.Provider

  // Watch input value using useWatch
  const watchedInputValue = useWatch({
    control, 
    name: watchedInputName, // the name of the field to watch
    // defaultValue: // keep this disabled or the defaultValues won't auto load on initial render. Will have to manually pass defaultValues via PageContext
  })

  return (
    <>
      {RenderDynamicTemplateContent({ watchedInputName, watchedInputValue, schema, condition })}
    </>
  )
}

export default DynamicTemplateContent

// This component uses react hook form's FormProvier and useWatch to get input values instead of PageContext. 
// This is so the formData and defaultValues don't have to be manually handled and passed via PageContext
// PageContext is still required for the condition schema to work though