import React, { FC, ChangeEvent, forwardRef, InputHTMLAttributes, DetailedHTMLProps, ReactEventHandler} from 'react'
import classNames from 'classnames'
import { Control } from 'react-hook-form'

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
const radioStyleMap: {[key in RadioStyle]: string} = {
  standard: "", // css styles go here
  horizontal: "",
  button: "",
}      

// forwardRef so RHF can work properly in WrapperInput
export const RadioButton: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  (
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
  ) => {
    return (
      <div className="max-w-sm">
       
        <input
          ref={ref}
          name={name}
          type="radio"
          aria-label={label}
          value={value}
          id={value} // this is used so the label is clickable/associated with the input
          className={
            classNames([
              " ", // standard css styles go here
              radioStyleMap[style], // to dynamically set styling for different radio types
              className,
            ])
          }
          onChange={ () => onChange(value) }
          {...props}
        />
        <label htmlFor={value}>{label}</label>
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