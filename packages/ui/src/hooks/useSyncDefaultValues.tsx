import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"

// This custom hook is used to sync the defaultValue of one input with the value of another input. Typically used for DatePick when two dates are closely related. For example, a lease end date should not be before the lease start date.
function useSyncDefaultValues(
  methods: any,
  defaultValue: string | number | Date,
  inputNameWatch: string,
  inputNameSync: string
) {
  const { control, setValue } = methods // can't use useFormContext here because this is a hook not a react component

  // If these fields are different then need to update inputNameSync field's defaultValue
  const inputValueWatch = useWatch({
    control,
    name: inputNameWatch,
    defaultValue,
  })
  const inputValueSync = useWatch({
    control,
    name: inputNameSync,
    defaultValue,
  })

  // Track whether the inputNameSync field has been changed
  const [isInputSyncChanged, setIsInputSyncChanged] = useState(false)

  // Update inputNameSync's defaultValue to match inputNameWatch value if inputNameSync hasn't been changed yet
  useEffect(() => {
    if (!isInputSyncChanged) {
      setValue(inputNameSync, inputValueWatch)
    }
  }, [inputValueWatch, isInputSyncChanged])

  // Update isInputSyncChanged to true once inputNameSync has been changed. This is so we don't confuse the user by changing inputSyncValue after a user intentionally set a value
  useEffect(() => {
    if (inputValueSync !== defaultValue) {
      setIsInputSyncChanged(true)
    }
  }, [inputValueSync, defaultValue])

  // Return the inputValueWatch to be used in the form
  return inputValueWatch
}

export { useSyncDefaultValues }
