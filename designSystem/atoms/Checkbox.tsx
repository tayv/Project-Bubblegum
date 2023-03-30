import React, { FC, forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import InputLabel from '@atoms/InputLabelRadix'

export type CheckboxStyle = "standard" | "toggle"
export type CheckboxProps = {
  id: string
  label: string
  value?: any // HTMLInputElement type doesn't like use of boolean so switched to any
  style?: CheckboxStyle
  className?: string
  onChange?: any
  defaultChecked?: boolean
  defaultValue?: boolean // should match defaultChecked type

  // RHF prop types
  register?: any // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any> // react-hook-form: validation rules. Any object so used generic Record type.
} & Omit<HTMLAttributes<HTMLInputElement>, "defaultValues"> // omit used to prevent type error on input element

const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  function setRefCheckbox(
    {
      id,
      style = "standard",
      label,
      onChange,
      value,
      defaultChecked,
      ...props
    },
    ref
  ) {
    return (
      <div>
        <InputLabel htmlFor={id} type="checkbox" label={label}>
          {/* <label className="inline-flex items-center"> */}
          <input
            type="checkbox"
            id={id}
            name={id}
           // defaultChecked={defaultChecked}
            // defaultValue={defaultChecked} // not necessary for single checkbox
            className="form-checkbox"
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
            {...props}
          />
          <span className="ml-2">{label}</span>
        </InputLabel>
      </div>
    )
  }
)

export default Checkbox
