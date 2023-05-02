import React, {
  FC,
  ReactNode,
  FocusEvent,
  createContext,
  useContext,
} from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import classNames from "classnames"
import { Slot } from "@radix-ui/react-slot"
import InputGroupLabel, {
  InputGroupLabelProps,
} from "@designSystem/atoms/InputGroupLabel"
import * as Label from "@radix-ui/react-label"
import InputMessage, {
  InputMessageProps,
  InputMessageType,
} from "@designSystem/molecules/InputMessage"

type FieldContextProps = {
  control: Control
  name: string
  defaultValue: any
  validationRules?: any
  validateOnBlur?: boolean
  methods: any
}

interface FieldComponent extends FC<FieldContextProps> {
  Control: FC<FieldControlProps>
  GroupLabel: FC<InputGroupLabelProps>
  Tip: FC<InputMessageProps>
  Example: FC<InputMessageProps>
  Message: FC<InputMessageProps>
  Validate: FC<FieldValidateProps>
}

type FieldControlProps = { children: ReactNode, hasError?: boolean }
type FieldValidateProps = Omit<InputMessageProps, "children">

const FieldContext = createContext<FieldContextProps | undefined>(undefined) // Passing undefined ensures if called outside of a FieldContext.Provider, it will return undefined

const Field: FieldComponent = ({
  children,
  control,
  name,
  defaultValue,
  validationRules,
  validateOnBlur,
}) => {
  const methods = useFormContext() // Needed so we can access formState and trigger validation in Field.Validate
  const contextValue = {
    control,
    name,
    defaultValue,
    validationRules,
    validateOnBlur,
    methods,
  }

  return (
    <FieldContext.Provider value={contextValue}>
      <div className="mb-2">{children}</div>
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

  const hasError = !!methods.formState.errors[name] // Pass as a prop to children so they know to use error styling
  const FieldErrorContext = createContext<boolean | undefined>(undefined) // Setup a context so I can pass hasError to child component (aka Input)


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
          <FieldErrorContext.Provider value={hasError}>
            <Slot {...field} onBlur={handleOnBlur}>
              {children}
            </Slot>
            <Field.Validate /> {/* Placing here to avoid manually place Field.Validate in every Field.Control */}
          </FieldErrorContext.Provider>
        )
      }}
    />
  )
}

Field.GroupLabel = function FieldGroupLabel({ type, children }) {
  const { name } = useContext(FieldContext) as FieldContextProps
  return (
    <InputGroupLabel type={type} htmlFor={name}>
      {children}
    </InputGroupLabel>
  )
}

Field.Tip = function FieldTip({ children, type = "tip" }) {
  return <InputMessage type={type as InputMessageType}>{children}</InputMessage>
}

Field.Example = function FieldMessage({ children, type = "example" }) {
  return <InputMessage type={type as InputMessageType}>{children}</InputMessage>
}

Field.Message = function FieldMessage({ children, type }) {
  return <InputMessage type={type as InputMessageType}>{children}</InputMessage>
}

Field.Validate = function FieldValid({ type = "error" }) {
  // Automatically validates errors onSubmit based on the zod schema passed to RHF's useForm() in the parent form component
  const { name, methods } = useContext(FieldContext) as FieldContextProps
  const errorMessage = methods.formState.errors[name]

  return (
    <>
      {errorMessage && ( // Gate needed here to prevent displaying icon on initial render
        <InputMessage type={type as InputMessageType}>
          {methods.formState.errors[name].message}{" "}
          {/* RHF automatically adds a message property to the error object based on zod Schema */}
        </InputMessage>
      )}
    </>
  )
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
