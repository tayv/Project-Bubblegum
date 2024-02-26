"use client"

import React, { FC, useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import Field from "@form/formControl/Field"

type WatchFieldProps = {
  name: string
  defaultValue?: any // Handled by defaultValues object passed to Form so not passed at field level
  validationRules?: any
  validateOnBlur?: boolean
  conditionLogic: { watchName: string; watchValue: string | boolean | number }
  children: React.ReactNode
}

const WatchField: FC<WatchFieldProps> = ({
  children,
  name,
  defaultValue,
  validationRules,
  validateOnBlur,
  conditionLogic,
}) => {
  const methods = useFormContext()
  // Start watching the other field
  const otherFieldValue = useWatch({
    name: conditionLogic.watchName,
    control: methods.control,
  })

  // ------------------  Unregister Conditional Field Logic ------------------ //
  const errorMessage = methods.formState.errors[name]?.message
  // NOTE: If you don't want a hidden fields value to submit with form then use methods.unregister() to unregister field
  useEffect(() => {
    if (otherFieldValue !== conditionLogic.watchValue && errorMessage) {
      //  methods.unregister(name)
      methods.clearErrors(name)
    } else {
      // Re-register when it's visible again
      // methods.register(name, defaultValue) // This doesn't work. Probably need useRef
    }
  }, [
    otherFieldValue,
    conditionLogic.watchValue,
    conditionLogic.watchName,
    errorMessage,
    methods,
    name,
  ])

  // ------------------------------------------------------------------------ //

  // Hide the field if conditional value isn't met
  if (otherFieldValue !== conditionLogic.watchValue) {
    return null //
  } else {
    return (
      // Must pass name or it won't register
      // Need to pass validateOnBlur in case a hidden field is required when it's shown
      // Remaining props are optional
      <Field
        name={name}
        validateOnBlur={validateOnBlur}
        validationRules={validationRules}
        defaultValue={defaultValue}
      >
        {children}
      </Field>
    )
  }
}

export default WatchField
