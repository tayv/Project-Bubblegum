import React, { FC, forwardRef, HTMLAttributes } from "react"
import classNames from "classnames"
import InputLabel from "@atoms/InputLabelRadix"
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from "lucide-react"

export type CheckboxStyle = "standard" | "toggle"
export type CheckboxProps = {
  id: string
  name: string
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

const CheckboxRadix: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  function setRefCheckbox(
    {
      id,
      name,
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
      <Checkbox.Root ref={ref} onCheckedChange={onChange} id={id} name={name} className="form-checkbox">
        <Checkbox.Indicator className="block text-md font-bold text-gray-900">
        <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
    )
  }
)

export default CheckboxRadix
