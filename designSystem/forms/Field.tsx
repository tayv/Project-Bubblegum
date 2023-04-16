import React, { useState, createContext, useContext } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"
import InputLabel from "@designSystem/atoms/InputLabelRadix"
import Tip from "@designSystem/molecules/Tip"

const FieldContext = createContext()

const Field = ({ children, control, name, defaultValue, validationRules }) => {
  const contextValue = { control, name, defaultValue, validationRules }

  return (
    <FieldContext.Provider value={contextValue}>
      <Field.Label />    
      <Field.Tip />
      <>{children}</>
    </FieldContext.Provider>
  )
}

Field.Control = function FieldControl({ children }) {
  const { control, name, defaultValue, validationRules } =
    useContext(FieldContext)

  return (

    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field }) => (
        
        <Slot {...field}>{children}</Slot>

   ) }
    />
  )
}

Field.Label = function FieldLabel({ name, children }) {
  return (
    <InputLabel htmlFor={name} type="standard">
      {children}
    </InputLabel>
  )
}

Field.Tip = function FieldTip({ children, type="standard" }) {
  return (
  //  <Tip>{children}</Tip>
    <Tip text={children} type={type} />
  )
}

export default Field
