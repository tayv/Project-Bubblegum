"use client"

import React, { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ProductNameProps } from "@components/templates/templateTypes"
import ModalAlert from "@ui/ModalAlert"
import ModalViewDoc from "@ui/ModalViewDoc"
import CardSection from "@components/ui/Card"
import DynamicPDF from "@product2/DynamicPDF"
//import { PDFViewer } from "@react-pdf/renderer"

import dynamic from "next/dynamic"
import { pdfStyles } from "@product2/_pdfHelpers/pdfStyles"
import PillBar from "@form/PillBar"
import { Wrench } from "lucide-react"
import ButtonCTA from "@form/ButtonCTA"
import Divider from "@ui/Divider"
import SheetSignUp from "@uiTemplates/SheetSignUp"

export type FormProps = {
  id: string
  defaultValues: Record<string, any>
  zodSchema: z.ZodObject<any>
  onSubmit: (data: any, event: any) => Promise<void>
  buttonLabel?: string
  children: React.ReactElement | React.ReactElement[] // Expects one or more Field components
  productName: ProductNameProps["productName"]
  isFormSubmitted: boolean
  setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>
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
  isFormSubmitted,
  setIsFormSubmitted,
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
        className="flex flex-col gap-6 max-w-screen-lg w-full items-center pb-32"
        onSubmit={methods.handleSubmit(onSubmit)} // use RHF's handleSubmit to prevent default form submission behavior
      >
        {children}

        <ButtonCTA formID={id} type="submit" formHasErrors={formHasErrors} />

        <PillBar variant="standard" />
      </form>

      {/* --------- Note: sign up sheet needs to be outside form so the nested submit button won't submit parent form --------------- */}
      <SheetSignUp
        formID="signupSheetTest"
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
      />
      {/* ----------------------------- */}

      {/* Template starts ---------------------------------------------- */}
      <div className="hidden lg:block max-w-xs overflow-visible ">
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

// NOTES
// Need to wrap the form with RHF's FormProvider so that the Field component has access to methods and can manage form state
