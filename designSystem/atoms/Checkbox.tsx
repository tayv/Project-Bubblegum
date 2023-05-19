import React, { FC, forwardRef, HTMLAttributes } from "react"
import classNames from "classnames"

export type CheckboxType = "standard" | "toggle"
export type CheckboxProps = {
  id?: string
  name?: string
  label?: string
  value?: any // HTMLInputElement type doesn't like use of boolean so switched to any
  type?: CheckboxType
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
      name,
      type = "standard",
      label,
      onChange,
      value,
      children,
      defaultChecked,
      ...props
    },
    ref
  ) {
    return (
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            id={name}
            name={name}
            className="form-checkbox"
            onChange={onChange}
            checked={value}
            {...props}
          />
          <span className="ml-2">{children}</span>
        </label>
      </div>
    )
  }
)

export default Checkbox
