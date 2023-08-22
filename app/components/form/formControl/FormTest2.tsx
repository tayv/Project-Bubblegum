"use client"

import React, { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ProductNameProps } from "@template/templateTypes"
import ModalAlert from "@ui/ModalAlert"
import ModalViewDoc from "@ui/ModalViewDoc"
import CardSection from "@ui/CardSection"
import DynamicPDF from "@product2/DynamicPDF"
//import { PDFViewer } from "@react-pdf/renderer"

import dynamic from "next/dynamic"
import { pdfStyles } from "@product2/_pdfHelpers/pdfStyles"
import PillBar from "@form/PillBar"
import { Wrench } from "lucide-react"
import SubmitButton from "@form/SubmitButton"
import Divider from "@ui/Divider"

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
const FormTest2: FC<FormProps> = ({
  defaultValues,
  zodSchema,
  onSubmit,
  id,
  buttonLabel = "Submit Form",
  children,
  productName,
  ...props
}) => {
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

  // Dynamically import PDFViewer to fix build bug since Next uses SSR
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className="lg:col-span-3"
        onSubmit={methods.handleSubmit(onSubmit)} // use RHF's handleSubmit to prevent default form submission behavior
      >
        {children}
        {/* <SubmitButton onSubmit={onSubmit} formData={formData}/> */}

        <div className="flex justify-center gap-[25px] mt-10 mb-28 ">
          <SubmitButton formHasErrors={formHasErrors} />
        </div>

        <PillBar variant="standard" />
      </form>

      {/* Template starts ---------------------------------------------- */}
      <div className="hidden lg:block lg:col-span-1 overflow-visible ">
        {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        {/* select-none needed to prevent user from copying text from preview */}
        <div className="lg:sticky top-0 overflow-y-auto select-none">
          <CardSection id="loadTemplatePreviewSection">
            <div className="flex flex-row gap-2">
              <Wrench />
              TODO: Toolbox goes here
            </div>
            <Divider padding="large" />
            <ModalViewDoc
              triggerText="Preview Doc"
              title="Document Title"
              description="This is a description"
              formData={methods.getValues()}
            >
              {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
              <PDFViewer style={pdfStyles.pdfViewer}>
                <DynamicPDF formData={methods.getValues()} />
              </PDFViewer>
            </ModalViewDoc>
          </CardSection>
        </div>
      </div>

      {/* Template ends ---------------------------------------------- */}
    </FormProvider>
  )
}

export default FormTest2
