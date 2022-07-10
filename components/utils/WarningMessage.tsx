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
  return (
    <>
      {console.log(props, regEx.test(props[1]))}
      (regEx.test(props[1])) && <p>hello {messageWarn}</p>
    </>
 
  )
}    

export default WarningMessage