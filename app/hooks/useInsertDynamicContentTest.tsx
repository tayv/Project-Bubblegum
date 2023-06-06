"use client"
import Paragraph from "@components/ui/Paragraph"

export type InsertDynamicContentProps = {
  formData: Record<
    string,
    string | boolean | Date | number | string | undefined
  > // May need to imoprt in future. Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  inputName: string
  schema: Record<string, Record<string, string>>
}

// HELPER FUNCTIONS

// MAIN HOOK
const useInsertDynamicContentTest = ({
  formData,
  schema,
  inputName,
}: InsertDynamicContentProps) => {
  const inputSchema = schema[inputName]
  const currentInputValue = String(formData[inputName]) // Need to normalize data. NOTE: JS comparison requires String() not JSON.stringify

  return (
    // Step 1: Map through formData and find the key that matches inputName. This mapping might not be needed if already pass the inputName as prop.
    //  Object.entries(formData).map(([key, value], index) => {

    //  return (

    Object.entries(inputSchema).map(([key, value], index) => {
      console.log(key, currentInputValue)
      console.log("is equal", key === currentInputValue)
      if (key === currentInputValue) {
        // Could write a check here for sub keys and values like Header or Paragraph
        // OR Could have separate hooks for each type of content insertHeader, insertParagraph, insertTable, etc.
        // Every input has a subSchema even if only paragraph is used.

        // Idea: use compound component to build a component that renders all the content types (header, paragraph, table, etc.)
        // Then have a sub schema with all the content rendered for that input value. e.g. titleA, titleB, titleC, etc.
        // Perhaps each grouped data chunk also gets its own sub schema. e.g. A: {title, body, table,e tc.}, B, C, etc.

        return (
          <span key={index} className="bg-yellow-100">
            <Paragraph className="inline bg-yellow-100">
              {inputSchema[key]}
            </Paragraph>
          </span>
        )
      }
    })

    // ORIGINAL WORKING CONDITION
    // <span key={index} className="bg-yellow-100">
    //   <Paragraph className="inline bg-yellow-100">{value ? schema[key].true : schema[key].false}</Paragraph>
    // </span>
    //  )
    //   })
  )
}

export default useInsertDynamicContentTest
