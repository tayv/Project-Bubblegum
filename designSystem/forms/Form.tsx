import { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import SubmitButton from "testComponents/SubmitButton"

// HELPER FUNCTIONS
// const onSubmit = methods.handleSubmit(async (data, event) => {
//   console.log("Form submitted. data:", data, "Submit form - errors", Error)
// })

// MAIN COMPONENT
const Form: FC = ({
  defaultValues,
  zodSchema,
  onSubmit,
  id,
  children,
  ...props
}) => {
  const [formData, setFormData] = useState({})
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
        onSubmit={methods.handleSubmit(onSubmit)} // use RHF's handleSubmit to prevent default form submission behavior
      >
        {children}
        {/* <SubmitButton onSubmit={onSubmit} formData={formData}/> */}
        <button
          type="submit"
          className="block border-slate-900 bg-slate-100 hover:bg-slate-200 border rounded-md my-1 px-2 py-1 text-xs font-medium"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}

export default Form
