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

  return (
    <p>hello {messageWarn}</p>
  )
}    

export default WarningMessage