import React, { useRef } from "react"
import { ProductContext } from "@contexts/ProductContext"
import useDataAttributes from "@hooks/useDataAttributes"

export type UseActiveSectionProps = {
  scrollToActiveSection: ({
    attributeValue,
    action,
  }: ScrollToActiveSectionProps) => void
}

type ScrollToActiveSectionProps = {
  attributeValue?: string
  action?: "next" | "prev"
}

type UseUpdateActiveSectionProps = {
  updateType: "next" | "prev" | "reset"
}

// HELPERS
// Can be split out into own file if end up reusing elsewhere
const useUpdateActiveSection = () => {
  const { setDataAttribute } = useDataAttributes()

  // Context so we can get the activeSection state from the product page and update it
  const contextValues = React.useContext(ProductContext)
  if (!contextValues) {
    console.log(
      "Error: You must import ProductContext in the useActionSection hook."
    )
    return () => {} // return a no-op function instead of null to avoid TS errors when using the hook
  }

  return ({ updateType }: UseUpdateActiveSectionProps) => {
    // 1. Get the current active section. If none will return null
    const currentActiveSectionElement = document.querySelector(
      `[data-active-section="true"]`
    )

    // 2.  Get indexes
    const currentIndex = contextValues.formSections.indexOf(
      contextValues.activeSection
    )
    const minIndex = 0
    const maxIndex = contextValues.formSections.length - 1
    let newSectionIndex

    // 3. Update indexes based on conditions
    if (updateType === "next" && currentIndex < maxIndex) {
      newSectionIndex = currentIndex + 1
    } else if (updateType === "prev" && currentIndex > minIndex) {
      newSectionIndex = currentIndex - 1
    } else return

    // 3. Toggle the current active section to false to remove styling
    if (currentActiveSectionElement) {
      setDataAttribute({
        elementId: currentActiveSectionElement,
        attributeName: "active-section",
        value: "false",
      })
    }

    // 4. Update the active section tracked in the product context's state
    const newSectionId = contextValues.formSections[newSectionIndex]
    contextValues.setActiveSection(newSectionId)

    // 5. Update data attribute for new active section to add styling
    const newSectionElement = document.getElementById(newSectionId)
    if (newSectionElement) {
      setDataAttribute({
        elementId: newSectionId,
        attributeName: "active-section",
        value: "true",
      })
    }
  }
}

// MAIN HOOK
const useActiveSection = () => {
  const targetRef = useRef<HTMLElement | null>(null)
  const handleUpdateActiveSection = useUpdateActiveSection()

  const scrollToActiveSection = ({
    attributeValue,
    action = "next",
  }: ScrollToActiveSectionProps) => {
    // 1. Update active section based on scroll direction
    if (action === "next") {
      handleUpdateActiveSection({ updateType: "next" })
    } else if (action === "prev") {
      handleUpdateActiveSection({ updateType: "prev" })
    }

    // 2. Get the current active section so we can scroll to it
    const activeSectionElement = document.querySelector(
      `[data-active-section="${attributeValue}"]`
    ) // NOTE: data attributes use all lowercase and avoid hyphens as required by React

    // 3. Get top nav height so we can calculate scroll position. Refer to SideNav to view it.
    const mainNavElement = document.getElementById("mainNav")
    const mainNavHeight = mainNavElement ? mainNavElement.offsetHeight : 0

    // 4. Scroll to the new active section
    // type guard needed since querySelector returns the more generic activeSectionElement type but we need to ensure an HTMLElement
    if (activeSectionElement instanceof HTMLElement) {
      targetRef.current = activeSectionElement // Attach the found activeSectionElement to the ref.
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return scrollToActiveSection
}

export default useActiveSection
