import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/layouts/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import SectionCard from "@designSystem/molecules/SectionCard"
import DatePick from "@designSystem/molecules/DatePick"
import Divider from "@designSystem/atoms/Divider"

import PrintInputValueButton from "testComponents/PrintValueButton"
import SubmitButton from "testComponents/SubmitButton"
import Field from "@designSystem/forms/FieldTest"
import Calendar from "@atoms/Calendar"
import { format, startOfToday } from "date-fns"
import useFieldValue from "utils/useFieldValue"
import { useMemo, useEffect } from "react"


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
    currentPg: false,
  },
  {
    text: "Date Pick",
    path: "/",
    currentPg: true,
  },
]

const DatePickerPage: FC = () => {
  
  const defaultValues = {
    //  "exampleSingleDatePick": format(startOfToday(), 'MMM-dd-yyyy'),
      //"exampleStartDatePick": format(startOfToday(), 'MMM-dd-yyyy'),
      //"exampleEndDatePick": format(startOfToday(), 'MMM-dd-yyyy'),
      "datePickField": format(startOfToday(), 'MMM-dd-yyyy'),
    //  "datePickField2": datePickFieldValue // handled at the component level since relies on rhf methods 
    }
  // Used by the test section to show the form data
  const [formData, setFormData] = useState({})
  const { control, getValues, handleSubmit, watch, setValue } = useForm({defaultValues,
  }) // needed to remove the RHF prop type error and testin form submission
  const onSubmit = handleSubmit(async (data, event) => {
    setFormData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
  })

  // Synced DatePick values
  // let datePickFieldValue = watch('datePickField', format(startOfToday(), 'MMM-dd-yyyy'))
  // useEffect(() => {
  //   setValue('datePickField2', datePickFieldValue);
  // }, [datePickFieldValue, setValue])

 

  

  // // Set up form default values with rhf
  // useEffect(() => {
  //   reset({ ...defaultValues })
  // }, [defaultValues, reset])

  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading id="date-picker" size="h1">
          Date Picker
        </Heading>
        <Paragraph>On this page you&apos;ll find a calendar date picker</Paragraph>

        <SectionCard id="SingleDatePickExample" style="standard">
          <Heading size="h2">Example 1: Single Date Picker</Heading>
          <Paragraph>
            Custom Date Picker using Radix UI&apos;s Accordion primitive. The
            Accordion&apos;s header holds a read only text input. When expanded, an
            interactive tailwind-styled calendar allows the user to choose a
            custom date.
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
            control={control} // doesn't do anything yet
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
              defaultValue="2022-12-10"
              tipText={null}
              control={control} // doesn't do anything yet
              startYearRange={1992}
              endYearRange={2025}
            />
            <DatePick
              name="exampleEndDatePick"
              label={"End Date:"}
              tipText={null}
              control={control} // doesn't do anything yet
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
        <form
          id="test-datepick-form"
          className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
          onSubmit={onSubmit}
        >
          <SectionCard id="datepick" style="standard">
            <Heading size="h3" type="primary">
              Date Picker
            </Heading>

            <Field name="datePickField" control={control}  defaultValue={format(startOfToday(), 'MMM-dd-yyyy')}>
              <DatePick
                name="datePickField"
                label="datePickField"
                startYearRange={1990}
                endYearRange={2030}
               
              />
            </Field>

            <Field name="datePickField2" control={control} defaultValue={useFieldValue(watch, setValue, defaultValues.datePickField, "datePickField", "datePickField2")}>
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
              getValues={getValues}
            />
             <PrintInputValueButton
              inputID="datePickField2"
              getValues={getValues}
            />

            <Divider padding="large" />

            <SubmitButton onSubmit={onSubmit} formData={formData} />
          </SectionCard>
        </form>
      </LayoutContainerSide>
    </>
  )
}
export default DatePickerPage
