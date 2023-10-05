import { FC, forwardRef } from "react"
import Card, { SectionCardProps } from "@ui/Card"

// This component is a wrapper to enforce functionality needed for the section cards

const FormSectionCard = forwardRef<HTMLDivElement, SectionCardProps>(
  function setSectionCardRef({ id, dataActive, children }, ref) {
    return (
      <Card ref={ref} id={id} dataActive={dataActive}>
        {children}
      </Card>
    )
  }
)

export default FormSectionCard
