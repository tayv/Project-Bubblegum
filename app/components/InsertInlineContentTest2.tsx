"use client"

import React, { FC, useContext } from "react"
import useInsertDynamicContent from "@hooks/useInsertDynamicContent"
import Paragraph from "@ui/Paragraph"
import Heading from "@ui/Heading"
import Divider from "@designSystem/atoms/Divider"
import { PageContext } from "../product1/page"
import { doc } from "prettier"

export type DynamicContentProps = {
  docValue: {} | { key: string; value: string } // Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  inputName: string
  schema: {}
  condition: string
}

// Helper functions ----------------------------
const RenderDynamicContentTest = ({
  docValue,
  schema,
  inputName,
  condition,
}: DynamicContentProps) => {
  const inputSchema = schema[inputName]
  const currentInputValue = String(docValue[inputName]) // Need to normalize data. NOTE: JS comparison requires String() not JSON.stringify
 
  // console.log("inputSchema" , inputSchema, "currentInputValue", currentInputValue)
  console.log("inputSchema" , inputSchema[currentInputValue], "currentInputValue", currentInputValue)
  if (inputSchema[currentInputValue]) {
      
      return (
        // <span className="">
        //   <Paragraph className="inline bg-yellow-100">
        //     {inputSchema[currentInputValue][condition]}
        //   </Paragraph>
        // </span>
        <>
          {inputSchema[currentInputValue][condition]}
        </>
      )
    } else {
      return null
    }
    // Object.entries(inputSchema).map(([key, value], index) => {
    //   // console.log("currentInputValue", inputSchema[key])
    //   // console.log(currentInputValue)
    //   console.log(key, currentInputValue)
    //   // console.log("is equal", key === currentInputValue)
    //   console.log("condition", inputSchema)

    // if (key === currentInputValue) {
    //   console.log("condition fired!!", inputSchema[key][condition])
    //   return (
    //     <span key={index} className="">
    //       <Paragraph className="inline bg-yellow-100">
    //         {inputSchema[key][condition]}
    //       </Paragraph>
    //     </span>
    //   )
    // } else {
    //   return null
    // }
    // })
  
    // 1. Map over inputSchema to find the key that matches the value needed for the dynamic content
    // Object.entries(inputSchema).map(([key, value], index) => {
    //   console.log("currentInputValue", inputSchema[key])
     
    //   console.log(key, currentInputValue)
    //   console.log("is equal", key === currentInputValue)
  //     // 2. Once find the right key, need to check if the schema is an array of objects
  //     // IDEA: Could always use an array of objects, even if only one object. Then can simplify this as don't need array check
  //     // IDEA: Could return null if there's no content. Then can shortcut having to map through an array
  //     if (key === currentInputValue) {
  //       console.log("condition", inputSchema[condition])
  //       // If an array, then map through it
  
  //         // And return the elements in the object (e.g. header, body, etc.). Each object is a separate chunk of related content
  //         // IDEA: Use a switch statement here
  //         // return inputSchema[key][condition].map((obj, idx) => (
            
  //         //   <React.Fragment key={idx}>
  //         //     {obj.header && (
  //         //       <span className="">
  //         //         <Heading size="h2" className="bg-yellow-100">
  //         //           {obj.header}
  //         //         </Heading>
  //         //       </span>
  //         //     )}

  //         //     {obj.body && (
  //         //       <span className="">
  //         //         <Paragraph className="inline bg-yellow-100">
  //         //           {obj.body}
  //         //         </Paragraph>
  //         //       </span>
  //         //     )}
  //         //   </ React.Fragment>
  //         // ))
    
  //     }
  //   })
  // )
}

// Component Function Starts Here ----------------------------
const InsertInlineContentTest2: FC<DynamicContentProps> = ({ inputName, condition }) => {
  // Get context from page
  const contextValue = useContext(PageContext)
  if (!contextValue) {
    throw new Error(
      "InsertInlineContentTest must be used within a PageContext provider"
    )
  }
  const { docValue, schema } = contextValue

  return <>{RenderDynamicContentTest({ docValue, inputName, schema, condition })}</>
}

export default InsertInlineContentTest2
