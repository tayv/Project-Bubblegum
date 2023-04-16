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
          <Heading size="h2">Fied Component Example</Heading>
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

            <SectionCard id="field-datepick" style="standard">
              <Heading size="h3" type="primary">
                Field with a Date Picker
              </Heading>

              <Field
              name="fielddatepicktest"
              defaultValue=""
              validationRules={{ required: true }}
              >
                <Field.Label htmlFor="compoundtest">First Name</Field.Label>
                <Field.Control>
                  <DatePick
                    name="fielddatepicktest"
                    label="fielddatepicktest"
                    startYearRange={1990}
                    endYearRange={2030}
                  />
                </Field.Control>
                {/* <Field.Message>First Name is required</Field.Message>
                <Field.ValidityState>Valid</Field.ValidityState> */}
              </Field>
        
              <Divider padding="large" />
              <PrintInputValueButton
                inputID="fielddatepicktest"
                getValues={methods.getValues}
              />
             
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
