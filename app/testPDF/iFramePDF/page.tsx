"use client"

import * as z from "zod"
import React from 'react'
import Product1Template from "@product1/product1Template.mdx"
import { PageContextType } from "@template/templateTypes"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import FormTest from "@formControl/FormTest"
import Field from "@formControl/Field"
import Checkbox from "@components/form/Checkbox"
import Input from "@components/form/Input"
import CardSection from "@components/ui/CardSection"
import { useState, createContext } from "react"
import RadioGroup from "@components/form/RadioGroup"
import Select from "@components/form/Select"
import product1SchemaTest from "@product1/product1SchemaTest.json"
import { PageContext } from "@template/context"
import ModalStandard from "@components/ui/ModalStandard"
import ModalViewDoc from "@components/ui/ModalViewDoc"
import { useReactToPrint } from "react-to-print"

const Product1 = () => {
  const defaultValues = {
    checkboxExample: true,
    radioExample: "option1",
    textExample: "",
    jurisdiction: "location1",
  }

  const zodSchema = z.object({
    checkboxExample: z.boolean().optional(),
    radioExample: z.enum(["option1", "option2", "option3"]).optional(),
    textExample: z.string().optional(),
    jurisdiction: z.enum(["location1", "location2", "location3"]).optional(),
  })

  // Setup initial state
  const [formData, setformData] = useState({})

  // Setup pg context values to pass to template
  const pageContextValue = {
    formData: formData,
    schema: product1SchemaTest,
  }

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    setformData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data
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

  const componentToPrintRef = React.useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  })

  return (
    <>

   
    <PageContext.Provider value={pageContextValue}>
      <Heading size="h1" weight="bold" padding="none">
        Product 1
      </Heading>
      <Paragraph>This is a test form page with app router.</Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <FormTest
          id="product1Form"
          defaultValues={defaultValues}
          zodSchema={zodSchema}
          onSubmit={onSubmit}
          buttonLabel="Submit Form"
          productName="product1"
        >
          <Field name="jurisdiction" validateOnBlur={false}>
            <Field.GroupLabel>Location Select:</Field.GroupLabel>
            <Field.Tip>
              The template and template content can be customized by location.
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

          <Field
            name="checkboxExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard checkbox:</Field.GroupLabel>
            <Field.Control>
              <Checkbox>This is a label</Checkbox>
            </Field.Control>
          </Field>

          <Field
            name="radioExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard radio:</Field.GroupLabel>
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

          <Field
            name="textExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard text input:</Field.GroupLabel>
            <Field.Control>
              <Input type="text" />
            </Field.Control>
          </Field>
        </FormTest>
      </div>
    </PageContext.Provider>
    </>
  )
}

export default Product1
