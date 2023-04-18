import React, { useState, createContext, useContext } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"
import InputLabel from "@designSystem/atoms/InputLabelRadix"
import Tip from "@designSystem/molecules/Tip"
import * as Label from "@radix-ui/react-label"


const FieldContext = createContext()

const Field = ({ children, control, name, defaultValue, validationRules }) => {
  const contextValue = { control, name, defaultValue, validationRules }

  return (
    <FieldContext.Provider value={contextValue}>
      {children}
    </FieldContext.Provider>
  )
}

Field.Control = function FieldControl({ children }) {
  const { control, name, defaultValue, validationRules } = useContext(FieldContext)

  return (

    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field }) => ( // Field contains { name, value, onChange, onBlur }. See https://www.react-hook-form.com/api/usecontroller/controller/
        <Slot {...field}>{children}</Slot>
       ) }
    />
  )
}

Field.GroupLabel = function FieldGroupLabel({ name, children, type }) {
  return (
    // <InputLabel htmlFor={name} type={type}>
    //   {children}
    // </InputLabel>
    <Label.Root
      htmlFor={name}
      className="inline text-md font-bold text-gray-900"
    >
    {children} 
    </Label.Root>

  )
}

Field.Tip = function FieldTip({ children, type="standard" }) {
  return (
    <Tip text={children} type={type} />
  )
}

Field.Message = function FieldMessage({ children, type="example" }) {
  return (
    <Tip text={children} type={type} />
  )
}

Field.Valid = function FieldValid({ children, type = "valid" }) {
  return (
    <span>
     
      <Tip text={children} type={type} />
    </span>
  );
};


export default Field

// Documentation
// https://react-hook-form.com/api#Controller
// https://react-hook-form.com/api#useForm
// https://react-hook-form.com/api#FormProvider
// Validation examples:

// validationRules={{
//   validate: (value) => {
//     if (value.startsWith("A")) {
//       return "Value cannot start with the letter A";
//     }
//     return true;
//   },
// }}


// Zod
// Potential RHF bug with Zod Optional validation. Make sure to pass defaultValues to useForm. See: https://stackoverflow.com/questions/73715295/react-hook-form-with-zod-resolver-optional-field
// Need to also install a resolver to use with RHF. See: https://www.react-hook-form.com/api/useform/