import { useRef } from "react"

const useActiveSection = (attributeValue) => {
  const targetRef = useRef(null)

  const scrollToTarget = () => {
    const element = document.querySelector(`[dataactive="${attributeValue}"]`) // NOTE: data attributes use all lowercase and avoid hyphens as required by React
    console.log("ELEMENT HERE", element)

    if (element) {
      targetRef.current = element // Attach the found element to the ref.
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return scrollToTarget
}

export default useActiveSection
