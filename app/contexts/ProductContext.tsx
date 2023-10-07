"use client"
import { createContext, useState, ReactNode, FC } from "react"
import { Schema } from "@templates/templateTypes"
import { FormDataType } from "@productSchemas/productTypes"

type ProductContextProps = {
  activeSection: string
  setActiveSection: React.Dispatch<React.SetStateAction<string>>

  formSections: string[]
  setFormSections: React.Dispatch<React.SetStateAction<string[]>>
  registerFormSection: (id: string) => void

  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<string>>

  isFormSubmitted: boolean
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

type ProductProviderProps = {
  children: ReactNode

  defaultValues: {} // zod schema that will be defined in page.tsx

  schema?: Schema
}

// 1. Create context for product pages to pass values to children that are outside Form
// or don't use RHF values so can't use of FormProvider
// Try to handle template functionality via RHF's FormContext when possible
export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

// Use the Provider in product pages
export const ProductProvider: FC<ProductProviderProps> = ({
  defaultValues,
  children,
}) => {
  // Track active section. To be used by useActiveSection hook to know where to scroll to
  const [activeSection, setActiveSection] = useState("formSectionCard1")
  const [formSections, setFormSections] = useState<string[]>([])

  // Setup initial state
  // TODO See if this can be removed after refactor to PDF since we rely on RHF to handle state now
  const [formData, setFormData] = useState(defaultValues) // Need to set initial state to defaultValues to avoid type errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false) // For rendering next step (ie. open SignUpSheet)

  // Callback to add section ID. Pass it to each FormSection. Needs to be updated at parent level to avoid race conditions.
  const registerFormSection = (id: string) => {
    setFormSections((formSections) => {
      if (!formSections.includes(id)) {
        return [...formSections, id]
      }
      return formSections
    })
    console.log("formSections:", formSections)
  }

  // 2. Pass state values and methods to the context provider
  return (
    <ProductContext.Provider
      value={{
        activeSection,
        setActiveSection,
        formSections,
        setFormSections,
        registerFormSection,
        formData,
        setFormData,
        isFormSubmitted,
        setIsFormSubmitted,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
