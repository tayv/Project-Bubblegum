"use client"

import { FC } from "react"
import Product1Template from "@product1/product1Template.mdx"
import Product1TemplateB from "@product1/product1TemplateB.mdx"
import { useFormContext, useWatch } from "react-hook-form"
import { ProductNameProps } from "@components/templates/templateTypes"

export type LoadTemplateProps = {
  watchedInputName?: "jurisdiction"
  productName: ProductNameProps["productName"]
}

export type RenderTemplateProps = {
  selectedJurisdiction: string // Could make this a specific list in future and move to templateTypes
  productName: LoadTemplateProps["productName"]
}

// HELPER FUNCTIONS ----------------------------
const renderTemplate = ({
  selectedJurisdiction,
  productName,
}: RenderTemplateProps) => {
  switch (productName) {
    case "product1":
      switch (selectedJurisdiction) {
        case "location1":
          return <Product1Template />
        case "location2":
          return <Product1TemplateB />
        case "location3":
          return <Product1Template />
        default:
          return <>Please choose a valid location</>
      }
    default:
      return <>Please choose a valid product</>
  }
}

// MAIN COMOPNENT ----------------------------
const LoadTemplate: FC<LoadTemplateProps> = ({
  watchedInputName = "jurisdiction",
  productName,
}) => {
  // RHF Setup ----------------------------
  // Watch input value with RHF so don't need to pass formData via PageContext and manually handle defaultValues
  const { control } = useFormContext()
  // Check as must be child of RHF FormContext.Provider to use useFormContext()
  if (!control) {
    throw new Error("LoadTemplate must be used within a RHF FormProvider")
  }
  // Check as useWatch won't work if watchedInputName is undefined
  if (!watchedInputName === undefined) {
    throw new Error(
      `watchedInputName is ${watchedInputName}. Check the watchedInputName prop passed to LoadTemplate component. Typically it should watch an input field named: "jurisdiction"`
    )
  }
  const selectedJurisdiction = useWatch({
    control,
    name: watchedInputName, // almost always will be watching jursidiction input field
    // defaultValue: // keep this disabled or the defaultValues won't auto load on initial render and will have to manually pass defaultValues via PageContext
  })
  // End RHF Setup -------------------------------------

  return <>{renderTemplate({ selectedJurisdiction, productName })}</>
}

export default LoadTemplate

// NOTES
// This component is intended to load product templates based on the selected jurisdiction. This is why watchedInputName defaults to "jurisdiction"
