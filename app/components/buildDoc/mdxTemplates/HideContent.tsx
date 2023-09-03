"use client"

import { FC } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { DynamicContentProps } from "@components/templates/templateTypes"

export type HideContentProps = DynamicContentProps & {
  hideFor: string[]
  children: React.ReactElement
}

const HideContent: FC<HideContentProps> = ({
  hideFor,
  watchedInputName = "jurisdiction", // typically this component used for hiding content based on jurisdiction
  children,
}) => {
  // RHF Setup ----------------------------
  // Watch input value with RHF so don't need to pass formData via ProductContext and manually handle defaultValues
  const { control } = useFormContext()
  // Check as must be child of RHF FormContext.Provider to use useFormContext()
  if (!control) {
    throw new Error("HideContent must be used within a RHF FormProvider")
  }
  // Check as useWatch won't work if watchedInputName is undefined
  if (!watchedInputName === undefined) {
    throw new Error(
      `watchedInputName is ${watchedInputName}. Check the watchedInputName prop passed to HideContent component`
    )
  }
  const watchedInputValue = useWatch({
    control,
    name: watchedInputName,
    // defaultValue: // keep this disabled or the defaultValues won't auto load on initial render and will have to manually pass defaultValues via ProductContext
  })
  // End RHF Setup -------------------------------------

  // Render Logic Starts -------------------------------
  // 1. Get current value of watchedInputName from formData. NOTE: Need to normalize data since JS comparison requires String() not JSON.stringify
  const currentInputValue = String(watchedInputValue)
  // 2. Check if currentInputValue is in the hideFor array as this prop holds the list of input values we want to hide template content for
  if (currentInputValue !== undefined && hideFor.includes(currentInputValue)) {
    return null
  }
  // If currentInputValue isn't in hideFor array or undefined, display children
  return <>{children}</>
}

export default HideContent

// NOTES
// This component is primarily intended to be used to hide content for specific jurisdictions. This is why it accepts an array only for input values and not input names
