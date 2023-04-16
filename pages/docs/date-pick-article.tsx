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
import Calendar from "@atoms/Calendar"
import { format, startOfToday } from "date-fns"
import useSyncDefaultValues from "@utils/useSyncDefaultValues"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Date Pick",
    path: "/",
  },
]

const DatePickerPage: FC = () => {
  const defaultValues = {
    compoundtest: format(startOfToday(), "MMM-dd-yyyy"),
    exampleSingleDatePick: format(startOfToday(), "MMM-dd-yyyy"),
    exampleStartDatePick: format(startOfToday(), "MMM-dd-yyyy"),
    exampleEndDatePick: format(startOfToday(), "MMM-dd-yyyy"),
    datePickField: format(startOfToday(), "MMM-dd-yyyy"),
    // "datePickField2": datePickFieldValue // handled at the component level since need to pass rhf method prop with useSyncInputDefaultValues custom hook
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
        <Heading id="date-picker" size="h1">
          Date Picker
        </Heading>
        <Paragraph>
          On this page you&apos;ll find a calendar date picker
        </Paragraph>

        <SectionCard id="SingleDatePickExample" style="standard">
          <Heading size="h2">Example 1: Single Date Picker</Heading>
          <Paragraph>
            Custom Date Picker using Radix UI&apos;s Accordion primitive. The
            Accordion&apos;s header holds a read only text input. When expanded,
            an interactive tailwind-styled calendar allows the user to choose a
            custom date. DefaultValue prop requires controlled components.
          </Paragraph>
          <Divider padding="xl" />

          <div className="max-w-lg">
            {
              // @ts-ignore
              <Calendar startYearRange={1992} endYearRange={2025} />
            }
          </div>

          <Divider padding="xl" />

          <DatePick
            name="exampleSingleDatePick"
            label={"Pick a date (still uncontrolled):"}
            tipText="Optional tip to help the user to pick the right date. Set as null or leave out to hide it."
            startYearRange={1992}
            endYearRange={2025}
          />
        </SectionCard>

        <SectionCard id="multiDatePickExample" style="standard">
          <Heading size="h2">Example 2: Start + End Dates Picker</Heading>
          <Paragraph>
            You can also combine date picks to create a start and end date
            picker.
          </Paragraph>

          <Divider padding="xl" />

          <div className="inline-flex flex-wrap gap-4">
            <DatePick
              name="exampleStartDatePick"
              label={"Start Date:"}
              tipText={null}
              startYearRange={1992}
              endYearRange={2025}
            />
            <DatePick
              name="exampleEndDatePick"
              label={"End Date:"}
              tipText={null}
              startYearRange={1992}
              endYearRange={2025}
            />
          </div>
        </SectionCard>

        <SectionCard id="datePickDetails" style="standard">
          <Heading size="h3" type="primary">
            More Details:
          </Heading>
          <Paragraph>
            Turning the Date Pick into a controlled component is a work in
            progress. See issue #21 on GitHub.
          </Paragraph>
          <Paragraph>
            You can have start/end date components be vertically or horizontally
            aligned by using a parent div with flexbox.
          </Paragraph>
        </SectionCard>

        {/* ------------------------ Test Section ------------------------*/}
        <FormProvider {...methods}>
          <form
            id="test-datepick-form"
            className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
            onSubmit={onSubmit}
          >
            <Field
              name="compoundtest"
              defaultValue=""
              validationRules={{ required: true }}
            >
              <Field.Label htmlFor="compoundtest">First Name</Field.Label>
              <Field.Control>
                <DatePick
                  name="compoundtest"
                  label="compoundtest"
                  startYearRange={1990}
                  endYearRange={2030}
                />
              </Field.Control>
              {/* <Field.Message>First Name is required</Field.Message>
              <Field.ValidityState>Valid</Field.ValidityState> */}
            </Field>

            <SectionCard id="datepick" style="standard">
              <Heading size="h3" type="primary">
                Date Picker
              </Heading>

              <Field name="datePickField" defaultValue="">
                <DatePick
                  name="datePickField"
                  label="datePickField"
                  startYearRange={1990}
                  endYearRange={2030}
                />
              </Field>

              <Field
                name="datePickField2"
                defaultValue={useSyncDefaultValues(
                  methods,
                  defaultValues.datePickField,
                  "datePickField",
                  "datePickField2"
                )}
              >
                <DatePick
                  name="datePickField2"
                  label="datePickField2"
                  startYearRange={1990}
                  endYearRange={2030}
                />
              </Field>

              <Divider padding="large" />
              <PrintInputValueButton
                inputID="datePickField"
                getValues={methods.getValues}
              />
              <PrintInputValueButton
                inputID="datePickField2"
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
export default DatePickerPage
