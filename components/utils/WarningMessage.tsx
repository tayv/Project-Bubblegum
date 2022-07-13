import React, { FC, useEffect, useState } from 'react'
import { useForm, useWatch, Control } from 'react-hook-form'

export type Messages = {
  messageWarn?: string | number | object
  messageTip?: string | number
  control: Control | undefined // Required by rhf Controller: https://react-hook-form.com/ts/#Control. Will be undefined if field empty
}

export const WarningMessage: FC<Messages> = (
  {
    messageWarn,
    control,
    ...props
  }
) => {

  const testWatch = useWatch({
    control,
    name: "controlledInput",
  });

  const regEx = /(a)/g // check if contains "a"
  const regTest = (value) => {
    // console.log("regTest value: ", value)
    if (value == undefined) {
      return false
    }

    else if (regEx.test(value[1]) == true) {

    }
 
  }

  return (
    <>
      {(regEx.test(testWatch)) && <p>hello {messageWarn}</p>}
     { regTest(props) && <p>hello test{messageWarn}</p> }
     {/* {regTest(["b", "a", "a"]) ? <p>works</p>: <p>doesn't work</p>} */}
     { useEffect( () => console.log("The new use effect: ", testWatch), [testWatch]) } 
    </>
 
  )
}    

export default WarningMessage


