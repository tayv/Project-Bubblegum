import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@components/layout/Paragraph'
import { json } from 'stream/consumers'

export type TemplateProps = {
  formID: string
  formData: object 
  location: string
}

const TemplateGeneric: FC<TemplateProps> = ( 
  {
    formID,
    formData,
    ...props
  }
) => {  

  const renderTemplate = ({...props}: TemplateProps) => {
  
    switch (location) {
      case "a":
        return 
        
      case "b":
        return 
        
      case "c":
        return 
      
      default:
        return null
    }
  }


  return (
    <>
      <Paragraph size="large" text="This is some text I hope you like it and are inspired ✨" />
      <Paragraph size="standard" text="FormID: ">{formID}</Paragraph>
      <Paragraph size="standard" text="FormData: ">{JSON.stringify(formData)}</Paragraph>
      { renderTemplate({...props}) }
    </>
  )
}

export default TemplateGeneric
