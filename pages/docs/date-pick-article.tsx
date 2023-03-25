import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import Section from '@designSystem/layouts/Section'
import DatePick from 'designSystem/atoms/DatePick'
import Divider from '@designSystem/layouts/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Date Pick", 
    path: "/",
    currentPg: true,
  }
]

const DatePickerPage: FC = () => {
  const { control } = useForm() // needed to remove the RHF prop type error
  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading id="date-picker" size="h1">Date Picker</Heading>
      <Paragraph>On this page you'll find a calendar date picker</Paragraph>

      <Section id="SingleDatePickExample" style="standard">
        <Heading size="h2">Example 1: Single Date Picker</Heading>
        <Paragraph>
          Custom Date Picker using Radix UI's Accordion primitive. 
          The Accordion's header holds a read only text input. 
          When expanded, an interactive tailwind-styled calendar allows the user to choose a custom date.
        </Paragraph>
        <Divider padding="xl" />
        <DatePick 
          name="exampleSingleDatePick" 
          label={"Pick a date (still uncontrolled):" }
          tipText="Optional tip to help the user to pick the right date. Set as null or leave out to hide it."
          control={control} // doesn't do anything yet
          startYearRange={1992} 
          endYearRange={2025} 
        />
      </Section>

      <Section id="multiDatePickExample" style="standard">
        <Heading size="h2">Example 2: Start + End Dates Picker</Heading>
        <Paragraph>You can also combine date picks to create a start and end date picker.</Paragraph>
        
        <Divider padding="xl" />
        
        <div className="inline-flex flex-wrap gap-4">
          <DatePick 
            name="exampleStartDatePick" 
            label={"Start Date:" }
            tipText={null}
            control={control} // doesn't do anything yet
            startYearRange={1992} 
            endYearRange={2025} 
          />
          <DatePick 
            name="exampleEndDatePick" 
            label={"End Date:" }
            tipText={null}
            control={control} // doesn't do anything yet
            startYearRange={1992} 
            endYearRange={2025} 
          />
        </div>
      </Section>

      <Section id="datePickDetails" style="standard">
        <Heading size="h3" type="primary">More Details:</Heading>
          <Paragraph>Turning the Date Pick into a controlled component is a work in progress. See issue #21 on GitHub.</Paragraph>
          <Paragraph>You can have start/end date components be vertically or horizontally aligned by using a parent div with flexbox.</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default DatePickerPage
