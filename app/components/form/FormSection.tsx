import { forwardRef } from "react"
import Card, { SectionCardProps } from "@ui/Card"
import useManageActiveSection from "@hooks/useActiveSection"

// This component is a wrapper for Card to enforce functionality needed for the section cards in a form (e.g. scrolling/active section styles)
const FormSection = forwardRef<HTMLDivElement, SectionCardProps>(
  function SetFormSectionRef({ id, children }, ref) {
    const { useRegisterSectionRef } = useManageActiveSection()
    const { targetSectionRef, activeSectionId } = useRegisterSectionRef(id)

    return (
      <Card
        id={id}
        variant="section"
        ref={targetSectionRef}
        data-active-section={activeSectionId === id ? "true" : "false"}
        className="data-[active-section=true]:bg-sky-300 scroll-mt-16" // scroll top used to offset the fixed header for when scrollIntoView() in useActiveSection hook runs
      >
        {children}
      </Card>
    )
  }
)

export default FormSection
