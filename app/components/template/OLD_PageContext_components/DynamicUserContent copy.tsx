"use client"

import React, { FC, useContext } from "react"
import { PageContext } from "@template/context"
import { PageContextType, DynamicContentProps } from "@template/templateTypes"

export type DynamicUserContentProps = {
  formData: PageContextType["formData"]
  emptySize: "standard" | "large" | "xlarge" | "xxlarge"
  inputName: string
}

// DYNAMIC STYLES
const emptySizeMap: { [key in DynamicUserContentProps["emptySize"]]: string } =
  {
    standard: "________________________________",
    large:
      "__________________________________________________________________________________",
    xlarge:
      "________________________________________________________________________________________________________________________________________________________________________________________",
    xxlarge:
      "________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
  }

// Helper functions ----------------------------
const RenderDynamicUserContent = ({
  formData = {},
  inputName,
  emptySize,
}: DynamicUserContentProps) => {
  // 1. formData typically undefined on first render. Only convert to string if it exists or logic gate will fail
  // NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
  const selectedInputValue =
    formData[inputName] !== undefined ? String(formData[inputName]) : undefined
  // 2. Check if selectedInputValue is undefined or only contains blank spaces.
  // NOTE: Don't check for falsy values since 0 is a valid value
  const hasAValue =
    selectedInputValue !== undefined && selectedInputValue.trim().length > 0
  // 3. Return value or underlines to template document.
  // NOTE: break-all needed for wrapping long unbreaking underlines
  return hasAValue ? (
    <>{selectedInputValue}</>
  ) : (
    <span className="overflow-auto break-all">{emptySizeMap[emptySize]}</span>
  )
}

// Component Function Starts Here ----------------------------
const DynamicUserContent: FC<DynamicUserContentProps> = ({
  inputName,
  emptySize = "standard",
}) => {
  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "DynamicUserContent must be used within a PageContext provider"
    )
  }
  const { formData } = contextValue

  return <>{RenderDynamicUserContent({ formData, inputName, emptySize })}</>
}

export default DynamicUserContent

// Add a wrapper that accepts an array of jurisdition values and sets condition on content or components
