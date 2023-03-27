import React, {
  FC,
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react"
import classNames from "classnames"
import { Control } from "react-hook-form"
import Tip, { TipProps } from "@molecules/Tip"
import InputLabel, { InputLabelProps } from "designSystem/atoms/InputLabelRadix"

// OVERVIEW
// This atom form component provides styling and accessibility requirements. Validation, event handlers, etc.
// will use react-hook-form via a wrapper component to add interactivity

// TYPES
export type TextAreaSize = "standard" | "large"
export type TextAreaProps = {
  name: string
  label: InputLabelProps["label"]
  size?: TextAreaSize
  tipText?: TipProps["text"]
  exampleText?: TipProps["text"]
  className?: string
  placeholder?: string
  defaultValue?: string | number
  onChange?: any
  warnChange?: any
  children?: React.ReactElement

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
  control?: Control // react-hook-form: used by Controller. https://react-hook-form.com/ts/#Control
}

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const textAreaSizeMap: { [key in TextAreaSize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}

// forwardRef so RHF can work properly in WrapperInput
export const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(
  (
    {
      name,
      label,
      size = "standard",
      className = "", // to pass custom one-off styling
      tipText = null,
      exampleText = null,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="max-w-sm">
        <InputLabel htmlFor={name} type="standard" label={label} />
        <Tip text={tipText} type="standard" />
        <textarea
          ref={ref}
          id={name}
          name={name}
          // aria-label={label}
          className={classNames([
            "mt-1 block border border-gray-900 bg-white shadow-sm",
            textAreaSizeMap[size], // to dynamically set styling for different sizes
            className,
          ])}
          {...props}
        />
        <Tip text={exampleText} type="example" />
        {children} {/* For displaying warning message components, etc. */}
      </div>
    )
  }
)

// HELPFUL SOURCES

// Type mapping
// https://learntypescript.dev/08/intro

// FORWARDING REFS
// https://felixgerschau.com/react-forwardref-explained/
// https://blog.logrocket.com/cleaning-up-the-dom-with-forwardref-in-react/
// https://betterprogramming.pub/a-guide-to-working-with-forms-and-input-fields-in-react-403d64aaedf3

// USING CLASSNAMES PACKAGE TO COMBINE & MAKE CONDITIONAL CLASSES
// https://nikitahl.com/how-to-assign-multiple-classes-in-react/
