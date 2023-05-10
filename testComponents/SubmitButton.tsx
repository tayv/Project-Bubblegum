import { useForm } from "react-hook-form"
import { FC } from "react"
import Paragraph from "@designSystem/atoms/Paragraph"

// This component is only used for debbugging

type TestSubmitButtonProps = {
  onSubmit: any
  formData: any
}

const SubmitButton: FC<TestSubmitButtonProps> = ({ onSubmit, formData }) => {
  return (
    <div className="flex flex-1 flex-row items-center gap-3">
      <div className="flex-none">
        <button
          form="test-datepick-form"
          type="submit"
          className="block border-slate-900 bg-slate-100 hover:bg-slate-200 border rounded-md my-1 px-2 py-1 text-xs font-medium"
          onClick={onSubmit}
        >
          📫 Submit Form
        </button>
      </div>
      <div>
        <Paragraph size="small">{`Form data from useState: ${JSON.stringify(
          formData
        )}`}</Paragraph>
        <Paragraph size="small">
          View the console to see logged rhf form submission
        </Paragraph>
      </div>
    </div>
  )
}

export default SubmitButton
