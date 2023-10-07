import { useRef } from "react"

type UseActiveSectionProps = {
  attributeValue?: string
  action?: "next" | "prev"
}

const useActiveSection = () => {
  const targetRef = useRef<HTMLElement | null>(null)

  const scrollToActiveSection = ({
    attributeValue,
    action = "next",
  }: UseActiveSectionProps) => {
    // Determine scroll direction
    action === "next"
      ? console.log("action next", action)
      : console.log("action prev", action)
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
