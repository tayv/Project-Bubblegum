import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@components/layout/Paragraph'

export type TemplateProps = {
  formID: string
  formData: object 
}

const TemplateGeneric: FC<TemplateProps> = ( 
  {
    formID,
    formData,
    ...props
  }
) => {  

  return (
    <>
      <Paragraph size="large" text="This is some text I hope you like it and are inspired ✨" />
      <Paragraph size="standard" text="FormID: ">{formID}</Paragraph>
    </>
  )
}

export default TemplateGeneric
