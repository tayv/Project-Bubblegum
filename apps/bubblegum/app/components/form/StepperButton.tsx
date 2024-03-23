import { FC } from "react"
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react"
import { UseActiveSectionProps } from "@hooks/useManageActiveSection"

export type StepperButtonProps = {
  variant: "next" | "prev"
  scrollToActiveSection: UseActiveSectionProps["scrollToActiveSection"]
  className?: string
  sectionOrderedIds: UseActiveSectionProps["sectionOrderedIds"]
  activeSectionIndex: UseActiveSectionProps["activeSectionIndex"]
}

export const StepperButton: FC<StepperButtonProps> = ({
  variant,
  scrollToActiveSection,
  sectionOrderedIds,
  activeSectionIndex,
  className,
  ...props
}) => {
  const isNextDisabled = activeSectionIndex >= sectionOrderedIds?.length - 1
  const isPrevDisabled = activeSectionIndex <= 0

  const prevButton = (
    <button
      type="button"
      disabled={isPrevDisabled}
      onClick={() =>
        scrollToActiveSection({
          action: "prev",
        })
      }
      className="group disabled:opacity-30 max-w-xs bottom-0 p-2 border-2 border-cta-500 rounded-full hover:border-cta-600 hover:bg-slate-50"
    >
      <ArrowBigUpDash className="text-cta-500 group-hover:text-cta-600" />
    </button>
  )

  const nextButton = (
    <button
      type="button"
      disabled={isNextDisabled}
      onClick={() =>
        scrollToActiveSection({
          action: "next",
        })
      }
      className="group disabled:opacity-30 max-w-xs bottom-0 p-2 shadow border-2 border-cta-600 bg-cta-500 hover:bg-cta-600 rounded-full "
    >
      <ArrowBigDownDash fill="white" stroke="white" />
    </button>
  )

  return <>{variant === "next" ? nextButton : prevButton}</>
}

export default StepperButton
