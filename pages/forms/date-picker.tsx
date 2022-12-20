import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Section from '@components/layout/Section'
import DatePicker from '@atoms/DatePicker'
import DatePick from '@atoms/DatePick'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Date Picker", 
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
      <Heading text="Date Picker" size="h1" type="primary"/>
      <Paragraph text="This page shows date pickers and calendars" size="standard" type="primary" />
      <br />
      <hr />
      <Section id="datepick" style="standard">
        <Heading text="HTML5: Date Picker" size="h3" type="primary"/>
        <Paragraph text="This html5 date picker has basic formatting functionality but will appear inconsistently across devices and browsers" size="standard" type="primary" />
        <DatePicker name="testhtmldatepick" label="HTML5 Date Picker:" />
      </Section>

      <Section id="dates" style="standard">
        <Heading text="Custom Date Picker" size="h2" type="primary"/>
        <Paragraph text="Custom Date Picker using tailwind styled calendar and a read-only input field" size="standard" type="primary" />
        <DatePick name="testcustomdatepick" label="Pick a date:" control={control} />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default DatePickerPage
