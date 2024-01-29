"use client"

import * as z from "zod"

import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Form from "@form/formControl/Form"
import Field from "@form/formControl/Field"
import Checkbox from "@form/Checkbox"
import Input from "@form/Input"
import Card from "@ui/Card"
import { useState, createContext, useContext } from "react"
import RadioGroup from "@form/RadioGroup"
import Select from "@form/Select"
import product1SchemaTest from "@product1/product1SchemaTest.json"
import { ProductContext } from "@contexts/ProductContext"
import ModalStandard from "@ui/ModalStandard"
import ModalViewDoc from "@ui/ModalViewDoc"
import { PDFViewer, StyleSheet } from "@react-pdf/renderer"
import dynamic from "next/dynamic"

// Create PDF styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#E4E4E4",
  },
})

const Product1 = () => {
  // Dynamically import PDFViewer to fix build bug since Next uses SSR
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false) // For rendering next step (ie. open SignUpSheet)

  // Setup pg context values to pass to template
  const pageContextValue = useContext(ProductContext)

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    setformData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data

    setIsFormSubmitted(true) // so we can load the next step after form is submitted (modal or document viewer)

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
    <ProductContext.Provider value={pageContextValue}>
      <Heading size="h1" weight="bold" padding="none">
        Product 1
      </Heading>
      <Paragraph>This is a test form using MDX to build a document.</Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <Form
          id="product1Form"
          productTitle="Product 1"
          defaultValues={defaultValues}
          zodSchema={zodSchema}
          onSubmit={onSubmit}
          buttonLabel="Submit Form"
          productName="product1"
          isFormSubmitted={isFormSubmitted}
          setIsFormSubmitted={setIsFormSubmitted}
        >
          <Card id="jurisdiction">
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
          </Card>

          <Card id="checkboxSection">
            <Field
              name="checkboxExample"
              //validateOnBlur={false}
            >
              <Field.GroupLabel>Standard checkbox:</Field.GroupLabel>
              <Field.Control>
                <Checkbox>This is a label</Checkbox>
              </Field.Control>
            </Field>
          </Card>

          <Card id="radioSection">
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
          </Card>

          <Card id="textSection">
            <Field
              name="textExample"
              //validateOnBlur={false}
            >
              <Field.GroupLabel>Standard text input:</Field.GroupLabel>
              <Field.Control>
                <Input type="text" />
              </Field.Control>
            </Field>
          </Card>
        </Form>
      </div>

      <ModalViewDoc
        triggerText="Load PDF"
        title="PDF Title"
        description="This is a description"
        formData={formData}
      ></ModalViewDoc>
    </ProductContext.Provider>
  )
}

export default Product1

// Need a useEffect for loading correct template. Want it to load dynamic values on first load based on location answer which should default based on estimated location.
// Need a way to hide/show premium content based on license and auth state
