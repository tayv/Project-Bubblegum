import React, { FC, useEffect, useState } from 'react'
import { useForm, useWatch, Control } from 'react-hook-form'

export type MessageProps = {
  messageWarn?: string | number | object
  messageTip?: string | number
  messageType: "warn" | "Warn" |"info" | "Info" | null
  control: Control | undefined // Required by rhf Controller: https://react-hook-form.com/ts/#Control. Will be undefined if input field empty
}

export const WarningMessage: FC<MessageProps> = (
  {
    messageType,
    control,
    testFor,
    ...props
  }
) => {

  const testWatch = useWatch({
    control,
    name: "controlledInput",
  })

 // const regEx = /(a)/g // check if contains "a"

  const testForX = (testFor) => {
    // console.log("1st renderMessage fired!", testWatch)
    if (testFor == "a") {
        const regEx = /(a)/g
        return regEx
    } else {
      const regEx = /(b)/g
      return regEx
    }
  }
  const regEx = testForX(testFor)
 
  // Render style logic
  const renderMessageStyle = (messageType, message) => {
   console.log("1st renderMessage fired!", testWatch, testFor)
    switch (messageType) {
      case "warn":
        return <span className="text-sm font-bold text-amber-600 pt-4 pb-2">⚠️ This is a warning message for what you wrote in the input field: {message}</span> 
        
      case "info":
        // return (regEx.test(testWatch)) && <span className="text-sm text-slate-500 pt-4 pb-2">🤓 This is a neutral informational message based on what you wrote in the input field: {message}</span> 
        
      default:
        return null
  }
}

  return (
    <>
      {/* {console.log("return:", regEx.test(testWatch))} */}
      {/* {regEx.test(testWatch) && <span className="text-sm font-bold text-amber-600 pt-4 pb-2">⚠️ This is a warning message for what you wrote in the input field</span>} */}
      {regEx.test(testWatch) && renderMessageStyle(messageType, "message")}

      {/* {(regEx.test(testWatch)) && <p>hello {messageWarn}</p>}
     { regTest(props) && <p>hello test{messageWarn}</p> } */}
     {/* {regTest(["b", "a", "a"]) ? <p>works</p>: <p>doesn't work</p>} */}
    </>
 
  )
}    

export default WarningMessage


