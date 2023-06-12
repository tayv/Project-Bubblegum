"use client"

import { FC, useContext } from "react"
import { PageContext } from "@template/context"

export type HideContentProps = {
  hideFor: string[]
  inputName: string
  children: React.ReactElement
}

const HideContent: FC<HideContentProps> = ({
  hideFor,
  inputName,
  children,
}) => {
  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error("HideContent must be used within a PageContext provider")
  }
  const { formData } = contextValue

  // 1. formData typically undefined on first render. Only convert to string if it exists or logic gate will fail
  // NOTE: Need to normalize data since JS includes() requires String() not JSON.stringify
  const selectedInputValue =
    formData[inputName] !== undefined ? String(formData[inputName]) : undefined

  // If formData[inputName] is in hideFor array, hide children
  if (
    selectedInputValue !== undefined &&
    hideFor.includes(selectedInputValue)
  ) {
    return null
  }

  // If formData[inputName] isn't in hideFor array or undefined, display children
  return <>{children}</>
}

export default HideContent
