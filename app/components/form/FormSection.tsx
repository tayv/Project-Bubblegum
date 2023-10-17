import { forwardRef } from "react"
import Card, { SectionCardProps } from "@ui/Card"
import useManageActiveSection from "@hooks/useManageActiveSection"
import classNames from "classnames"
import { StepperButton } from "./PillBar"

// This component is a wrapper for Card to enforce functionality needed for the section cards in a form (e.g. scrolling/active section styles)
const FormSection = forwardRef<HTMLDivElement, SectionCardProps>(
  function SetFormSectionRef({ id, children }, ref) {
    const {
      updateActiveSectionById,
      useRegisterSectionRef,
      useScrollActiveSection,
    } = useManageActiveSection()
    const { targetSectionRef, activeSectionId } = useRegisterSectionRef(id)
    const scrollToActiveSection = useScrollActiveSection()

    const handleSectionClick = () => {
      if (activeSectionId !== id) {
        updateActiveSectionById(id)
      }
    }

    return (
      <Card
        id={id}
        variant="section"
        // interactionStyle="hover"
        ref={targetSectionRef}
        data-active-section={activeSectionId === id ? "true" : "false"}
        onClick={handleSectionClick}
        className={classNames([
          "data-[active-section=true]:bg-white data-[active-section=true]:shadow-lg data-[active-section=true]:shadow-cta-500/50 data-[active-section=true]:ring-8 data-[active-section=true]:ring-cta-100/40 scroll-mt-16",
          "data-[active-section=false]:bg-white/40",
          "ease-in duration-500 ",
        ])} // scroll top used to offset the fixed header for when scrollIntoView() in useActiveSection hook runs
      >
        {children}
        {activeSectionId === id ? (
          <div className="hidden lg:flex lg:justify-end lg:gap-2 lg:pt-4">
            <StepperButton
              variant="next"
              scrollToActiveSection={scrollToActiveSection}
            />
            <StepperButton
              variant="prev"
              scrollToActiveSection={scrollToActiveSection}
            />
          </div>
        ) : null}
      </Card>
    )
  }
)

export default FormSection
