import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'

export type CheckboxStyle = "single" | "multiple"
export type CheckboxProps = {
  id: string
  name: string
  label: string
  value?: string
  style?: CheckboxStyle
  className?: string
  onChange: any
  defaultChecked?: boolean

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
} 

const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>( ({
  id,
  style = "single",
  name,
  label,
  value
}) => {
  return (

    <div>
      <label className="inline-flex items-center">
        <input id={id} className="form-checkbox" type="checkbox" checked />
        <span className="ml-2">Option 1</span>
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