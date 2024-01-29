import React from "react"
import { ProductContext, ProductContextProps } from "@contexts/ProductContext"
import useDataAttributes from "@hooks/useDataAttributes"

export type UseActiveSectionProps = {
  scrollToActiveSection: ({ action }: ScrollToActiveSectionProps) => void
  registerSection: (id: string, ref: React.RefObject<HTMLElement>) => void
  unregisterSection: (id: string) => void
  sectionOrderedIds: ProductContextProps["sectionOrderedIds"]
  activeSectionIndex: ProductContextProps["activeSectionIndex"]
}

type ScrollToActiveSectionProps = {
  action?: "next" | "prev"
}

type UseUpdateActiveSectionProps = {
  updateType: "next" | "prev" | "reset"
}

const useManageActiveSection = () => {
  // Set up global context from ProductContext
  const contextValues = React.useContext(ProductContext)
  if (!contextValues) {
    throw new Error(
      "This must be used within a ProductProvider in order for useManageActiveSection hook to work."
    )
  }
  const {
    sectionOrderedIds,
    setSectionOrderedIds,
    activeSectionIndex,
    setActiveSectionIndex,
    sectionRefDictionary,
  } = contextValues

  // 1. Update the section index (use to get the id for the active section by looking up the ordered array of section ids)
  const updateActiveSectionIndex = () => {
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
    }
  }

  const updateActiveSectionById = (sectionId: string) => {
    const updatedIndex = sectionOrderedIds.findIndex(
      (existingId) => existingId === sectionId
    )
    if (updatedIndex !== -1) {
      setActiveSectionIndex(updatedIndex)
    }
  }

  // 2. Register/unregister used by FormSection component to add or remove the component to the section ref dictionary on mount/unmount
  const useRegisterSectionRef = (id: string) => {
    const targetSectionRef = React.useRef<HTMLDivElement | null>(null)

    const addSectionRef = React.useCallback(
      (id: string, ref: React.RefObject<HTMLElement>) => {
        // Prevent infinite loop: Use a functional update to access the latest value of sectionOrderedIds without making it a dependency
        setSectionOrderedIds((sectionOrderedIds) => {
          if (!sectionOrderedIds.includes(id)) {
            sectionRefDictionary.current[id] = ref
            return [...sectionOrderedIds, id]
          }
          return sectionOrderedIds // If id already exists, just return the current state.
        })
      },
      []
    )

    const removeSectionRef = React.useCallback((id: string) => {
      delete sectionRefDictionary.current[id]
      setSectionOrderedIds((prevIds: string[]) =>
        prevIds.filter((prevId) => prevId !== id)
      )
    }, [])

    React.useEffect(() => {
      // Only this section gets added into the sectionRef dictionary.
      addSectionRef(id, targetSectionRef)

      return () => {
        removeSectionRef(id)
      }
    }, [id, addSectionRef, removeSectionRef])

    // Return this to access the correct section ref in FormSection
    const activeSectionId = sectionOrderedIds[activeSectionIndex]
    const activeSection = sectionRefDictionary.current[activeSectionId]

    return { targetSectionRef, activeSectionId, activeSection }
  }

  // 3. Trigger scrolling action. Used mostly by Pillbar
  const useScrollActiveSection = () => {
    const handleUpdateActiveSection = updateActiveSectionIndex()

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
        sectionRefDictionary.current[currentActiveSectionId]?.current

      if (currentActiveSectionRef) {
        currentActiveSectionRef.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSectionIndex, sectionOrderedIds])

    return scrollToActiveSection
  }

  return {
    updateActiveSectionIndex,
    updateActiveSectionById,
    useRegisterSectionRef,
    useScrollActiveSection,
    sectionOrderedIds,
    activeSectionIndex,
  }
}
export default useManageActiveSection
