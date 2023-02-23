import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@components/layout/Paragraph'
import Divider from '@components/layout/Divider'

export type FormDataObj = {
  input1: string
  input2: string
  input3: number
}

export type TemplateProps = {
  docID: Number
  formData: FormDataObj 
  location: string
}

// Helper functions ----------------------------
let renderTable = ({docID, formData}: Omit<TemplateProps, "location">) => {
    
  return (
    <table className="table-fixed w-full border border-2 p-2">
      <thead className="text-left bg-sky-100">
        <tr>
          <th colSpan={2} className="p-2">Document ID: {docID}</th>
        </tr>
        <tr>
          <th className="p-2">Input Name</th>
          <th className="p-2">Input Value</th>
        </tr>
      </thead> 
      <tbody>
    { 
     Object.entries(formData).map(([key, value], index) => {
      return (

              <tr key={index} className="border border-2 p-2">
                <td className="border border-2 p-2">{key}</td>
                <td className="border border-2 p-2">{value}</td>
              </tr>
      )
     }) 
    }
    </tbody>
    </table>
  ) 
  
}

const renderTemplate = ({location, docID, formData}: TemplateProps) => {
  switch (location) {
    case "a":
      return <Paragraph size="small" text="Here's boilerplate text plus some dynamic content based on the form values 👉 "> <strong>{ formData.input1 }</strong></Paragraph>
      
    case "b":
      return (formData.input1 === "some data") && <Paragraph size="large" text="This is boilerplate text. The following is dynamic content 👉 " > <strong>{ formData.input2 }</strong></Paragraph> 
      
    case "c":
      return renderTable({docID, formData})
    
    default:
      return null
  }
}

// Component Function Starts Here ----------------------------
const TemplateGeneric: FC<TemplateProps> = ( 
  {
    docID,
    formData,
    location,
    ...props
  }
) => {  


  return (
    <>
      <Paragraph size="standard" text="The form values (TBD currently static values) will be used to create a document template. Document ID functionality is TBD — will be use to organize multiple instances of form submissions in the database." />
      <Divider padding="large"/>
      { renderTemplate({docID, location, formData}) }
    </>
  )
}

export default TemplateGeneric
