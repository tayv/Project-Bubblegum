import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import SectionCard from "@designSystem/molecules/SectionCard"
import Divider from "@designSystem/atoms/Divider"

import PrintInputValueButton from "testComponents/PrintValueButton"
import Field from "@designSystem/forms/Field"
import Input from "@designSystem/atoms/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Form from "@designSystem/forms/Form"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Form",
    path: "/",
  },
]

const onSubmit = async ( data:Record<string, any>, event: React.FormEvent<HTMLFormElement> ) => {
  //  setDocValue({ docID: 1, formData: data }) // Save form values to state so the test template table can show the values
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

const FormPage: FC = () => {
  const defaultValues = {
    inputfield: "",
  }

  // NOTE: Must include all fields in the zod schema, even if they're not required. The form only submits the included inputs.
  const zodSchema = z.object({
    inputfield1: z.string().optional(),
  })



  return (
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Form
        id="form1"
        defaultValues={defaultValues}
        zodSchema={zodSchema}
        onSubmit={onSubmit}
      >
        <Field name="inputfield1" defaultValue={""} validateOnBlur={true}>
          <Field.GroupLabel>Enter something with 3 letters:</Field.GroupLabel>
          <Field.Tip>This is a tip</Field.Tip>
          <Field.Control>
            <Input type="text" />
          </Field.Control>
          <Field.Message type="warn" formulaShortCode="1b">
            This is a warning message
          </Field.Message>
        </Field>
      </Form>
    </LayoutContainerSide>
  )
}
export default FormPage
