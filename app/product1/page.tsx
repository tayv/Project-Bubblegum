"use client"

import * as z from "zod"

import Test from './test.mdx'
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Form from "@formControl/Form"
import Field from "@formControl/Field";
import Checkbox from "@components/form/Checkbox"

const Product1 = () => {

  const defaultValues = {
    checkboxExamle: true,
  };

  const zodSchema = z.object({
    checkboxExample: z.boolean().optional(),
  });

  const onSubmit = (
    data: Record<string, any>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    //  setDocValue({ docID: 1, formData: data }) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error);
    console.log("event:", event);
    const body = data;
    window.alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Heading size="h1" weight="bold" padding="none">Product 1</Heading>
      <Paragraph>This is a test form page with app router.</Paragraph>
      <Test />
      <Form        
        id="product1Form"
        defaultValues={defaultValues}
        zodSchema={zodSchema}
        onSubmit={onSubmit}
        buttonLabel="Submit Form"
      >
        <Field
            name="checkboxStandardType"
            //validateOnBlur={false}
          >
          <Field.GroupLabel>Standard checkbox:</Field.GroupLabel>
          <Field.Control>
            <Checkbox>This is a label</Checkbox>
          </Field.Control>
        </Field>
      </Form>
    </>
  )
}

export default Product1