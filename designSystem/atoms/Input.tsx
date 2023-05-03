import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { Control } from "react-hook-form"

// OVERVIEW
// This atom form component provides styling and accessibility requirements. Validation, event handlers, etc.
// will use react-hook-form via a wrapper Field component to add interactivity

// TYPES
// This input component is intended to be used for all single line inputs (phone, numbers, text input)
export type InputSize = "standard" | "large"
export type InputState = "standard" | "error"
export type InputType = "text" | "email" | "tel" | "number"
export type InputProps = {
  name?: string
  type?: InputType
  size?: InputSize
  className?: string
  placeholder?: string
  defaultValue?: string | number
  onChange?: any
  children?: React.ReactElement
  hasError?: boolean
}

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const inputSizeMap: { [key in InputSize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}

const inputFocusStyleMap: { [key in InputState]: string } = {
  standard: "focus:ring focus:ring-green-400",
  error: "ring-2 ring-inset ring-red-400 focus:ring-red-400 focus:ring",
}

// forwardRef so RHF can work properly in WrapperInput
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function setRefInput(
    {
      name,
      type = "text",
      size = "standard",
      className = "", // to pass custom one-off styling
      children = null,
      hasError = false,
      ...props
    },
    ref
  ) {
    return (
      <div className="max-w-sm">
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          className={classNames([
            "mt-1 block border border-gray-900 rounded-lg bg-white shadow-sm",
            inputSizeMap[size], // to dynamically set styling for different input sizes
            inputFocusStyleMap[hasError ? "error" : "standard"],
            className,
          ])}
          {...props}
        />
        {children} {/* For displaying warning message components, etc. */}
      </div>
    )
  }
)

export default Input

// HELPFUL SOURCES

// Type mapping
// https://learntypescript.dev/08/intro

// Generic Types
// https://stackoverflow.com/questions/40641370/generic-object-type-in-typescript

// REUSABLE TYPESCRIPT COMPONENTS
// https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript
// https://codesandbox.io/s/react-hook-form-controlled-form-k3sz7?file=/src/index.tsx

// FORWARDING REFS
// https://felixgerschau.com/react-forwardref-explained/
// https://blog.logrocket.com/cleaning-up-the-dom-with-forwardref-in-react/
// https://betterprogramming.pub/a-guide-to-working-with-forms-and-input-fields-in-react-403d64aaedf3

// USING CLASSNAMES PACKAGE TO COMBINE & MAKE CONDITIONAL CLASSES
// https://nikitahl.com/how-to-assign-multiple-classes-in-react/
