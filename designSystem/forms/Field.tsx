import React, { useState, createContext, useContext } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"
import InputLabel from "@designSystem/atoms/InputLabelRadix"

const FieldContext = createContext()

function Field({ children, name, defaultValue, validationRules }) {
  const [isShown, setIsShown] = useState(true)
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field }) => (
        <FieldContext.Provider value={{ isShown, setIsShown }}>
          <Field.Label name={name} />
          {isShown && <Slot {...field}>{children}</Slot>}
        </FieldContext.Provider>
      )}
    />
  )
}

Field.Label = function FieldLabel({ name }) {
  return (
    <InputLabel htmlFor={name} type="standard">
      {name}
    </InputLabel>
  )
}

export default Field
