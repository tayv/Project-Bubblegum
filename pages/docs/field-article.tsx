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
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useMatchRegex from "@utils/useMatchRegex"
import SelectRadix from "@designSystem/atoms/SelectRadix"
import WatchField from "@designSystem/forms/WatchField"

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
    inputfieldtest: "",
    inputfieldtestzod: "",
    selectfieldtest: "first",
    watchfieldtest: "",
  }
  // Used by the test section to show the form data in the UI
  const [formData, setFormData] = useState({})

  // NOTE: Must include all fields in the zod schema, even if they're not required. The form only submits the included inputs.
  const zodSchema = z.object({
    fielddatepicktest: z.string().optional(),
    inputfieldtest: z
      .string()
      .min(3, "Must be at least 3 characters")
      .optional(),
    // inputfieldtestzod: z.string().nonempty("This field is required!!!"),
    inputfieldtestzod: z
      .string()
      .refine(
        (value) => value.length >= 3,
        "It's recommended to have at least 3 characters"
      )
      .optional(),
    selectfieldtest: z.string().optional(),
    watchfieldtest: z.string().optional(),
    //   watchfieldtest: z.string().refine((value, parent?) => {
    //     if (parent?.selectfieldtest.equals("second")) {
    //       return  null
    //     }
    //     return true
    //   }, "This field is required when inputfieldtest is 't'").nullable(),
  })

  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })

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
          On this page you&apos;ll find a generic Field component that&apos;s
          used as a wrapper to make child form components contrtollable.
        </Paragraph>

        <SectionCard id="FieldExample" style="standard">
          <Heading size="h2">Field Component Example</Heading>
          <Paragraph>
            Field component used the compound component pattern and looks like
            this:
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
                <Field.GroupLabel type="standard">
                  Pick a date:
                </Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <DatePick
                    // name="fielddatepicktest"
                    // label="fielddatepicktest"
                    startYearRange={1990}
                    endYearRange={2030}
                  />
                </Field.Control>
              </Field>

              <PrintInputValueButton
                inputID="fielddatepicktest"
                getValues={methods.getValues}
              />

              <Divider padding="large" />

              <Field
                name="inputfieldtest"
                defaultValue={""}
                validateOnBlur={true}
              >
                <Field.GroupLabel type="standard">
                  Enter something:
                </Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <Input type="text" />
                </Field.Control>
              </Field>

              <Field
                name="inputfieldtestzod"
                defaultValue={""}
                validateOnBlur={true}
              >
                <Field.GroupLabel>
                  Enter something with 3 letters:
                </Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <Input type="text" />
                </Field.Control>
                <Field.Message type="warn" formulaShortCode="1b">
                  This is a warning message
                </Field.Message>
              </Field>

              <Field name="selectfieldtest" defaultValue={"first"}>
                <Field.GroupLabel>Select something:</Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <SelectRadix
                    placeholder="Select an option"
                    itemOptions={[
                      {
                        value: "first",
                        labelText: "firstText",
                        separator: false,
                      },
                      {
                        value: "second",
                        labelText: "secondText",
                        separator: true,
                      },
                      {
                        value: "third",
                        labelText: "thirdText",
                        separator: false,
                      },
                      {
                        value: "fourth",
                        labelText: "fourthText",
                        separator: true,
                      },
                    ]}
                  />
                </Field.Control>
              </Field>
            <WatchField name="watchfieldtest" conditionObj={{ watchName: "selectfieldtest", watchValue: "second" }}>
              {/* Passing a name and defaultValue are needed for the watchfield to work */}
              <Field
                name="watchfieldtest"
                defaultValue={defaultValues.watchfieldtest}
                validateOnBlur={true}
              >
                <Field.GroupLabel>
                  Enter something with 3 letters:
                </Field.GroupLabel>
                <Field.Tip>This is a tip</Field.Tip>
                <Field.Control>
                  <Input type="text" />
                </Field.Control>
                <Field.Message type="warn" formulaShortCode="1b">
                  This is a warning message
                </Field.Message>
              </Field>
              </WatchField>

              <Divider padding="large" />

              <PrintInputValueButton
                inputID="selectfieldtest"
                getValues={methods.getValues}
              />

              <PrintInputValueButton
                inputID="watchfieldtest"
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
