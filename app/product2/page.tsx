"use client"

import * as z from "zod"
import React from "react"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Form from "@components/form/formControl/Form"
import Field from "@formControl/Field"
import Checkbox from "@components/form/Checkbox"
import Input from "@components/form/Input"
import Card from "@components/ui/Card"
import { useState, createContext } from "react"
import RadioGroup from "@components/form/RadioGroup"
import Select from "@components/form/Select"

import { ProductContext, ProductProvider } from "@contexts/ProductContext"

import { pdfStyles } from "../../utils/_pdfHelpers/pdfStyles"
import dynamic from "next/dynamic"
import { FormDataType } from "@productSchemas/productTypes"
import { format, startOfToday } from "date-fns"
import DatePick from "@components/form/DatePick"

import DynamicPDF from "../components/buildDoc/DynamicPDF"
import Space from "@components/ui/Space"
import { auth, currentUser, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

//import useActiveSection from "@hooks/useActiveSection"
import FormSection from "@form/FormSection"

const Product2 = () => {
  // Initialize hooks
  const { isSignedIn } = useUser()
  const router = useRouter()

  // Context to be used in all product pages
  const contextValues = React.useContext(ProductContext)
  if (!contextValues) {
    console.log("Error: You must use ProductContext in each page.")
    return null
  }

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

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    // If user's signed in via Clerk then go direct to docviewer pg
    if (isSignedIn) {
      router.push("/docviewer")
    } else contextValues.setFormData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data

    contextValues.setIsFormSubmitted(true) // so we can load the next step after form is submitted (modal or document viewer)

    try {
      const response = await fetch("/api/saveForm", {
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
      <ProductContext.Provider value={contextValues}>
        <Card color="none">
          <Heading
            size="h1"
            weight="bold"
            padding="standard"
            textAlign="center"
            className="lg:text-left"
          >
            Product 2
          </Heading>
          <Paragraph textAlign="center" className="lg:text-left">
            Demo: Building a dynamic PDF via form answers
          </Paragraph>
        </Card>

        <div className="flex lg:flex-row lg:gap-5 w-full xl:max-w-1400">
          <Form
            id="product1Form"
            productTitle="Product Demo"
            defaultValues={defaultValues}
            zodSchema={zodSchema}
            onSubmit={onSubmit}
            buttonLabel="Submit Form"
            productName="product2"
            isFormSubmitted={contextValues.isFormSubmitted}
            setIsFormSubmitted={contextValues.setIsFormSubmitted}
          >
            <FormSection id="location">
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
            </FormSection>

            <FormSection id="formSectionCard1">
              <Heading size="h2" weight="bold">
                Test Scroll 1
              </Heading>
            </FormSection>

            <FormSection id="conditionalFields">
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
            </FormSection>

            <FormSection id="textInput">
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
            </FormSection>

            <FormSection id="formSectionCard2">
              <Heading size="h2" weight="bold">
                Test Scroll 2
              </Heading>
            </FormSection>

            <FormSection id="signing">
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
            </FormSection>
          </Form>
        </div>
      </ProductContext.Provider>
    </>
  )
}

export default Product2

// Need a way to hide/show premium content based on license and auth state
