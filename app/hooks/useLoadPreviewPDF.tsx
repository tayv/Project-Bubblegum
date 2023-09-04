import { useState } from "react"
import { useFormContext, UseFormReturn } from "react-hook-form"

type LoadPreviewPDFProps = {
  methods?: UseFormReturn
}

export const useLoadPreviewPDF = ({ methods }: LoadPreviewPDFProps = {}) => {
  // The method prop allows the hook to be used outside of Form since desktop version places Toolbox outside FormProvider

  // Always call useFormContext to avoid breaking rule of no conditional hooks
  const formContextMethods = useFormContext()
  // If methods not passed, use useFormContext
  const formMethods = methods || formContextMethods

  if (!formMethods) {
    throw new Error(
      "useLoadPreviewPDF must be used within a FormProvider or methods must be passed as a prop."
    )
  }

  // RHF's getValues used to grab the latest form data. Save it to state so that we can trigger re-renders if formData changes
  const { getValues } = formMethods
  const [latestFormData, setlatestFormData] = useState(getValues())

  // This will be used by the button onClick to open the PDF preview modal
  const handlePreviewPDF = () => {
    const updatedValue = getValues()
    setlatestFormData(updatedValue)
  }

  return { handlePreviewPDF, latestFormData }
}

// --- HOW TO USE ---

// 1. If component wrapped by RHF's FormProvider:
// const { handlePreviewPDF, latestFormData } = useLoadPreviewPDF()

// 2. If component not wrapped by RHF's FormProvider but has access to methods from useForm (e.g. in Form)
// const { handlePreviewPDF, latestFormData } = useLoadPreviewPDF({ methods })
