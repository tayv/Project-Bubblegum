"use client"

import React, { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ProductNameProps } from "@templates/templateTypes"
import { ModalAlert } from "@uiRepo/components"
import ModalViewDoc from "@components/templates/ModalViewDoc"
import { Card } from "@uiRepo/components"
import DynamicPDF from "@buildDoc/DynamicPDF"
import { useLoadPreviewPDF } from "@hooks/useLoadPreviewPDF"
//import { PDFViewer } from "@react-pdf/renderer"

import dynamic from "next/dynamic"
import { pdfStyles } from "@utils/_pdfHelpers/pdfStyles"
import PillBar from "@form/PillBar"
import { View, Wrench } from "lucide-react"
import { ButtonCTA } from "@uiRepo/forms"
import { Divider } from "@uiRepo/components"
import SheetSignUp from "@components/templates/SheetSignUp"
import SheetSignUpClerk from "@components/templates/SheetSignUpClerk"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { ModalStandard } from "@uiRepo/components"
import SheetUpsell from "@components/templates/SheetUpsell"

export type FormProps = {
  id: string
  productTitle: string
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
const Form: FC<FormProps> = ({
  productTitle,
  defaultValues,
  zodSchema,
  onSubmit,
  id,
  buttonLabel = "Submit Form",
  children,
  productName,
  isFormSubmitted,
  setIsFormSubmitted,
  //initialActiveSection,
  // setActiveSection,
  ...props
}) => {
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

  const { handlePreviewPDF, latestFormData } = useLoadPreviewPDF({ methods })

  // Dynamically import PDFViewer to fix build bug since Next uses SSR. See: https://www.youtube.com/watch?v=HhLa-D0SXlI
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  // Passing and setting initial active section here for clarity because ProductContext is reused for all product forms
  // React.useEffect(() => {
  //   setActiveSection(initialActiveSection)
  // }, [initialActiveSection, setActiveSection])

  return (
    // FormProvider needed for Field component and preview in ToolBox
    <FormProvider {...methods}>
      <form
        id={id}
        className="flex flex-col gap-6 max-w-screen-lg w-full items-center pb-32"
        onSubmit={methods.handleSubmit(onSubmit)} // use RHF's handleSubmit to prevent default form submission behavior
      >
        {children}

        <ButtonCTA formID={id} type="submit" formHasErrors={formHasErrors} />

        <PillBar
          productTitle={productTitle}
          methods={methods}
          variant="standard"
        />
      </form>

      {/* --------- Note: sign up sheet needs to be outside form so the nested submit button won't submit parent form --------------- */}
      {/* <SheetSignUp
        formID="signupSheetTest"
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
      /> */}
      <SignedOut>
        <SheetSignUpClerk
          formID="signupSheetTest"
          isFormSubmitted={isFormSubmitted}
          setIsFormSubmitted={setIsFormSubmitted}
        />
      </SignedOut>
      {/* ----------------------------- */}

      {/* Toolbox starts ---------------------------------------------- */}
      <div className="hidden lg:block max-w-xs overflow-visible ">
        {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        {/* select-none needed to prevent user from copying text from preview */}
        <div className="lg:sticky top-0 overflow-y-auto select-none">
          <Card id="loadTemplatePreviewSection" color="blank">
            <div className="flex flex-row gap-2 font-semibold">
              <Wrench />
              Document Toolbox
            </div>
            <Divider padding="large" />
            <SignedOut>
              <SheetUpsell
                triggerComponent={
                  <button
                    onClick={handlePreviewPDF}
                    className="flex flex-row gap-2 py-1 "
                  >
                    <View />
                    Preview document
                  </button>
                }
              />
            </SignedOut>
            <SignedIn>
              <ModalViewDoc
                variant="preview"
                triggerText="Preview Doc"
                title={`Preview: ${productTitle}`}
                description="This is a preview not your final document."
                //formData={methods.getValues()}
                formData={latestFormData}
                handlePreviewPDF={handlePreviewPDF}
              >
                {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
                <PDFViewer style={pdfStyles.pdfViewer}>
                  <DynamicPDF formData={methods.getValues()} />
                </PDFViewer>
              </ModalViewDoc>
            </SignedIn>
          </Card>
        </div>
      </div>

      {/* Toolbox ends ---------------------------------------------- */}
    </FormProvider>
  )
}

export default Form

// NOTES
// Need to wrap the form with RHF's FormProvider so that the Field component has access to methods and can manage form state
