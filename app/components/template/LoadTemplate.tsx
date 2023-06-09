"use client"

import { FC, useContext } from "react"
import { PageContext } from "@template/context"
import Product1Template from "@product1/product1Template.mdx"
import { useFormContext, useWatch } from "react-hook-form"


export type LoadTemplateProps = {
  inputName?: "jurisdiction" 
  productName: "product1" | "product2" | "product3"
}

export type RenderTemplateProps = {
  selectedJurisdiction: string
  productName: LoadTemplateProps["productName"]
}

// HELPER FUNCTIONS ----------------------------
const renderTemplate = ({
  selectedJurisdiction,
  productName,
}: RenderTemplateProps) => {
  console.log("swotch fired selectedJurisdiction", selectedJurisdiction)
  switch (productName) {
    case "product1":
      switch (selectedJurisdiction) {
        case "location1":
          return <Product1Template />
        case "location2":
          return <> Product 2 Location </>
        case "location3":
          return <> Product 3 Location </>
        default:
          return <>Please choose a valid location</>
      }
    default:
      return <>Please choose a valid product</>
  }
}

// MAIN COMOPNENT ----------------------------
const LoadTemplate: FC<LoadTemplateProps> = ({
  inputName = "jurisdiction",
  productName,
}) => {
  // Get context from Page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "LoadTemplate must be used within a PageContext provider"
    )
  }
  const { formData } = contextValue
  const { control } = useFormContext()

  const selectedJurisdiction = useWatch({
    control, 
    name: inputName, // almost always will be watching jursidiction input field
    defaultValue: "location1" // the default value if this field isn't available in the form or is undefined
  })

  // 1. formData typically undefined on first render. Only convert to string if it exists or logic gate will fail
  // NOTE: Need to normalize data since JS includes() requires String() not JSON.stringify
  //const selectedJurisdiction = formData[inputName] !== undefined ? String(formData[inputName]) : "location1"

  // If formData[inputName] isn't in hideFor array or undefined, display children
  return <>{ renderTemplate({selectedJurisdiction, productName}) }</>
}

export default LoadTemplate
