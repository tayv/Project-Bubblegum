import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { prettyDOM } from "@testing-library/dom"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import DatePick from '@molecules/DatePick';
import Field from '@forms/FieldTest';
import { format, parse } from "date-fns"

// Utility functions
const openAccordion = (container, getByRole) => {
  // Initially, the Accordion should be closed.
  let accordionContent = container.querySelector(":where([data-state='closed'])");
  expect(accordionContent).toBeInTheDocument();

  // Find the Accordion trigger and click it.
  const accordionTrigger = getByRole('button');
  fireEvent.click(accordionTrigger);

  // After clicking, the Accordion should be open.
  accordionContent = container.querySelector(":where([data-state='open'])");
  expect(accordionContent).toBeInTheDocument();

  return accordionContent;
}

// Test suite
const TestFormWrapper = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DatePick component', () => {
  const defaultDate = parse('Apr-05-2023', 'MMM-dd-yyyy', new Date()) 
  const formatDefaultDate = format(defaultDate, 'MMM-dd-yyyy')

  test('renders successfully', () => {

    render(
      <TestFormWrapper>
        <Field name="datePickField" defaultValue={defaultDate}>
          <DatePick
            name="datePickField"
            label="datePickField"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
      </TestFormWrapper>
    )

    expect(screen.getByText(/datePickField/i)).toBeInTheDocument();
  });

  test('opens and reveals Calendar when clicked', async () => {
    const { getByRole, container } = render(

      <TestFormWrapper>
        <Field name="datePickField2" defaultValue={defaultDate}>
          <DatePick
            name="datePickField2"
            label="datePickField2"
            startYearRange={1990}
            endYearRange={2030}
          />
        </Field>
      </TestFormWrapper>
    );

    const accordionContent = openAccordion(container, getByRole)

    // Check if the "Quick Jump" header is present in the rendered component
    expect(screen.getByText(/Quick Jump/i)).toBeInTheDocument();

  
})
test('changes the value of the input when a day button inside Calendar is clicked', async () => {
  const { getByRole, container, getByTestId, getByText } = render(
    <TestFormWrapper>
      <Field name="datePickField" defaultValue={defaultDate}>
        <DatePick
          name="datePickField"
          label="datePickField"
          startYearRange={1990}
          endYearRange={2030}
        />
      </Field>
    </TestFormWrapper>
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
});
})

