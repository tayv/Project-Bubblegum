import { createContext } from "react"
import { PageContextType } from "@template/templateTypes"

// Create context for this page to pass needed values to children
// Most of template functinality should be handled via RHF's FormContext
export const PageContext = createContext<PageContextType | undefined>(undefined)
