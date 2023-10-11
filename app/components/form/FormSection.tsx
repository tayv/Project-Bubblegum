import { FC, forwardRef, useEffect, useRef, useContext } from "react"
import Card, { SectionCardProps } from "@ui/Card"
import { ProductContext } from "@contexts/ProductContext"

// This component is a wrapper for Card to enforce functionality needed for the section cards in a form (e.g. scrolling/active section styles)

const FormSection = forwardRef<HTMLDivElement, SectionCardProps>(
  function SetFormSectionRef(
    {
      id,
      //   "data-active-section": dataactivesection,
      // activeSection,
      // formSections,
      //   setFormSections,
      // registerFormSection,
      children,
    },
    ref
  ) {
    const targetRef = useRef<HTMLElement | null>(null)

    // Add this ref to formSections if it's not already in there
    // useEffect(() => {
    //   registerFormSection(targetRef)
    // }, [targetRef, registerFormSection])

    // Add this id to formSections if it's not already in there
    // useEffect(() => {
    //   registerFormSection(id)
    // }, [id, registerFormSection])
    const contextValues = useContext(ProductContext)

    if (!contextValues) {
      throw new Error("FormSection must be used within a ProductProvider")
    }
    const {
      sectionOrderedIds,
      activeSectionIndex,
      sectionRefs,
      registerSection,
      unregisterSection,
    } = contextValues

    useEffect(() => {
      // Only register the section if it's not already registered.

      registerSection(id, targetRef)
      console.log("Registering section:", id)

      return () => {
        unregisterSection(id)
        console.log("unregistering section:", id)
      }
    }, [id, registerSection, unregisterSection])
    const activeSectionId = sectionOrderedIds[activeSectionIndex]
    const activeSection = sectionRefs.current[activeSectionId]
    console.log("activeSection", activeSection)
    return (
      <Card
        id={id}
        variant="section"
        ref={targetRef}
        data-active-section={activeSectionId === id ? "true" : "false"}
        className="data-[active-section=true]:bg-sky-300 scroll-mt-16" // scroll top used to offset the fixed header for when scrollIntoView() in useActiveSection hook runs
      >
        {children}
      </Card>
    )
  }
)

export default FormSection
