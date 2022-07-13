import React, { FC, useEffect, useState } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'

export type Messages = {
  messageWarn?: string | number | object
  messageTip?: string | number
}

export const WarningMessage: FC<Messages> = (
  {
    messageWarn,
    control,
    ...props
  }
) => {

  // const [inputChange, setInputChange] = useState({}) // doesn't work
  const { getValues } = useForm()
  const testWatch = useWatch({
    control,
    name: "controlledInput",
  });

  const regEx = /(a)/g // check if contains "a"
  const regTest = (value) => {
    console.log("regTest value: ", value)
    if (value == undefined) {
      return false
    }

    else if (regEx.test(value[1]) == true) {
     // setInputChange("worked")  
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