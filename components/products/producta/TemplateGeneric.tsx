import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@components/layout/Paragraph'

export type formDataObj = {
  input1: string
  input2: string
  input3: number
}

export type TemplateProps = {
  docID: Number
  formData: formDataObj 
  location: string
}

const TemplateGeneric: FC<TemplateProps> = ( 
  {
    docID,
    formData,
    location,
    ...props
  }
) => {  

  const renderTemplate = ({location, formData}: Omit<TemplateProps, "docID">) => {
    switch (location) {
      case "a":
        return <Paragraph size="small" text="This is generic text along with some dynamic content 👉 "> <strong>{ formData.input1 }</strong></Paragraph>
        
      case "b":
        return (formData.input1 === "some data") && <Paragraph size="large" text="This is generic text along with some dynamic content 👉 " > <strong>{ formData.input2 }</strong></Paragraph> 
        
      case "c":
        return 
      
      default:
        return null
    }
  }


  return (
    <>
      <Paragraph size="large" text="This is some text I hope you like it and are inspired ✨" />
      <Paragraph size="standard" text="FormID: ">{docID}</Paragraph>
      <Paragraph size="standard" text="FormData: ">{JSON.stringify(formData)}</Paragraph>
      { renderTemplate({location, formData}) }
    </>
  )
}

export default TemplateGeneric
