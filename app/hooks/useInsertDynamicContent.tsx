"use client"
import Paragraph from "@components/ui/Paragraph"

export type InsertDynamicContentProps = {
  formData: {} | { key: string; value: string } // May need to imoprt in future. Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  inputName: string
}

// HELPER FUNCTIONS

// MAIN HOOK
const useInsertDynamicContent = ({ formData, inputName }: InsertDynamicContentProps) => {
 
  return (
    
      Object.entries(formData).map(([key, value], index) => {
        return (
          <span key={index} className="bg-yellow-100">
            <Paragraph className="inline bg-yellow-100">{key}, {value}</Paragraph>
          </span>
        )
      })
    
  )
}

export default useInsertDynamicContent
