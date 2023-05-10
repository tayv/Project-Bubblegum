import { useState } from "react"
import Paragraph from "@designSystem/atoms/Paragraph"
import { useFormContext } from "react-hook-form"

// Used by PrintInputValueButton
const RenderInputValue = ({ inputID, getValues, setInputValue }: any) => {
  console.log("inputID:", inputID, "inputValue:", getValues(inputID))
  setInputValue(getValues(inputID))
}

// // Printing an input's value used for debugging
const PrintInputValueButton = ({ inputID }: any) => {
  const [inputValue, setInputValue] = useState("")
  const { getValues } = useFormContext()
  return (
    <div className="flex flex-row items-center gap-3">
      <button
        type="button"
        className="block border-slate-900 bg-slate-100 hover:bg-slate-200 border rounded-md my-1 px-2 py-1 text-xs font-medium"
        onClick={() => {
          {
            RenderInputValue({ inputID, getValues, setInputValue })
          }
        }}
      >
        🖨️ Print {inputID} Value
      </button>

      <Paragraph size="small">{`Value: ${inputValue}`}</Paragraph>
    </div>
  )
}

export default PrintInputValueButton
