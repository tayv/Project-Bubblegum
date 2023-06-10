"use client"

import { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import LoadTemplate from "@template/LoadTemplate"

export type FormProps = {
  id: string
  defaultValues: Record<string, any>
  zodSchema: z.ZodObject<any>
  onSubmit: (data: any, event: any) => Promise<void>
  buttonLabel?: string
  children: any
}

// HELPER FUNCTIONS

// MAIN COMPONENT
const Form: FC<FormProps> = ({
  defaultValues,
  zodSchema,
  onSubmit,
  id,
  buttonLabel = "Submit Form",
  children,
  ...props
}) => {
  const [formData, setFormData] = useState({})
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

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
          {buttonLabel}
        </button>
        {!!formHasErrors ? (
          <p className="text-red-600">
            The form can&apos;t be submitted until you fix the errors above.
          </p>
        ) : null}
      </form>

      {/* Template styles ---------------------------------------------- */}
      <div className="overflow-visible my-4">
        {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        <div className="sticky top-0 overflow-y-auto">
          {/* <Product1TemplateTest formData={formData} /> */}
          {/* <Product1Template /> */}
          <LoadTemplate productName="product1" />
        </div>
      </div>
      {/* Template ends ---------------------------------------------- */}
    </FormProvider>
  )
}

export default Form
