import React, { FC, forwardRef, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import classNames from 'classnames'

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
  className?: string
} 

// DYNAMIC STYLING
  // Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const inputSizeMap: {[key in InputSize]: string} = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = "text",
      size = "standard",
      className = "", // to pass custom one-off styling
      ...props
    },
    ref
  ) => {
    return (
      <div className="max-w-sm">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          aria-label={label}
          className={
            classNames([
              "mt-1 block border border-gray-300 bg-white rounded-md shadow-sm", 
              inputSizeMap[size], // to dynamically set styling for different input sizes
              className,
            ])
          }
        />
      </div>
    )
  }
)

// HELPFUL SOURCES
  
// REUSABLE TYPESCRIPT COMPONENTS
  // https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript
  // https://codesandbox.io/s/react-hook-form-controlled-form-k3sz7?file=/src/index.tsx

// FORWARDING REFS
  // https://felixgerschau.com/react-forwardref-explained/ 
  // https://reactjs.org/docs/forwarding-refs.html 

// USING CLASSNAMES PACKAGE TO COMBINE & MAKE CONDITIONAL CLASSES
  // https://nikitahl.com/how-to-assign-multiple-classes-in-react/ 