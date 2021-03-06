import React, { FC, ChangeEvent, forwardRef, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import classNames from 'classnames'
import { Control } from 'react-hook-form'

// OVERVIEW
  // This atom form component provides styling and accessibility requirements. Validation, event handlers, etc. 
  // will use react-hook-form via a wrapper component to add interactivity

// TYPES
  // This input component is intended to be used for all single line inputs (phone, numbers, text input)
export type InputSize = "standard" | "large"
export type InputType = "text" | "email" | "tel" | "number"
export type InputProps = {
  name: string
  label: string
  type?: InputType
  size?: InputSize
  tipText?: string | null
  exampleText?: string | null
  className?: string
  placeholder?: string
  defaultValue?: string | number 
  onChange?: any
  warnChange?: any 

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
  control?: Control // react-hook-form: used by Controller. https://react-hook-form.com/ts/#Control
} 

// DYNAMIC STYLING
  // Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const inputSizeMap: {[key in InputSize]: string} = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}

// forwardRef so RHF can work properly in WrapperInput
export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = "text",
      size = "standard",
      className = "", // to pass custom one-off styling
      tipText = null,
      exampleText = null,
      child,
      ...props
    },
    ref
  ) => {
    return (
      <div className="max-w-sm">
        <label htmlFor="text" className="block text-md font-bold text-gray-900">
          {label}
        </label>
        <span className="text-sm font-light text-gray-500 mb-2">{tipText}</span>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          aria-label={label}
          className={
            classNames([
              "mt-1 block border border-gray-900 bg-white shadow-sm", 
              inputSizeMap[size], // to dynamically set styling for different input sizes
              className,
            ])
          }
          {...props}
        />
        <span className="text-xs font-light italic text-gray-500 mt-1">{exampleText}</span>
        {child}
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
  // https://nikitahl.com/how-to-assign-multiple-classes-in-react/ 