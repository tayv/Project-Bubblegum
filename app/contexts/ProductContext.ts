import { createContext } from "react"
import { PageContextType } from "@components/templates/templateTypes"

// Create context for product pages to pass values to children that are outside Form and can't make use of FormProvider
// Most of template functinality should be handled via RHF's FormContext
export const ProductContext = createContext<PageContextType | undefined>(
  undefined
)
