import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import SectionCard from "@designSystem/molecules/SectionCard"
import DatePick from "@designSystem/molecules/DatePick"
import Divider from "@designSystem/atoms/Divider"

import PrintInputValueButton from "testComponents/PrintValueButton"
import SubmitButton from "testComponents/SubmitButton"
import Field from "@designSystem/forms/Field"
import { format, startOfToday } from "date-fns"
import Checkbox from "@designSystem/atoms/Checkbox"
import CheckboxRadix from "@designSystem/atoms/CheckboxRadix"
import Input from "@designSystem/atoms/Input"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Field",
    path: "/",
  },
]

const FieldPage: FC = () => {
  const defaultValues = {
    fielddatepicktest: format(startOfToday(), "MMM-dd-yyyy"),
  }
  // Used by the test section to show the form data in the UI
  const [formData, setFormData] = useState({})

  const methods = useForm({ defaultValues })

  const onSubmit = methods.handleSubmit(async (data, event) => {
    setFormData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
  })

  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading id="field" size="h1">
          Field Component
        </Heading>
        <Paragraph>
          On this page you&apos;ll find a generic Field component that&apos;s used as a wrapper to make child form components contrtollable.
        </Paragraph>

        <SectionCard id="FieldExample" style="standard">
          <Heading size="h2">Field Component Example</Heading>
          <Paragraph>
            Field component used the compound component pattern and looks like this:
          </Paragraph>
          <Divider padding="xl" />

          TBD
        </SectionCard>

        {/* ------------------------ Form Test Section ------------------------*/}
        <FormProvider {...methods}>
          <form
            id="test-field-form"
            className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
            onSubmit={onSubmit}
          >
            <Heading size="h5" type="secondary">
                TEST FORM
              </Heading>

            <SectionCard id="field-datepick" style="standard">
              <Heading size="h3" type="primary">
                Field with a Date Picker
              </Heading>

              <Field
                name="fielddatepicktest"
                defaultValue=""
                validationRules={{ required: "This field is required" }}
              >
                <Field.GroupLabel type="standard">First Name</Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <DatePick
                    // name="fielddatepicktest"
                    label="fielddatepicktest"
                    startYearRange={1990}
                    endYearRange={2030}
                  />
                </Field.Control>
                <Field.Message>Pick a date that makes sense</Field.Message>
                <Field.Valid>Valid</Field.Valid> 
              </Field>

              <PrintInputValueButton
                inputID="fielddatepicktest"
                getValues={methods.getValues}
              />

              <Divider padding="large" />
              
              <Field
                name="checkboxfieldtest"
                defaultValue={true}
                validationRules={{ required: true }}
              >
               
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <CheckboxRadix />

                </Field.Control>
                <Field.GroupLabel type="checkbox">Toggle me</Field.GroupLabel>
                {/* <Field.Message>First Name is required</Field.Message>
                <Field.ValidityState>Valid</Field.ValidityState> */}
              </Field>
        
              <Divider padding="large" />

              <Field
                name="inputfieldtest"
                defaultValue={""}
                validationRules={{
                  required: "This field is required",
                  minLength: { value: 5, message: "Minimum length is 5 characters" },
                  maxLength: { value: 10, message: "Maximum length is 10 characters" },
                }}
              >
                <Field.GroupLabel type="standard">Enter something:</Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <Input type="text" />
                </Field.Control>
                <Field.Message>{methods.formState.errors.inputfieldtest && methods.formState.errors.inputfieldtest.message}</Field.Message>
                {/* <Field.ValidityState>Valid</Field.ValidityState> */}
              </Field>
              
             
              <Divider padding="large" />

              <SubmitButton onSubmit={onSubmit} formData={formData} />
            </SectionCard>
          </form>
        </FormProvider>
      </LayoutContainerSide>
    </>
  )
}
export default FieldPage


// Documentation
// https://react-hook-form.com/api#Controller
// https://react-hook-form.com/api#useForm
// https://react-hook-form.com/api#FormProvider
// Validation examples:

// validationRules={{
//   validate: (value) => {
//     if (value.startsWith("A")) {
//       return "Value cannot start with the letter A";
//     }
//     return true;
//   },
// }}


// Zod
// Potential RHF bug with Zod Optional validation. Make sure to pass defaultValues to useForm. See: https://stackoverflow.com/questions/73715295/react-hook-form-with-zod-resolver-optional-field