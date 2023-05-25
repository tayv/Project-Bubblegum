import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import CardSection from "@designSystem/molecules/CardSection"
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
import Form from "@designSystem/forms/Form"
import RadioGroup from "@designSystem/molecules/RadioGroup"
import { Zap, Wrench, Flashlight, Skull } from "lucide-react"

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
    radiofieldtest: "honda",
    selectfieldtest: "first",
    watchfieldtest: "",
    watchradio: "red",
    radioButtonLargeType: "mario",
  }
  // Used by the test section to show the form data in the UI
  const [formData, setFormData] = useState({})

  // NOTE: Must include all fields in the zod schema, even if they're not required. The form only submits the included inputs.
  // NOTE: BUG if make a hidden field required. Unable to submit form. See https://github.com/tayv/Project-Bubblegum/issues/58
  const zodSchema = z.object({
    fielddatepicktest: z.string().optional(),
    inputfieldtest: z
      .string()
      .min(3, "Must be at least 3 characters")
      .optional(),
    radiofieldtest: z
      .enum(["honda", "yamaha", "suzuki", "kawasaki"])
      .optional(),
    selectfieldtest: z.string().optional(),
    watchfieldtest: z.string().optional(),
    watchradio: z.enum(["red", "blue", "yellow", "green"]).optional(),
    radioButtonLargeType: z
      .enum(["mario", "luigi", "wario", "waluigi"])
      .optional(),
  })

  const onSubmit = async (
    data: Record<string, any>,
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

        <CardSection id="FieldExample" style="standard">
          <Heading size="h2">Field Component Example</Heading>
          <Paragraph>
            Field component used the compound component pattern and looks like
            this:
          </Paragraph>
          <Divider padding="xl" />
          TBD
        </CardSection>

        {/* ------------------------ Form Test Section ------------------------*/}
        <Form
          id="test-field-form"
          defaultValues={defaultValues}
          zodSchema={zodSchema}
          onSubmit={onSubmit}
        >
          <Heading size="h5" type="secondary">
            TEST FORM
          </Heading>

          <CardSection id="field-datepick" style="standard">
            <Heading size="h3" type="primary">
              Field with a Date Picker
            </Heading>

            <Field
              name="fielddatepicktest"
              defaultValue=""
              validationRules={{ required: "This field is required" }}
            >
              <Field.GroupLabel type="standard">Pick a date:</Field.GroupLabel>
              <Field.Tip>This is a tip</Field.Tip>
              <Field.Control>
                <DatePick startYearRange={1990} endYearRange={2030} />
              </Field.Control>
            </Field>

            <PrintInputValueButton inputID="fielddatepicktest" />

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
              name="radiofieldtest"
              defaultValue="honda"
              validateOnBlur={true}
            >
              <Field.GroupLabel>Radio buttons:</Field.GroupLabel>
              <Field.Tip>This is a tip</Field.Tip>
              <Field.Control>
                <RadioGroup
                  options={[
                    { value: "honda", label: "Honda" },
                    { value: "yamaha", label: "Yamaha" },
                    { value: "suzuki", label: "Suzuki" },
                    { value: "kawasaki", label: "Kawasaki" },
                  ]}
                />
              </Field.Control>
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

            <WatchField
              conditionLogic={{
                watchName: "selectfieldtest",
                watchValue: "second",
              }}
              name="watchfieldtest"
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
            </WatchField>

            <WatchField
              conditionLogic={{
                watchName: "radiofieldtest",
                watchValue: "suzuki",
              }}
              name="watchradio"
              //validateOnBlur={true}
            >
              <Field.GroupLabel>Pick your favorite color:</Field.GroupLabel>
              <Field.Tip>This is a tip</Field.Tip>
              <Field.Control>
                <RadioGroup
                  options={[
                    { value: "red", label: "Red" },
                    { value: "blue", label: "Blue" },
                    { value: "yellow", label: "Yellow" },
                    { value: "green", label: "Green" },
                  ]}
                  type="button"
                />
              </Field.Control>
            </WatchField>

            <Divider padding="large" />

            <Field
              name="radioButtonLargeType"
              defaultValue="mario"
              validateOnBlur={false}
            >
              <Field.GroupLabel>Styled as square buttons:</Field.GroupLabel>
              <Field.Control>
                <RadioGroup
                  options={[
                    { value: "mario", label: "Mario", icon: <Wrench /> },
                    { value: "luigi", label: "Luigi", icon: <Flashlight /> },
                    { value: "wario", label: "Wario", icon: <Zap /> },
                    { value: "waluigi", label: "Waluigi", icon: <Skull /> },
                  ]}
                  type="buttonLarge"
                />
              </Field.Control>
            </Field>

            <Divider padding="large" />

            <PrintInputValueButton inputID="selectfieldtest" />

            <PrintInputValueButton inputID="watchfieldtest" />

            <Divider padding="large" />

            {/* <SubmitButton onSubmit={onSubmit} formData={formData} /> */}
          </CardSection>
        </Form>
      </LayoutContainerSide>
    </>
  )
}
export default FieldPage
