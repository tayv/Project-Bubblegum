import React, {
  FC,
  ReactNode,
  FocusEvent,
  createContext,
  useContext,
  useEffect,
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

type WatchFieldContextProps = {
  // control: Control
  name: string
  defaultValue: any
  validationRules?: any
  validateOnBlur?: boolean
  methods?: any
  conditional?: any
  watch?: any
}

interface FieldComponent extends FC<WatchFieldContextProps> {
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

const WatchFieldContext = createContext<WatchFieldContextProps | undefined>(undefined) // Passing undefined ensures if called outside of a FieldContext.Provider, it will return undefined

const WatchField: FieldComponent = ({
  children,
  // control,
  name,
  defaultValue,
  validationRules,
  validateOnBlur,
  conditional,
  watch
}) => {
  const methods = useFormContext() // Needed so we can access formState and trigger validation in Field.Validate
  const contextValue = {
    //  control,
    name,
    defaultValue,
    validationRules,
    validateOnBlur,
    methods,
  }

  // Watch field and then check to if the field should be rendered
  const otherFieldValue = watch(conditional.name)

  useEffect(() => {
    if (otherFieldValue !== conditional.value) {
      methods.unregister(name); // Need to unregister or else the input's value will still be submitted with the form
    }
  }, [otherFieldValue, conditional.value, methods, name]);


  if (otherFieldValue !== conditional.value) {
    return null
  }

  return (
    <WatchFieldContext.Provider value={contextValue}>
      <div className="mb-2">{children}</div>
    </WatchFieldContext.Provider>
  )
}

WatchField.Control = function FieldControl({ children }: FieldControlProps) {
  const { name, defaultValue, validationRules, validateOnBlur } = useContext(
    WatchFieldContext
  ) as WatchFieldContextProps // Type assertion since we know this won't be undefined
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
            <WatchField.Validate />
            {/* Placing here to avoid manually place Field.Validate in every Field.Control */}
          </>
        )
      }}
    />
  )
}

WatchField.GroupLabel = function FieldGroupLabel({ type, children }) {
  const { name } = useContext(WatchFieldContext) as WatchFieldContextProps
  return (
    <InputGroupLabel type={type} htmlFor={name}>
      {children}
    </InputGroupLabel>
  )
}

WatchField.Tip = function FieldTip({ children, type = "tip" }) {
  return <InputMessage type={type as InputMessageType}>{children}</InputMessage>
}

WatchField.Example = function FieldMessage({ children, type = "example" }) {
  return <InputMessage type={type as InputMessageType}>{children}</InputMessage>
}

// Message can be used for all messages except errors. Warnings are conditional based on regex match
WatchField.Message = function FieldMessage({ children, type, ...props }) {
  const { name, defaultValue, methods } = useContext(
    WatchFieldContext
  ) as WatchFieldContextProps

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

WatchField.Validate = function FieldValid({ type = "error" }) {
  // Automatically validates errors onSubmit based on the zod schema passed to RHF's useForm() in the parent form component
  const { name, methods } = useContext(WatchFieldContext) as WatchFieldContextProps
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

export default WatchField

