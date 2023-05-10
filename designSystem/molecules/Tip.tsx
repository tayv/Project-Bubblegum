import { Check } from "lucide-react"
import { FC, ReactNode } from "react"

export type TipProps = {
  type?: "example" | "standard" | "valid"
  text: string | null
}

const Tip: FC<TipProps> = ({ type = "standard", text, ...props }) => {
  const renderTip = ({ type, text }: TipProps) => {
    switch (type) {
      case "example":
        return (
          <p className="text-xs font-light italic text-gray-500 mt-1">{text}</p>
        )

      case "standard":
        return <p className="text-sm font-light text-gray-500 mb-2">{text} </p>

      case "valid":
        return (
          <span className="flex items-center gap-1 mb-2">
            <Check className="text-green-600" />
            <p className="block text-sm font-light text-green-600">{text} </p>
          </span>
        )

      default:
        return null
    }
  }

  return <>{renderTip({ type, text, ...props })}</>
}

export default Tip

// Need to use function expression to render a switch statement in react.
// See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement
