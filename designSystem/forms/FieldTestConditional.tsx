import Checkbox from '@designSystem/atoms/Checkbox'
import React, { FC, ReactElement } from 'react'
import { Controller, Control, UseFormWatch } from 'react-hook-form'

type FieldProps = {
  name: string
  defaultValue: any
  validationRules?: any
  control: Control
  children: ReactElement
  watch: any
  conditional: any
}

const WatchField: FC<FieldProps> = ({
  name,
  defaultValue,
  validationRules,
  control,
  children,
  watch,
  conditional,
  ...props
}) => {

  // Watch field and then check to if the field should be rendered
  const otherFieldValue = watch(conditional.name)

  if (otherFieldValue !== conditional.value) {
    return null
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field: {...props } }) => (
        React.cloneElement(children, {
          ...props,
          ...children.props
        })
      ) } 
   />
  )
}

export default WatchField
