import React, {
  FC,
  ReactNode,
  FocusEvent,
  createContext,
  useContext,
  useEffect,
} from "react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
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
  defaultValue?: any
  validationRules?: any
  validateOnBlur?: boolean
  methods?: any
  conditional: any
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

const WatchFieldContext = createContext<WatchFieldContextProps | undefined>(
  undefined
) // Passing undefined ensures if called outside of a FieldContext.Provider, it will return undefined

const WatchField: FieldComponent = ({
  children,
  // control,
  name,
  // defaultValue,
  // validationRules,
  // validateOnBlur,
  conditional,
  //watch
}) => {
  const methods = useFormContext() // Needed so we can access formState and trigger validation in Field.Validate
  const contextValue = { // These are the props that will want to pass to the child components
   //   control,
    name,
  //  defaultValue,
    // validationRules,
    // validateOnBlur,
    methods,
  }

  // The field to watch 
  //const otherFieldValue = methods.watch(conditional.name)
  const otherFieldValue = useWatch({ name: conditional.name, control: methods.control })


  // Unregister field if conditional value is not met so the input's value is not submitted with the form
  useEffect(() => {
    if (otherFieldValue !== conditional.value) {
      methods.unregister(name)
    }
  }, [otherFieldValue, conditional.value, methods, name])

  // Hide the field if conditional value is not met
  if (otherFieldValue !== conditional.value) {
    return null //
  } else {
    return (
      <WatchFieldContext.Provider value={contextValue}>
        <div className="mb-2">{children}</div>
      </WatchFieldContext.Provider>
    )
  }
}



export default WatchField
