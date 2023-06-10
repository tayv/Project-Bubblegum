import { createContext } from "react"
import { PageContextType } from "@template/templateTypes"

// Create context for this page to pass needed values to template
export const PageContext = createContext<PageContextType | undefined>(undefined)
