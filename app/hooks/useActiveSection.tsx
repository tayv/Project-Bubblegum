import React from "react"
import { ProductContext } from "@contexts/ProductContext"
import useDataAttributes from "@hooks/useDataAttributes"

export type UseActiveSectionProps = {
  scrollToActiveSection: ({ action }: ScrollToActiveSectionProps) => void
}

type ScrollToActiveSectionProps = {
  action?: "next" | "prev"
}

type UseUpdateActiveSectionProps = {
  updateType: "next" | "prev" | "reset"
}

const useUpdateActiveSection = () => {
  const { activeSectionIndex, setActiveSectionIndex, sectionOrderedIds } =
    React.useContext(ProductContext)

  return ({ updateType }: UseUpdateActiveSectionProps) => {
    let newSectionIndex

    if (
      updateType === "next" &&
      activeSectionIndex < sectionOrderedIds.length - 1
    ) {
      newSectionIndex = activeSectionIndex + 1
    } else if (updateType === "prev" && activeSectionIndex > 0) {
      newSectionIndex = activeSectionIndex - 1
    } else return

    setActiveSectionIndex(newSectionIndex)
    // Rest of the logic for setting data attributes can remain the same.
  }
}

const useActiveSection = () => {
  const { activeSectionIndex, sectionOrderedIds, sectionRefs } =
    React.useContext(ProductContext)

  const handleUpdateActiveSection = useUpdateActiveSection()

  const scrollToActiveSection = ({ action }: ScrollToActiveSectionProps) => {
    // 1. Update active section based on scroll direction
    if (action === "next") {
      handleUpdateActiveSection({ updateType: "next" })
    } else if (action === "prev") {
      handleUpdateActiveSection({ updateType: "prev" })
    }
  }
  React.useEffect(() => {
    const currentActiveSectionId = sectionOrderedIds[activeSectionIndex]
    const currentActiveSectionRef =
      sectionRefs.current[currentActiveSectionId]?.current

    if (currentActiveSectionRef) {
      currentActiveSectionRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [activeSectionIndex, sectionOrderedIds, sectionRefs])

  return scrollToActiveSection
}

export default useActiveSection
