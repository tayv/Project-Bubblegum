import Checkbox from "@designSystem/atoms/Checkbox"
import React, { FC, ReactElement } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"

type FieldProps = {
  name: string
  defaultValue: any
  validationRules?: any
  // control: Control // this is not needed since we are using useFormContext
  children: ReactElement
  control?: Control
}

const Field: FC<FieldProps> = ({
  name,
  defaultValue,
  validationRules,
  // control,
  children,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field: { ...props } }) =>
        React.cloneElement(children, {
          ...props,
          ...children.props,
        })
      }
    />
  )
}

export default Field
