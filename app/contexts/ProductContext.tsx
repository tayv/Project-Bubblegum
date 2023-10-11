"use client"
import React, { useRef, createContext, useState, ReactNode, FC } from "react"
import { Schema } from "@templates/templateTypes"
import { FormDataType } from "@productSchemas/productTypes"

type ProductContextProps = {
  activeSectionIndex: number
  setActiveSectionIndex: React.Dispatch<
    React.SetStateAction<ProductContextProps["activeSectionIndex"]>
  >
  sectionOrderedIds: string[]
  registerSection: (id: string, ref: React.RefObject<HTMLElement>) => void
  unregisterSection: (id: string) => void
  sectionRefs: React.MutableRefObject<{
    [key: string]: React.RefObject<HTMLElement>
  }>
  // formSections: string[]
  // setFormSections: React.Dispatch<React.SetStateAction<string[]>>
  // registerFormSection: (id: string) => void

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
  // const [activeSection, setActiveSection] =
  //   useState<ProductContextProps["activeSection"]>(null)
  // const [formSections, setFormSections] = useState<
  //   ProductContextProps["formSections"]
  // >([])

  // const [sectionRefs, setSectionRefs] = useState<
  //   React.RefObject<HTMLElement>[]
  // >([])

  // TEST -----
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLElement> }>(
    {}
  ) // useRef object used in top-level context because it will persist for the full lifetime of the component and won't trigger re-renders
  const [sectionOrderedIds, setSectionOrderedIds] = useState<string[]>([])

  const registerSection = React.useCallback(
    (
      id: string,
      ref: React.RefObject<HTMLElement>,
      sectionOrderedIds: string[]
    ) => {
      // Use a functional update to access the latest value of sectionOrderedIds without making it a dependency
      setSectionOrderedIds((sectionOrderedIds) => {
        if (!sectionOrderedIds.includes(id)) {
          sectionRefs.current[id] = ref
          return [...sectionOrderedIds, id]
        }
        return sectionOrderedIds // If id already exists, just return the current state.
      })
    },
    []
  )

  const unregisterSection = React.useCallback((id: string) => {
    delete sectionRefs.current[id]
    setSectionOrderedIds((prevIds) => prevIds.filter((prevId) => prevId !== id))
  }, [])

  // TEST END ---

  // Setup initial state
  // TODO See if this can be removed after refactor to PDF since we rely on RHF to handle state now
  const [formData, setFormData] = useState(defaultValues) // Need to set initial state to defaultValues to avoid type errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false) // For rendering next step (ie. open SignUpSheet)

  // Callback to add section ID. Pass it to each FormSection. Needs to be updated at parent level to avoid race conditions.
  // const registerFormSection = (targetRef: HTMLElement | null) => {
  //   setFormSections((formSections) => {
  //     // Clone the current set and add the new ref. Using Set prevents duplication.
  //     const updatedSet = new Set(formSections)
  //     updatedSet.add(targetRef)
  //     const newFormSectionsArray = Array.from(updatedSet) // Convert to array so we can use indexes to set active section in hooks
  //     return newFormSectionsArray
  //   })
  // }
  // const registerFormSection = (id: string) => {
  //   setFormSections((formSections) => {
  //     if (!formSections.includes(id)) {
  //       return [...formSections, id]
  //     }
  //     return formSections
  //   })
  // }

  // 2. Pass state values and methods to the context provider
  return (
    <ProductContext.Provider
      value={{
        activeSectionIndex,
        setActiveSectionIndex,
        sectionOrderedIds,
        // setActiveSection,
        // formSections,
        // setFormSections,
        registerSection,
        unregisterSection,
        formData,
        setFormData,
        isFormSubmitted,
        setIsFormSubmitted,
        sectionRefs,
        // setSectionRefs,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
