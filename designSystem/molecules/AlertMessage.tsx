import React, { FC } from "react"
import { useWatch, Control } from "react-hook-form"
import setRegEx from "@utils/useMatchRegex"

export type customRegEx = RegExp | null | undefined
export type checkFor = string | number
export type messageType = "warn" | "info" | null

export type HelpMessageProps = {
  inputName: string
  messageType: messageType
  checkFor: checkFor
  message: string | number
  customRegEx?: customRegEx
  control: Control | undefined // Required by rhf Controller: https://react-hook-form.com/ts/#Control. Will be undefined if input field empty
}

export const HelpMessage: FC<HelpMessageProps> = ({
  inputName,
  messageType,
  checkFor,
  message,
  customRegEx,
  control,
  ...props
}) => {
  // Set up react hook form's Watch so we can get user's onChange input value. See: https://www.react-hook-form.com/api/usewatch
  const inputWatch = useWatch({
    control,
    name: inputName,
    defaultValue: " ", // MUST HAVE A DEFAULT VALUE or inputWatch.match(checkForMatch) will fail
  })

  // Hold the regex formula that will be used to match input results from useWatch()
  let regExFormula = setRegEx(checkFor, customRegEx)

  // Boolean regex result. Used as gatekeeper for displaying the warning message in UI in renderMessage()
  let checkForMatch = (checkFor: checkFor, customRegEx: customRegEx): boolean =>
    inputWatch.match(regExFormula)

  // Message style logic
  const renderMessage = <HelpMessageProps,>(
    messageType: messageType,
    message: HelpMessageProps
  ) => {
    switch (messageType) {
      case "warn":
        return (
          <span className="text-sm font-bold text-amber-600 pt-4 pb-2">
            ⚠️ {message}
          </span>
        )

      case "info":
        return (
          <span className="text-sm text-slate-500 pt-4 pb-2">🤓 {message}</span>
        )

      default:
        return null
    }
  }

  return (
    <>
      {checkForMatch(checkFor, regExFormula) &&
        renderMessage(messageType, message)}{" "}
      {/* MUST use .match() instead of checkForMatch.test() */}
    </>
  )
}

export default HelpMessage

// NOTES
// IMPORTANT: Use String.prototype.match instead of RegExp.prototype.test for logical gatekeeper or it will break when passing regFormula as a prop
// See:
// https://stackoverflow.com/questions/73028753/why-do-these-seemingly-similar-props-result-in-different-behavior
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match

// Usage notes:
// If you need to show multiple help messages for a single input then stack the component/message in the form. This will be optmized post-mvp.

// Other resources:
// Input changes are done using useWatch from rhf. See: https://www.react-hook-form.com/api/usewatch
