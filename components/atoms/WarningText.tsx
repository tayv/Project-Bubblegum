import React, { FC, ChangeEvent} from 'react'

export type Messages = {
  messageWarn: string | number
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
 