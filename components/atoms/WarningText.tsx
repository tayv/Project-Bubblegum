import React, { FC } from 'react'

export type Messages = {
  messageWarn?: string | number
  messageTip?: string | number
}

export const WarningText: FC<Messages> = (
  {
    messageWarn,
    ...props
  }
) => {

  return (
    <p>hello {messageWarn}</p>
  )
}    
 