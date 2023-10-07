import { FC, forwardRef, useEffect } from "react"
import Card, { SectionCardProps } from "@ui/Card"

// This component is a wrapper for Card to enforce functionality needed for the section cards in a form (e.g. scrolling/active section styles)

const FormSection = forwardRef<HTMLDivElement, SectionCardProps>(
  function SetFormSectionRef(
    {
      id,
      "data-active-section": dataactivesection,
      activeSection,
      formSections,
      setFormSections,
      registerFormSection,
      children,
    },
    ref
  ) {
    // Add this id to formSections if it's not already in there
    useEffect(() => {
      registerFormSection(id)
    }, [id, registerFormSection])
    console.log("active section", activeSection)
    return (
      <Card
        variant="section"
        ref={ref}
        id={id}
        // data-active-section={dataactivesection}
        data-active-section={activeSection === id ? "true" : "false"}
        className="data-[active-section=true]:bg-sky-300 "
      >
        {children}
      </Card>
    )
  }
)

export default FormSection
