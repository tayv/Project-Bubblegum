"use client"
import React, { useRef, createContext, useState, ReactNode, FC } from "react"
import { Schema } from "@templates/templateTypes"
import { FormDataType } from "@templates/productSchemas/productTypes"

export type ProductContextProps = {
  activeSectionIndex: number
  setActiveSectionIndex: React.Dispatch<
    React.SetStateAction<ProductContextProps["activeSectionIndex"]>
  >

  sectionRefDictionary: React.MutableRefObject<{
    [key: string]: React.RefObject<HTMLElement>
  }>
  sectionOrderedIds: string[]
  setSectionOrderedIds: React.Dispatch<React.SetStateAction<string[]>>

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

// 1. Create context for product pages to pass values to children that are outside Form/don't use RHF values which means can't use of FormProvider
// Try to handle template functionality via RHF's FormContext when possible
export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
)

// Use the Provider in product pages
export const ProductProvider: FC<ProductProviderProps> = ({
  defaultValues,
  children,
}) => {
  // 1. Setup universal state
  // --- ACTIVE FORM SECTION STATE. To be used by useManageActiveSection hook
  // Index used for stepping through array of ordered section IDs
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [sectionOrderedIds, setSectionOrderedIds] = useState<string[]>([])
  // Dictionary needed so we can looked ref for current index's Id
  // useRef object used in top-level context because it will persist for the full lifetime of the component and won't trigger re-renders
  const sectionRefDictionary = useRef<{
    [key: string]: React.RefObject<HTMLElement>
  }>({})

  // --- Form state
  // TODO See if this can be removed after refactor to PDF since we rely on RHF to handle state now
  const [formData, setFormData] = useState(defaultValues) // Need to set initial state to defaultValues to avoid type errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false) // For rendering next step (ie. open SignUpSheet)

  // 2. Pass state values and methods to the context provider
  return (
    <ProductContext.Provider
      value={{
        activeSectionIndex,
        setActiveSectionIndex,
        sectionOrderedIds,
        setSectionOrderedIds,
        formData,
        setFormData,
        isFormSubmitted,
        setIsFormSubmitted,
        sectionRefDictionary,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
