import React, { FC, ChangeEvent, forwardRef, InputHTMLAttributes, DetailedHTMLProps} from 'react'
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
  tipText?: string | null
  exampleText?: string | null
  className?: string
  checked?: true // sets the default checked state
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
const radioStyleMap: {[key in RadioStyle]: string} = {
  standard: "", // css styles go here
  horizontal: "",
  button: "",
}

const testRadioProps = [{name: "testName", label: "testLabel"}, {name: "testName2", label: "testLabel2"}]

const renderRadioGroup = (testRadioProps) => {
 
 return testRadioProps.map((testRadioProp, index) => (
    <span key={testRadioProp.name}>
    <div className="field-radio-button">
      <input 
        type="radio" 
        name={testRadioProp.name} 
        id={testRadioProp.name} 
        value={testRadioProp.name} />
      <label htmlFor={testRadioProp.name}>{testRadioProp.label}</label>
    </div>
    </span>
  ))
}
       

// forwardRef so RHF can work properly in WrapperInput
export const TestRadio: FC<RadioProps> = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      name,
      label,
      value,
      style = "standard",
      className = "", // to pass custom one-off styling
      tipText = null,
      exampleText = null,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <input 
          ref={ref} 
          name={name} 
          type="radio" 
          value={value} 
          aria-label={label}
          onChange={ () => props.onChange(props.value) }
          {...props} />
        <label htmlFor={name}>hi</label>
      </>

      
     
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