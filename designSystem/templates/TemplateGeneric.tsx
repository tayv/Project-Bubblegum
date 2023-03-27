import React, { FC, JSXElementConstructor } from 'react'
import Paragraph from '@designSystem/atoms/Paragraph'
import Divider from '@designSystem/atoms/Divider'

export type FormDataObj = {
  docID: Number
  formData: {} | { key: string, value: string } // Will typecheck specific key/value pairs in actual implementation 
}

export type TemplateProps = {
  docData: FormDataObj 
  location: string
}

// Helper functions ----------------------------
let renderTable = ({docID, formData}: FormDataObj) => {
    
  return (
    <table className="table-fixed w-full border-2 p-2">
      <thead className="text-left bg-sky-100">
        <tr>
          <th colSpan={2} className="p-2">Document ID: {docID}</th>
        </tr>
        <tr>
          <th className="p-2">Input ID</th>
          <th className="p-2">Input Value</th>
        </tr>
      </thead> 
      <tbody>
      { 
      Object.entries(formData).map(([key, value], index) => {
        return (

          <tr key={index} className="border-2 p-2">
            <td className="border-2 p-2">{key}</td>
            <td className="border-2 p-2">{value}</td>
          </tr>
        )
      }) 
      }
    </tbody>
    </table>
  ) 
  
}

const renderTemplate = ({location, docData}: TemplateProps) => {
  let {docID, formData} = docData

  switch (location) {
    case "a":
      return <Paragraph size="small">Here's boilerplate text plus some dynamic content based on the form values 👉 <strong>{ docID }</strong></Paragraph>
      
    case "b":
      return // (formData.input1 === "some data") && <Paragraph size="large" text="This is boilerplate text. The following is dynamic content 👉 " > <strong>{ formData.input2 }</strong></Paragraph> 
      
    case "c":
      return renderTable({docID, formData})
    
    default:
      return null
  }
}

// Component Function Starts Here ----------------------------
const TemplateGeneric: FC<TemplateProps> = ( 
  {
    docData,
    location,
    ...props
  }
) => {  

  let docID = docData.docID
  let formData = docData.formData

  return (
    <>
      <Paragraph size="standard">The form values (TBD currently static values) will be used to create a document template. Document ID functionality is TBD — will be use to organize multiple instances of form submissions in the database.</Paragraph>
      <Divider padding="large"/>
      <button 
        form="test-form"
        type="submit"
        className="block border-slate-500 bg-slate-200 hover:bg-slate-300 border rounded-md px-3 py-1"
        >
        📫  Submit Form
      </button>
      <Divider padding="large"/>
      { renderTemplate({location, docData}) }
    </>
  )
}

export default TemplateGeneric
