import React, {
  FC,
  ReactNode,
  FocusEvent,
  createContext,
  useContext,
} from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Slot } from "@radix-ui/react-slot"
import InputGroupLabel, {
  InputGroupLabelProps,
} from "@designSystem/atoms/InputGroupLabel"
import InputMessage, {
  InputMessageProps,
  InputMessageType,
} from "@designSystem/molecules/InputMessage"
import useMatchRegex from "@utils/useMatchRegex"

type FieldContextProps = {
  // control: Control
  name: string
  defaultValue: any
  validationRules?: any
  validateOnBlur?: boolean
  methods?: any
  children: React.ReactNode
}

interface FieldComponent extends FC<FieldContextProps> {
  Control: FC<FieldControlProps>
  GroupLabel: FC<FieldGroupLabelProps>
  Tip: FC<InputMessageProps>
  Example: FC<InputMessageProps>
  Message: FC<FieldMessageProps>
  Validate: FC<FieldValidateProps>
}

type FieldControlProps = { children: ReactNode; hasError?: boolean }
type FieldGroupLabelProps = Omit<InputGroupLabelProps, "htmlFor">
type FieldMessageProps = InputMessageProps & { formulaShortCode: string }
type FieldValidateProps = Omit<InputMessageProps, "children">

const FieldContext = createContext<FieldContextProps | undefined>(undefined) // Passing undefined ensures if called outside of a FieldContext.Provider, it will return undefined

const Field: FieldComponent = ({
  children,
  name,
  defaultValue,
  validationRules,
  validateOnBlur,
}) => {
  const methods = useFormContext() // Needed so we can access formState and trigger validation in Field.Validate
  const contextValue = {
    name,
    defaultValue,
    validationRules,
    validateOnBlur,
    methods,
    children,
  }

  return (
    <FieldContext.Provider value={contextValue}>
      <div className="mb-2">{children}</div>
    </FieldContext.Provider>
  )
}

Field.Control = function FieldControl({ children }: FieldControlProps) {
  const { name, defaultValue, validationRules, validateOnBlur } = useContext(
    FieldContext
  ) as FieldContextProps // Type assertion since we know this won't be undefined
  const methods = useFormContext() // Needed so we can access formState and trigger validation

  const usecustomOnBlur = (
    event: FocusEvent,
    defaultOnBlur: (event: FocusEvent) => void
  ) => {
    // Custom onBlur for displaying errors and warning messages when user leaves input
    methods.trigger(name) // Trigger validation using RHF trigger method
    defaultOnBlur(event) // To ensure RHF standard behavior is maintained
  }

  const hasError = !!methods.formState.errors[name] // Pass as a prop to children so they know to use error styling

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={methods.control}
      rules={validationRules}
      render={({ field: { onBlur: defaultOnBlur, ...field } }) => {
        // Field contains { name, value, onChange, onBlur }. See https://www.react-hook-form.com/api/usecontroller/controller/
        const handleOnBlur = validateOnBlur
          ? (event: FocusEvent) => usecustomOnBlur(event, defaultOnBlur)
          : defaultOnBlur // This check is used to prevent running customOnBlur each time user leaves input. Only run if validateOnBlur prop is true

        return (
          <>
            {/* Unable to pass custom type to Slot so type assertion used on field to supress hasError TS error */}
            <Slot {...(field as any)} onBlur={handleOnBlur} hasError={hasError}>
              {children}
            </Slot>
            <Field.Validate />
            {/* Placing here to avoid manually place Field.Validate in every Field.Control */}
          </>
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

// Message can be used for all messages except errors. Warnings are conditional based on regex match
Field.Message = function FieldMessage({ children, type, ...props }) {
  const { name, defaultValue, methods } = useContext(
    FieldContext
  ) as FieldContextProps

  // Logic for conditional onChange warning messages
  const isMatch = useMatchRegex({
    name: name,
    control: methods.control,
    defaultValue: defaultValue,
    formulaShortCode: props.formulaShortCode,
  })

  return type !== "warn" ? (
    <InputMessage type={type as InputMessageType}>{children}</InputMessage>
  ) : (
    <InputMessage type={type as InputMessageType}>{isMatch}</InputMessage>
  )
}

Field.Validate = function FieldValid({ type = "error" }) {
  // Automatically validates errors onSubmit based on the zod schema passed to RHF's useForm() in the parent form component
  const { name, methods } = useContext(FieldContext) as FieldContextProps
  const errorMessage = methods.formState.errors[name]

  return (
    <>
      {errorMessage && ( // Gate needed here to prevent displaying icon on initial render
        <InputMessage type={type as InputMessageType}>
          {methods.formState.errors[name].message}
          {/* RHF automatically adds a message property to the error object based on zod Schema */}
        </InputMessage>
      )}
    </>
  )
}

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
