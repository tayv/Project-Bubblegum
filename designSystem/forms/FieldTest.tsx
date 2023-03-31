import Checkbox from '@designSystem/atoms/Checkbox'
import React, { FC, ReactElement } from 'react'
import { Controller, Control } from 'react-hook-form'

type FieldProps = {
  name: string
  defaultValue: any
  validationRules?: any
  control: Control
  children: ReactElement
}

const Field: FC<FieldProps> = ({
  name,
  defaultValue,
  validationRules,
  control,
  children,
  ...props
}) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={ ({ field: {...props } }) => (
        React.cloneElement(children, {
          ...props,
          ...children.props
        })    
      ) }
      
   />

  )
}

export default Field
