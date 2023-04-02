import { FC, forwardRef, useState } from "react"
import { CalendarDays, Minus } from "lucide-react"
import { InputProps } from "designSystem/atoms/Input"
import InputLabel from "designSystem/atoms/InputLabelRadix"
import Tip, { TipProps } from "@molecules/Tip"
import * as Select from "@radix-ui/react-select"
import * as Accordion from "@radix-ui/react-accordion"
import { format, startOfToday } from "date-fns"
import Calendar, { CalendarProps } from "@designSystem/atoms/Calendar"

export type DatePickProps = {
  name: string
  label?: string | null
  tipText?: string | null
  defaultDate?: string | Date // should add a type guard function to validate format in future
}

const DatePick: FC<DatePickProps & CalendarProps & InputProps> = forwardRef<HTMLInputElement, DatePickProps & CalendarProps & InputProps>(
  function SetRefDatePick (
    {
      name,
      label = null,
      tipText = null,
      startYearRange,
      endYearRange,
      defaultDate = startOfToday(), // Want the calendar to open to today's date by default unless a custom value is passed
    },
    ref
  ) {
    // ------------- These are needed by the Calendar component to handle state -------------
    const parsedDefaultValue = new Date(defaultDate) // Needed to get convert the prop to a valid date. BUG: This displays as one day behind. TBD
    let [selectedDay, setSelectedDay] = useState(parsedDefaultValue) // the day currently selected by user
    let [showCalendar, setShowCalendar] = useState("CalendarClosed") // used to show/hide the calendar
    // --------------------------------------------------------------------------------------

    const toggleCalendar = () => {
      // Used by Radix UI's Accordion to open/close the Accordian. Not using Boolean because the Radix API requires a string value.
      // https://www.radix-ui.com/docs/primitives/components/accordion
      showCalendar === "CalendarOpen"
        ? setShowCalendar("CalendarClosed")
        : setShowCalendar("CalendarOpen")
    }

    return (
      <div>
        {!!label && <InputLabel type="standard" label={label} htmlFor={name} />}
        {!!tipText && <Tip type="standard" text={tipText} />}
        {/* Value and OnValueChange are required to toggle the open/close state of the Accordian when users clicks the header */}
        <Accordion.Root
          type="single"
          collapsible
          value={showCalendar}
          onValueChange={toggleCalendar}
          className="flex shrink"
        >
          {" "}
          {/* Flex shrink used since can't change Root styles like width using Data Attributes */}
          <Accordion.Item value={"CalendarOpen"} className="mt-1 ">
            <Accordion.Header className="group flex shadow data-[state=closed]:w-48 data-[state=open]:w-full bg-neutral-200 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
              <Accordion.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left ">
                {/* Integrated an input field into Accordian Header so that the form has an input value to submit */}
                <div className="inline-flex align-left">
                  <CalendarDays className="h-7 w-7 mr-2 text-black" />

                  <input
                    name={name}
                    ref={ref}
                    readOnly
                    type="text"
                    className="shrink w-full p-0 m-0 bg-transparent border-none focus:ring-0 text-black cursor-pointer"
                    value={format(selectedDay, "MMM-dd-yyyy")}
                  />
                </div>
                <Minus className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500 " />{" "}
                {/* Hiding minus icon when calendar is closed via tailwind's group to avoid cluttering the starting state with icons */}
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full">
              {/* Calendar */}
              <Calendar
                startYearRange={startYearRange}
                endYearRange={endYearRange}
                selectedDay={selectedDay}
                setShowCalendar={setShowCalendar}
                setSelectedDay={setSelectedDay}
                defaultDate={parsedDefaultValue}
              />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    )
  }
)

// Calendar is set up for a 7 day week so use a grid with 7 columns.
// The first day of the month is always on a different column depending on the day of the week
// Use date-fns's getDay() function to get the day of the week for the first day of the month as an index
// This index  which column to start the first day of the month on
let firstDayStartingCol = [
  "", // if the first day of the month is a Sunday, don't need to do anything
  "col-start-2", // if first day is a monday then start the first day on the second column
  "col-start-3", // etc...
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]

export default DatePick

// Calendar based on this tutorial
// https://www.youtube.com/watch?v=9ySmMd5Cjc0
