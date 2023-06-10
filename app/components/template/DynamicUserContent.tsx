"use client"

import React, { FC, useContext, useEffect } from "react"
import { PageContext } from "@template/context"
import { useFormContext, useWatch } from "react-hook-form"
import { PageContextType, DynamicContentProps } from "@template/templateTypes"

export type DynamicUserContentProps = DynamicContentProps & {
  emptySize: "standard" | "large" | "xlarge" | "xxlarge"
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
  watchedInputName,
  watchedInputValue,
  emptySize,
}: DynamicUserContentProps) => {
  // 1. Only convert to string if it exists or logic gate will fail
  // NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
  const currentInputValue =
    watchedInputValue !== undefined ? String(watchedInputValue) : undefined

  // 2. Check if currentInputValue isn't undefined or only contains blank spaces. (e.g. a text input interacted but user thinks it's empty)
  // NOTE: Don't check for falsy values since 0 is a valid value
  const hasAValue =
    currentInputValue !== undefined && currentInputValue.trim().length > 0

  // 3. Return value or underlines to template document.
  // NOTE: break-all needed for wrapping long unbreaking underlines
  return hasAValue ? (
    <>{currentInputValue}</>
  ) : (
    <span className="overflow-auto break-all">{emptySizeMap[emptySize]}</span>
  )
}

// Component Function Starts Here ----------------------------
const DynamicUserContent: FC<DynamicUserContentProps> = ({
  watchedInputName,
  emptySize = "standard",
}) => {
  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "DynamicUserContent must be used within a PageContext provider"
    )
  }

  // Check as useWatch won't work if watchedInputName is undefined
  if (!watchedInputName === undefined) {
    throw new Error(
      `watchedInputName is ${watchedInputName}. Check the watchedInputName prop passed to DynamicUserContent component`
    )
  }

  // Use RHF to watch input value
  const { control } = useFormContext() // Needs to be child of RHF FormContext.Provider
  const watchedInputValue = useWatch({
    control,
    name: watchedInputName,
    // defaultValue: // keep this disabled or the defaultValues won't auto load on initial render. Will have to manually pass defaultValues via PageContext
  })

  return (
    <>
      {RenderDynamicUserContent({
        watchedInputName,
        watchedInputValue,
        emptySize,
      })}
    </>
  )
}

export default DynamicUserContent
