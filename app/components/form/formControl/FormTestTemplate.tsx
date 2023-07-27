"use client"

import React, { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import LoadTemplate from "@template/LoadTemplate"
import { ProductNameProps } from "@template/templateTypes"
import ModalAlert from "@ui/ModalAlert"
import ModalStandard from "@ui/ModalStandard"
import ModalViewDoc from "@ui/ModalViewDoc"
import CardSection from "@ui/CardSection"
import { useReactToPrint } from "react-to-print"

export type FormProps = {
  id: string
  defaultValues: Record<string, any>
  zodSchema: z.ZodObject<any>
  onSubmit: (data: any, event: any) => Promise<void>
  buttonLabel?: string
  children: React.ReactElement | React.ReactElement[] // Expects one or more Field components
  productName: ProductNameProps["productName"]
}

// HELPER FUNCTIONS

// MAIN COMPONENT
const FormTest: FC<FormProps> = ({
  defaultValues,
  zodSchema,
  onSubmit,
  id,
  buttonLabel = "Submit Form",
  children,
  productName,
  ...props
}) => {
  const [formData, setFormData] = useState({})
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

  // TESTING ----------------

  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  // const handlePrint = () => {
  //   if (iframeRef.current) {
  //   const iframeContentWindow = iframeRef.current.contentWindow
  //   iframeContentWindow.focus()
  //   iframeContentWindow.print()
  //   }

  // }

  const componentToPrintRef = React.useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  })

  // ------------------------

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
        onSubmit={methods.handleSubmit(onSubmit)} // use RHF's handleSubmit to prevent default form submission behavior
      >
        {children}
        {/* <SubmitButton onSubmit={onSubmit} formData={formData}/> */}

        <div className="flex justify-start gap-[25px] mt-10">
          <button
            type="submit"
            className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 bg-sky-200 hover:bg-white rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow focus:shadow-sky-400"
          >
            {buttonLabel}
          </button>
          {!!formHasErrors ? (
            <p className="text-red-600">
              The form can&apos;t be submitted until you fix the errors above.
            </p>
          ) : null}

          <ModalAlert
            handleConfirmClick={() => methods.reset(defaultValues)}
            title="Are you sure you want to reset the form?"
            description="This action can't be undone. Any unsaved values will be lost."
            confirmText="Reset Form"
          >
            <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 hover:bg-white rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow focus:shadow-sky-400">
              ↩️ Reset Form
            </button>
          </ModalAlert>

          <ModalViewDoc
            triggerText="View Doc"
            title="Document Title"
            description="This is a description"
            formData={methods.getValues()}
          >
            {/* <>
            <div ref={componentToPrintRef}>
            <LoadTemplate productName={productName} />
            </div> */}
            {/* <div ref={componentToPrintRef}>some stuff to print </div> */}
            {/* <button onClick={handlePrint}>Print this out!</button>
             </> */}
          </ModalViewDoc>
        </div>
      </form>

      {/* Template starts ---------------------------------------------- */}
      <div className="overflow-visible my-4">
        {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        {/* select-none needed to prevent user from copying text from preview */}
        <div className="sticky top-0 overflow-y-auto select-none">
          {/* <CardSection id="loadTemplatePreviewSection">
            <iframe ref={iframeRef}>
              <LoadTemplate productName={productName} />
            </iframe>
          </CardSection> */}
        </div>

        {/* <button onClick={handlePrint} className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 hover:bg-white rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow focus:shadow-sky-400">
          Test iframe
        </button> */}
      </div>
      {/* Template ends ---------------------------------------------- */}
    </FormProvider>
  )
}

export default FormTest
