import { FC, ReactNode } from "react"
import * as Label from "@radix-ui/react-label"

export type InputLabelProps = {
  type: "standard" | "checkbox"
  label: string | null
  htmlFor: string
  children?: ReactNode
}

const InputLabel: FC<InputLabelProps> = ({
  type,
  label,
  htmlFor,
  ...props
}) => {
  const renderLabel = ({ type, label }: InputLabelProps) => {
    switch (type) {
      case "standard":
        return (
          <div>
            <Label.Root
              htmlFor={htmlFor}
              className="block text-md font-bold text-gray-900"
            >
              {label}

              {props.children}
            </Label.Root>
          </div>
        )

      case "checkbox":
        return (
          <label className="inline-flex items-center text-md text-gray-900">
            {props.children}{" "}
            {/* want to wrap the checkbox in the label so it's all clickable */}
          </label>
        )

      default:
        return null
    }
  }

  return <>{renderLabel({ type, label, htmlFor, ...props })}</>
}

export default InputLabel

// Need to use function expression to render a switch statement in react.
// See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement

// This Label component is used for input components that don't have a built in label
// Example: Checkboxes, Text Inputs, Text Areas.
