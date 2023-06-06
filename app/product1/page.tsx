"use client"

import * as z from "zod"

import Product1Template from "./product1Template.mdx"
import Product1TemplateTest from "./product1TemplateTest.mdx"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Form from "@formControl/Form"
import Field from "@formControl/Field"
import Checkbox from "@components/form/Checkbox"
import CardSection from "@components/ui/CardSection"
import TemplateGeneric from "@components/TemplateGeneric"
import { useState, createContext } from "react"
import useInsertDynamicContent from "@hooks/useInsertDynamicContent"
import RadioGroup from "@components/form/RadioGroup"
import product1SchemaTest from "./product1SchemaTest.json"

// Create FormContext
export const PageContext = createContext(undefined)

const Product1 = () => {
  const defaultValues = {
    checkboxExample: true,
    radioExample: "option1",
  }

  const zodSchema = z.object({
    checkboxExample: z.boolean().optional(),
    radioExample: z.enum(["option1", "option2", "option3"]).optional(),
  })

  // Setup initial state
  const [docValue, setDocValue] = useState({})

  // Setup pg context values to pass to template
  const pageContextValue = {
    docValue: docValue,
    schema: product1SchemaTest,
  }

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    setDocValue(data) // Save form values to state so the test template table can show the values
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

  return (
    <PageContext.Provider value={pageContextValue}>
      <Heading size="h1" weight="bold" padding="none">
        Product 1
      </Heading>
      <Paragraph>This is a test form page with app router.</Paragraph>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <Form
          id="product1Form"
          defaultValues={defaultValues}
          zodSchema={zodSchema}
          onSubmit={onSubmit}
          buttonLabel="Submit Form"
        >
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
        </Form>

        {/*TEMPLATE SECTION START --------------------------------------------- */}
        <div className="overflow-visible my-4">
          {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
          <div className="sticky top-0 overflow-y-auto">
            {/* <Product1TemplateTest formData={docValue} /> */}
            <Product1TemplateTest />
          </div>
        </div>
      </div>
    </PageContext.Provider>
  )
}

export default Product1
