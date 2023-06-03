"use client"
import Paragraph from "@components/ui/Paragraph"

export type InsertDynamicContentProps = {
  formData: {} | { key: string; value: string } // May need to imoprt in future. Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  inputName: string
  schema: {}
}

// HELPER FUNCTIONS

// MAIN HOOK
const useInsertDynamicContent = ({ formData, schema, inputName }: InsertDynamicContentProps) => {
    const subSchema = schema[inputName]
    const currentInputValue = formData[inputName]

  return (
      // Step 1: Map through formData and find the key that matches inputName. This mapping might not be needed if already pass the inputName as prop.
    //  Object.entries(formData).map(([key, value], index) => {
        
      //  return (
          
          Object.entries(subSchema).map(([key, value], index) => {
            console.log(key, currentInputValue)
            console.log("is equal", key === JSON.stringify(currentInputValue)) // Need to normalize data 
            if (key === JSON.stringify(currentInputValue)) {
            return (
              
              <span key={index} className="bg-yellow-100">
                <Paragraph className="inline bg-yellow-100">{subSchema[key]}</Paragraph>
              </span>
            )
          } }
          )  



          // ORIGINAL WORKING CONDITION
          // <span key={index} className="bg-yellow-100">
          //   <Paragraph className="inline bg-yellow-100">{value ? schema[key].true : schema[key].false}</Paragraph>
          // </span>
      //  )
   //   })
    
  )
}

export default useInsertDynamicContent
