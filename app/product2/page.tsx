"use client"

import * as z from "zod"
import React from "react"
import { PageContextType } from "@components/templates/templateTypes"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import FormTest2 from "@formControl/FormTest2"
import Field from "@formControl/Field"
import Checkbox from "@components/form/Checkbox"
import Input from "@components/form/Input"
import CardSection from "@components/ui/CardSection"
import { useState, createContext } from "react"
import RadioGroup from "@components/form/RadioGroup"
import Select from "@components/form/Select"

import { PageContext } from "@components/templates/context"

import { pdfStyles } from "./_pdfHelpers/pdfStyles"
import dynamic from "next/dynamic"
import { FormDataType } from "./_schemas/productTypes"
import { format, startOfToday } from "date-fns"
import DatePick from "@components/form/DatePick"

import DynamicPDF from "./DynamicPDF"
import Space from "@components/ui/Space"

const Product2 = () => {
  // Dynamically import PDFViewer to fix build bug since Next uses SSR
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  const defaultValues: FormDataType = {
    checkboxExample: true,
    radioExample: "option1",
    textExample: "",
    jurisdiction: "location1",
    signingDate: format(startOfToday(), "MMM-dd-yyyy"),
  }

  const zodSchema = z.object({
    checkboxExample: z.boolean().optional(),
    radioExample: z.enum(["option1", "option2", "option3"]).optional(),
    textExample: z.string().nonempty("This field cannot be empty."),
    jurisdiction: z.enum(["location1", "location2", "location3"]),
    signingDate: z.string().optional(),
  })

  // Setup initial state
  // TODO See if this can be removed after refactor to PDF since we rely on RHF to handle state now
  const [formData, setFormData] = useState(defaultValues) // Need to set initial state to defaultValues to avoid type errors
  const [isFormSubmitted, setIsFormSubmitted] = useState(false) // For rendering next step (ie. open SignUpSheet)

  // Setup pg context values to pass to template
  // This may be able to be removed after refactor to PDF. May need it for snippets though.
  const pageContextValue = {
    formData: formData, // need to confirm but could prob get rid of this since using rhf's FormProvider in Form
    defaultValues: defaultValues, // used by rhf reset()
  }

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    setFormData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data

    setIsFormSubmitted(true) // so we can load the next step after form is submitted (modal or document viewer)

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log("something went wrong oops")
        //set an error banner here
      } else {
        // resetForm();
        console.log("form submitted successfully !!!")
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error)
    }
  }

  return (
    <>
      <PageContext.Provider value={pageContextValue}>
        <Heading size="h1" weight="bold" padding="standard">
          Product 2
        </Heading>
        <Paragraph>Demo: Building a dynamic PDF via form answers</Paragraph>
        <Space />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 w-full xl:max-w-1400">
          {isFormSubmitted ? (
            <PDFViewer style={pdfStyles.pdfViewer}>
              <DynamicPDF formData={formData} />
            </PDFViewer>
          ) : null}

          <FormTest2
            id="product1Form"
            defaultValues={defaultValues}
            zodSchema={zodSchema}
            onSubmit={onSubmit}
            buttonLabel="Submit Form"
            productName="product2"
            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
          >
            <CardSection id="location">
              <Heading size="h2" weight="bold">
                Your location
              </Heading>
              <Field name="jurisdiction" validateOnBlur={false}>
                <Field.GroupLabel>Pick your location:</Field.GroupLabel>
                <Field.Tip>
                  The PDF template is customized by location.
                </Field.Tip>
                <Field.Control>
                  <Select
                    placeholder="Select an option"
                    itemOptions={[
                      {
                        value: "location1",
                        labelText: "Location 1",
                        separator: false,
                      },
                      {
                        value: "location2",
                        labelText: "Location 2",
                        separator: false,
                      },
                      {
                        value: "location3",
                        labelText: "Location 3",
                        separator: false,
                      },
                    ]}
                  />
                </Field.Control>
              </Field>
            </CardSection>

            <CardSection id="conditionalFields">
              <Heading size="h2" weight="bold">
                Conditional fields
              </Heading>

              <Field
                name="checkboxExample"
                //validateOnBlur={false}
              >
                <Field.GroupLabel>
                  Toggle checkbox to change PDF content:
                </Field.GroupLabel>
                <Field.Control>
                  <Checkbox>Toggle me</Checkbox>
                </Field.Control>
              </Field>

              <Field
                name="radioExample"
                //validateOnBlur={false}
              >
                <Field.GroupLabel>Conditional radio options:</Field.GroupLabel>
                <Field.Tip>
                  Selecting option 2 when you are on location 3 will change PDF
                  content.
                </Field.Tip>
                <Field.Control>
                  <RadioGroup
                    variant="button"
                    options={[
                      { value: "option1", label: "Option 1" },
                      { value: "option2", label: "Option 2" },
                      { value: "option3", label: "Option 3" },
                    ]}
                  />
                </Field.Control>
              </Field>
            </CardSection>

            <CardSection id="textInput">
              <Heading size="h2" weight="bold">
                Party Names
              </Heading>
              <Field name="textExample" validateOnBlur={true}>
                <Field.GroupLabel>Enter a party name:</Field.GroupLabel>
                <Field.Tip>
                  The value here will be used for a party name.
                </Field.Tip>
                <Field.Control>
                  <Input type="text" />
                </Field.Control>
              </Field>
            </CardSection>

            <CardSection id="signing">
              <Heading size="h2" weight="bold">
                Signing
              </Heading>
              <Field name="signingDate">
                <Field.GroupLabel type="standard">
                  When will you sign this document?
                </Field.GroupLabel>
                <Field.Tip>Pick a date between today and 2030.</Field.Tip>
                <Field.Control>
                  <DatePick
                    startYearRange={parseInt(format(startOfToday(), "yyyy"))}
                    endYearRange={2030}
                  />
                </Field.Control>
              </Field>
            </CardSection>
          </FormTest2>
        </div>
      </PageContext.Provider>
    </>
  )
}

export default Product2

// Need a way to hide/show premium content based on license and auth state
