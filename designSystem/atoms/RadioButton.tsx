import React, {
  FC,
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  DetailedHTMLProps,
  ReactEventHandler,
} from "react"
import classNames from "classnames"

// OVERVIEW
// This atom form component provides styling and accessibility requirements. Validation, event handlers, etc.
// will use react-hook-form via a wrapper component to add interactivity

// TYPES
// This input component is intended to be used for all radio button inputs (yes/no, lists, with standard radio and button styles
export type RadioStyle = "standard" | "horizontal" | "button"
export type RadioProps = {
  name: string
  label: string
  value: string
  style?: RadioStyle
  className?: string
  onChange: any
  defaultChecked?: boolean

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
}

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const radioStyleMap: { [key in RadioStyle]: string } = {
  standard: "", // css styles go here
  horizontal: "inline-block",
  button: "hidden",
}

const labelStyleMap: { [key in RadioStyle]: string } = {
  standard: "pl-2 ", // css styles go here
  horizontal: "inline-block px-2",
  button:
    "w-full pl-2 border-1 border border-black solid peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:font-semibold group-hover:font-semibold",
}

// forwardRef so RHF can work properly in WrapperInput
export const RadioButton: FC<RadioProps> = forwardRef<
  HTMLInputElement,
  RadioProps
>(
  function setRefRadioButton(
    {
      name,
      label,
      value,
      style = "standard",
      className = "", // to pass custom one-off styling
      onChange,
      ...props
    },
    ref
  ) {
    return (
      <div className="group flex max-w-sm mt-1 items-center">
        {" "}
        {/* flex is important to make full label width is clickable */}
        <input
          ref={ref}
          name={name}
          type="radio"
          aria-label={label}
          value={value}
          id={value} // this is used so the label is clickable/associated with the input
          className={classNames([
            "peer cursor-pointer", // standard css styles go here. Peer is always required for label styling to work
            radioStyleMap[style], // to dynamically set styling for different radio types
            className, // prop
          ])}
          onChange={() => onChange(value)}
          {...props}
        />
        <label
          className={classNames([
            "cursor-pointer peer-checked:cursor-default", // standard css styles go here
            labelStyleMap[style], // to dynamically set styling for different radio types
            className,
          ])}
          htmlFor={value}
        >
          {label}
        </label>
      </div>
    )
  }
)

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
// https://nikitahl.com/how-to-assign-multiple-classes-in-

// CSS
// Because this is a child atomic component, need to use CSS to style the input's sibling elements (e.g. for the full width Button style)
// See https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
