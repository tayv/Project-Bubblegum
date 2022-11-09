import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@components/layout/Paragraph'

export type formDataObj = {
  input1: string
  input2: string
  input3: number
}

export type TemplateProps = {
  formID: string
  formData: formDataObj 
  location: string
}

const TemplateGeneric: FC<TemplateProps> = ( 
  {
    formID,
    formData,
    location,
    ...props
  }
) => {  

  const renderTemplate = ({location, formData}: Omit<TemplateProps, "formID">) => {
  
    switch (location) {
      case "a":
        return <p>This is some text. This is the dynamic content=&gt; {formData.input1}</p>
        
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
      { renderTemplate({location, formData}) }
    </>
  )
}

export default TemplateGeneric
