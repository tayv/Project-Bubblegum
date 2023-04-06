import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { prettyDOM } from "@testing-library/dom"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import DatePick from '@molecules/DatePick';
import Field from '@forms/FieldTest';
import { format, parse } from "date-fns"
import useSyncDefaultValues from "@utils/useSyncDefaultValues"

// Utility functions
  const openAccordion = (container, getByRole) => {
    // Initially, the Accordion should be closed.
    let accordionContent = container.querySelector(":where([data-state='closed']):first-of-type")
    expect(accordionContent).toBeInTheDocument()

    // Find the Accordion trigger inside the accordionContent.
    const accordionTrigger = accordionContent.querySelector('button')
    fireEvent.click(accordionTrigger);


    // After clicking, the Accordion should be open.
    accordionContent = container.querySelector(":where([data-state='open'])")
    expect(accordionContent).toBeInTheDocument()

    return accordionContent
  }

  const openSecondAccordion = (container, getByRole) => {
    // Initially, the Accordion should be closed.
    console.log('container', container);

    let accordionContent2 = container.querySelector(":where([data-state='closed']):nth-of-type(1)");
   
    expect(accordionContent2).toBeInTheDocument();

    // Find the Accordion trigger inside the accordionContent.
    const accordionTrigger = accordionContent2.querySelector('button');
    fireEvent.click(accordionTrigger);


    // After clicking, the Accordion should be open.
    accordionContent2 = container.querySelector(":where([data-state='open'])");
    expect(accordionContent2).toBeInTheDocument();

    return accordionContent2;
  }

// Test data
const defaultDate = parse('Apr-05-2023', 'MMM-dd-yyyy', new Date())  
const formatDefaultDate = format(defaultDate, 'MMM-dd-yyyy')

// Test component
const TestDatePick = ({ children }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('DatePick renders', () => {
  

  test('renders successfully', () => {

    render(
      <TestDatePick>
        <Field name="datePickField" defaultValue={defaultDate}>
          <DatePick
            name="datePickField"
            label="datePickField"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
      </TestDatePick>
    )

    expect(screen.getByText(/datePickField/i)).toBeInTheDocument();
  });

  test('opens and reveals Calendar when clicked', async () => {
    const { getByRole, container } = render(

      <TestDatePick>
        <Field name="datePickField2" defaultValue={defaultDate}>
          <DatePick
            name="datePickField2"
            label="datePickField2"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
      </TestDatePick>
    )

    const accordionContent = openAccordion(container, getByRole)

    // Check if the "Quick Jump" header is present in the rendered component
    expect(screen.getByText(/Quick Jump/i)).toBeInTheDocument();

  
})


})

describe('Date Pick: Calendar Interaction', () => {
  test('changes the value of the input when a day button inside Calendar is clicked', async () => {
    const { getByRole, container, getByTestId, getByText } = render(
      <TestDatePick>
        <Field name="datePickField" defaultValue={defaultDate}>
          <DatePick
            name="datePickField"
            label="datePickField"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
      </TestDatePick>
    );

    // Get the DatePick's input element
    const dateInput = container.querySelector('input[type="text"]')

    openAccordion(container, getByRole)
    
    const calendar = getByText('Quick Jump');

    // Find the day button and click it
    const dayButton = getByText('8')
    fireEvent.click(dayButton)
    
    // Check if the input value is the same as the selected date
    const newDate = new Date(2023, 3, 8); // April 8, 2023
    const formattedNewDate = format(newDate, 'MMM-dd-yyyy');
    expect(dateInput.value).toBe(formattedNewDate);
  })
})


// SYNC TWO FIELDS TEST -----------------------------------

// Need SyncedField so that the custom hook can access methods via useFormContext
const SyncedField = ({ syncWithField, ...props }) => {
  const methods = useFormContext()
  const defaultValueSync = useSyncDefaultValues(
    methods,
    props.defaultValue,
    syncWithField,
    props.name
  );

  return <Field {...props} defaultValue={defaultValueSync} />
}

describe("DatePicks: Sync defaultValues of related fields with custom hook", () => {
  test("DatePick defaultValues match on first render", async () => {
    const { getByRole, container } = render(
      <TestDatePick>
        <Field name="datePickFieldWatch" defaultValue={defaultDate}>
          <DatePick
            name="datePickFieldWatch"
            label="datePickFieldWatch"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
        {/* This DatePick should have the same default value as the one above */}
        <SyncedField
          name="datePickFieldSync"
          defaultValue={defaultDate}
          syncWithField="datePickFieldWatch"
        >
          <DatePick
            name="datePickFieldSync"
            label="datePickFieldSync"
            startYearRange={1990}
            endYearRange={2030}
          />
        </SyncedField>
      </TestDatePick>
    )

    // Find the input elements by their name attributes
    const datePickFieldWatchInput = container.querySelector(
      'input[name="datePickFieldWatch"]'
    );
    const datePickFieldSyncInput = container.querySelector(
      'input[name="datePickFieldSync"]'
    );

    // Values should match
    expect(datePickFieldWatchInput.value).toBe(datePickFieldSyncInput.value)
  })

  test("DatePick defaultValues match if datePickFieldWatch changes", async () => {
    const { getByRole, getByText, container } = render(
      <TestDatePick>
        <Field name="datePickFieldWatch" defaultValue={defaultDate}>
          <DatePick
            name="datePickFieldWatch"
            label="datePickFieldWatch"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
        {/* This DatePick should have the same default value as the one above */}
        <SyncedField
          name="datePickFieldSync"
          syncWithField="datePickFieldWatch"
        >
          <DatePick
            name="datePickFieldSync"
            label="datePickFieldSync"
            startYearRange={1990}
            endYearRange={2030}
          />
        </SyncedField>
      </TestDatePick>
    )

    // Find the input elements by their name attributes
    const datePickFieldWatchInput = container.querySelector(
      'input[name="datePickFieldWatch"]'
    );
    const datePickFieldSyncInput = container.querySelector(
      'input[name="datePickFieldSync"]'
    );

    // First Accordion -----------------------------------
    // Change value of datePickFieldWatch
    const firstAccordion = openAccordion(container, getByRole)
   
    //const calendar = firstAccordion.querySelector(':where(:contains("Quick Jump"))');
    const calendar = getByText('Quick Jump');
  
    // Find the day button and click it
    const dayButton = getByText('8')
    fireEvent.click(dayButton)

    // Wait for the input value of datePickFieldSyncInput to change
    await waitFor(() => {
      expect(datePickFieldWatchInput.value).toBe(datePickFieldSyncInput.value)
    })

    // Second Accordion -----------------------------------
    // Change value of datePickFieldSync
    const secondAccordion = openSecondAccordion(container, getByRole)

    // Find the day button and click it
    const dayButtonSecond = getByText('12')
    fireEvent.click(dayButtonSecond)

    // Wait for the input value of datePickFieldSyncInput to change
    await waitFor(() => {
      expect(datePickFieldWatchInput.value).not.toBe(datePickFieldSyncInput.value)
    })
   
  })

});
