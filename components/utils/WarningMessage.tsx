import React, { FC, useEffect, useState } from 'react'
import { useForm, useWatch, Control } from 'react-hook-form'

export type MessageProps = {
  messageType: "warn" |"info" | null
  testFor: string | number 
  message: string | number
  regFormula: RegExp
  control: Control | undefined // Required by rhf Controller: https://react-hook-form.com/ts/#Control. Will be undefined if input field empty
}

export const WarningMessage: FC<MessageProps> = (
  {
    messageType,
    testFor,
    message,
    regFormula,
    control,
    ...props
  }
) => {

  const testWatch = useWatch({
    control,
    name: "controlledInput",
    defaultValue: " ", // MUST HAVE A DEFAULT VALUE or testWatch.match(regEx) will fail
  })

  const testForX = (testFor, regFormula) => {
    if (testFor == "a") {
        return /(a)/g
    } else if (testFor == "custom") {
        return regFormula  
    } else {
      return /(b)/g
    } 
  }

  // This variable holds the string that the .match() will use as gatekeeper for renderMessageStyl() 
  let regEx = testForX(testFor, regFormula)

  // Render style logic
  const renderMessageStyle = (messageType, message) => {
   console.log("Message Type: ", messageType, "message:")
    switch (messageType) {
      case "warn":
        return <span className="text-sm font-bold text-amber-600 pt-4 pb-2">⚠️ This is a warning message for what you wrote in the input field: {message}</span> 
        
      case "info":
        return <span className="text-sm text-slate-500 pt-4 pb-2">🤓 This is a neutral informational message based on what you wrote in the input field: {message}</span> 
        
      default:
        return null
  }
}

  return (
    <>
      {testWatch.match(regEx) && renderMessageStyle(messageType, message)} {/* MUST use .match() instead of regEx.test() */ }
    </>
 
  )
}    

export default WarningMessage

// NOTES
  // IMPORTANT: Use String.prototype.match instead of RegExp.prototype.test for logical gatekeeper or it will break when passing regFormula as a prop
  // See: 
    // https://stackoverflow.com/questions/73028753/why-do-these-seemingly-similar-props-result-in-different-behavior 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match 
