import React, {
  FC,
  ReactNode,
  FocusEvent,
  useState,
  createContext,
  useContext,
} from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"
import InputLabel from "@designSystem/atoms/InputLabelRadix"
import Tip from "@designSystem/molecules/Tip"
import * as Label from "@radix-ui/react-label"

type FieldContextProps = {
  control: Control
  name: string
  defaultValue: any
  validationRules?: any
  validateOnBlur?: boolean
}

interface FieldComponent extends FC<FieldContextProps> {
  Control: FC<FieldControlProps>
  GroupLabel: FC<FieldGroupLabelProps>
  Tip: FC<FieldTipProps>
  Message: FC<FieldMessageProps>
  Valid: FC<FieldValidProps>
}

type FieldControlProps = { children: ReactNode }
type FieldGroupLabelProps = { name: string; children: ReactNode }
type FieldTipProps = { children: ReactNode; type?: string }
type FieldMessageProps = { children: ReactNode; type?: string }
type FieldValidProps = { children: ReactNode; type?: string }

const FieldContext = createContext<FieldContextProps | undefined>(undefined) // Passing undefined ensures if called outside of a FieldContext.Provider, it will return undefined

const Field: FieldComponent = ({
  children,
  control,
  name,
  defaultValue,
  validationRules,
  validateOnBlur,
}) => {
  const contextValue = {
    control,
    name,
    defaultValue,
    validationRules,
    validateOnBlur,
  }

  return (
    <FieldContext.Provider value={contextValue}>
      {children}
    </FieldContext.Provider>
  )
}

Field.Control = function FieldControl({ children }: FieldControlProps) {
  const { control, name, defaultValue, validationRules, validateOnBlur } =
    useContext(FieldContext) as FieldContextProps // Type assertion since we know this won't be undefined
  const methods = useFormContext() // Needed so we can access formState and trigger validation

  const customOnBlur = (
    event: FocusEvent,
    defaultOnBlur: (event: FocusEvent) => void
  ) => {
    // Custom onBlur for displaying errors and warning messages when user leaves input
    methods.trigger(name) // Trigger validation using RHF trigger method
    defaultOnBlur(event) // To ensure RHF standard behavior is maintained
  }

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={validationRules}
      render={({ field: { onBlur: defaultOnBlur, ...field } }) => {
        // Field contains { name, value, onChange, onBlur }. See https://www.react-hook-form.com/api/usecontroller/controller/
        const handleOnBlur = validateOnBlur
          ? (event: FocusEvent) => customOnBlur(event, defaultOnBlur)
          : defaultOnBlur // This check is used to prevent running customOnBlur each time user leaves input. Only run if validateOnBlur prop is true
        return (
          <Slot {...field} onBlur={handleOnBlur}>
            {children}
          </Slot>
        )
      }}
    />
  )
}

Field.GroupLabel = function FieldGroupLabel({ name, children, type }) {
  return (
    <Label.Root
      htmlFor={name}
      className="inline text-md font-bold text-gray-900"
    >
      {children}
    </Label.Root>
  )
}

// Type prop is hardcoded for now. Will be removed or made dynamic in future
Field.Tip = function FieldTip({ children, type = "standard" }) {
  return <Tip text={children} type={type} />
}

Field.Message = function FieldMessage({ children, type = "example" }) {
  return <Tip text={children} type={type} />
}

Field.Valid = function FieldValid({ children, type = "valid" }) {
  return <Tip text={children} type={"valid"} />
}

// WIP... attempting to switch styles depending if error present or not
// Field.Valid = function FieldValid({ children }) {
//   const methods = useFormContext()
//   const { name }= useContext(FieldContext)

//   methods.formState.errors[name] ? (
//       <span>
//         <Tip text={children} type={"standard"} />
//       </span>
//   ) : (
//     <span>
//     <Tip text={children} type={"valid"} />
//   </span>
//   )
// }

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
