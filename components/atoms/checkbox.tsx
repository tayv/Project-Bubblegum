import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'

export type CheckboxStyle = "single" | "multiple"
export type CheckboxProps = {
  id: string
  name: string
  label: string
  value?: boolean
  style?: CheckboxStyle
  className?: string
  onChange?: any
  defaultChecked: boolean
  defaultValue?: boolean // should match defaultChecked

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
} 

const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>( (
  {
    id,
    style = "single",
    name,
    label,
    onChange,
    value,
    defaultChecked,
    ...props
  }, 
  ref 
) => {
  return (
    
    <div>
      <label className="inline-flex items-center">
        <input 
          type="checkbox"
          id={id} 
          name={name} 
          defaultChecked={defaultChecked}
          defaultValue={defaultChecked}
          className="form-checkbox"  
          onChange={ (e) => onChange(value = e.target.checked) }
          value={value}
          {...props} />
        <span className="ml-2">{label}</span>
      </label>
    </div>
    
  )
  }
)

export default Checkbox


{/* <fieldset className="block">
      <legend className="text-gray-700">Checkboxes</legend>
      <div className="mt-2">
        <div>
          <label className="inline-flex items-center">
            <input className="form-checkbox" type="checkbox" checked />
            <span className="ml-2">Option 1</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input id={id} className="form-checkbox" type="checkbox" />
            <span className="ml-2">Option 2</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input className="form-checkbox" type="checkbox" />
            <span className="ml-2">Option 3</span>
          </label>
        </div>
      </div>
    </fieldset> */}