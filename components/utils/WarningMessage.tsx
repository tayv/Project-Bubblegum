import React, { FC } from 'react'

export type Messages = {
  messageWarn?: string | number | object
  messageTip?: string | number
}

export const WarningMessage: FC<Messages> = (
  {
    messageWarn,
    ...props
  }
) => {

  const regEx = /(a)/g; // check if contains "a"
  const regTest = (value) => {
    console.log("regTest value: ", value)
    if (value == undefined) {
      return false
    }

    else if (regEx.test(value[1]) == true) {
      return true
    }
    
    
 
  }

  return (
    <>
      {console.log(props, regEx.test(props[1]), regTest(props[1]))}
      {(regEx.test(props[1])) && <p>hello {messageWarn}</p>}
     { regTest(props) && <p>hello test{messageWarn}</p> }
     {/* {regTest(["b", "a", "a"]) ? <p>works</p>: <p>doesn't work</p>} */}
    </>
 
  )
}    

export default WarningMessage