import React, { FC } from 'react'

export type RegexMessageProps = {
  testFor: string | number
}

export const RegexMessage: FC<RegexMessageProps> = (
  {
    testFor,
    ...props
  }
) => {

  const testForX = (testFor) => {
    if (testFor == "a") {
        return /(a)/g
    } else if (testFor == "custom") {
      return /(b)/g 
    } else {
      return /(c)/g
    } 
  }
  let regEx = testForX(testFor)
 

  return (
 
  )
}    

export default RegexMessage


