import React, { useRef } from "react"
import { ProductContext } from "@contexts/ProductContext"

type UseActiveSectionProps = {
  attributeValue?: string
  action?: "next" | "prev"
}

type UseUpdateActiveSectionProps = {
  updateType: "next" | "prev" | "reset"
}

const useUpdateActiveSection = () => {
  // useCallback so we can memoize this
  const setDataAttribute = React.useCallback(
    (sectionId: string, value: string) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.setAttribute("data-active-section", value)
      }
    },
    []
  )

  // Context so we can get the activeSection state from the product page and update it
  const contextValues = React.useContext(ProductContext)
  if (!contextValues) {
    console.log(
      "Error: You must import ProductContext in the useActionSection hook."
    )
    return () => {} // return a no-op function instead of null to avoid TS errors when using the hook
  }

  return ({ updateType }: UseUpdateActiveSectionProps) => {
    const activeSectionData = document.querySelector(
      `[data-active-section="true"]`
    )

    // Get indexes
    const currentIndex = contextValues.formSections.indexOf(
      contextValues.activeSection
    )
    const minIndex = 0
    const maxIndex = contextValues.formSections.length - 1
    let newSectionIndex

    if (updateType === "next" && currentIndex < maxIndex) {
      newSectionIndex = currentIndex + 1

      if (activeSectionData) {
        // Toggle its 'data-active-section' attribute value to 'false'
        activeSectionData.setAttribute("data-active-section", "false")
      }
    } else if (updateType === "prev" && currentIndex > minIndex) {
      newSectionIndex = currentIndex - 1

      if (activeSectionData) {
        // Toggle its 'data-active-section' attribute value to 'false'
        activeSectionData.setAttribute("data-active-section", "false")
      }

      // let newSectionId = contextValues.formSections[newSectionIndex]
      // contextValues.setActiveSection(newSectionId)

      // let newSectionElement = document.getElementById(newSectionId)
      // if (newSectionElement) {
      //   newSectionElement.setAttribute("data-active-section", "true")
      // }
    } else return
    // Update the data attribute of the active section
    let newSectionId = contextValues.formSections[newSectionIndex]
    contextValues.setActiveSection(newSectionId)

    let newSectionElement = document.getElementById(newSectionId)
    if (newSectionElement) {
      //  newSectionElement.setAttribute("data-active-section", "true")
      setDataAttribute(newSectionId, "true")
    }
  }
}

const useActiveSection = () => {
  const targetRef = useRef<HTMLElement | null>(null)
  const handleUpdateActiveSection = useUpdateActiveSection()

  const scrollToActiveSection = ({
    attributeValue,
    action = "next",
  }: UseActiveSectionProps) => {
    // Determine scroll direction
    if (action === "next") {
      handleUpdateActiveSection({ updateType: "next" })
    } else if (action === "prev") {
      handleUpdateActiveSection({ updateType: "prev" })
    }
    const element = document.querySelector(
      `[data-active-section="${attributeValue}"]`
    ) // NOTE: data attributes use all lowercase and avoid hyphens as required by React
    console.log("ELEMENT HERE", element)

    // type guard needed since querySelector returns the more generic Element type but we need to ensure an HTMLElement
    if (element instanceof HTMLElement) {
      targetRef.current = element // Attach the found element to the ref.
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return scrollToActiveSection
}

export default useActiveSection
