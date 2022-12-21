import React, { FC, Fragment, useState } from 'react'
import classNames from 'classnames'
import { Control, Controller } from 'react-hook-form'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Input, { InputProps } from '@atoms/Input'
import SelectRadix from '@atoms/SelectRadix'
import * as Select from '@radix-ui/react-select'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  setYear,
  startOfToday,
  eachYearOfInterval,
} from 'date-fns'

const DatePick: FC<InputProps> = ( { name , label, control } ) => {
  let today = startOfToday() // a date-fns function that gets current date on user's machine
  let [selectedDay, setSelectedDay] = useState(today) // the day current selected by user
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy')) // format is a date-fns function
  let firstDaySelectedMonth = parse(currentMonth, 'MMM-yyyy', new Date()) // From date-fns. Returns the date parsed from string using the given format string

  // store the days of the month in an array. This will be mapped through in order to create the calendar
  let daysInMonth = eachDayOfInterval({
    start: firstDaySelectedMonth,
    end: endOfMonth(firstDaySelectedMonth),
  })

  const prevMonth = () => {
    let firstDayNextMonth = add(firstDaySelectedMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDaySelectedMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const jumpToDate = (monthsToJump) => { 
    let jumpDate = add(firstDaySelectedMonth, { months: monthsToJump })
    setCurrentMonth(format(jumpDate, 'MMM-yyyy'))
  }

  const setNewYear = (e) => {
    let result = setYear(firstDaySelectedMonth, e)
    setCurrentMonth(format(result, 'MMM-yyyy'))
    console.log(result)
  }

  const getYearRange = (startYearRange, endYearRange) => {
    let result = eachYearOfInterval({ 
      start: new Date(startYearRange, 1, 1),
      end: new Date(endYearRange, 1, 1)
    })
    console.log(result)
  }

  return (
    <>
    <input type="text" name={name} defaultValue={format(selectedDay, 'MMM-dd-yyyy')} />
    <WrapperInput name={name} type="text" label={label} control={control} defaultValue={format(selectedDay, 'MMM-dd-yyyy')} /> 
    <Input name={name} label={label} value={format(selectedDay, 'MMM-dd-yyyy')} readOnly />
    <div className="py-2 border-solid border-2">
      <div className="max-w-md mx-auto sm:px-7 md:max-w-4xl md:px-2">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDaySelectedMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={prevMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              {/* // Can change the order of the days be re-ording the divs */}
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {/* // Map through the array of days in the selected month and render each day of the month as a button. 
                  // Each button has its own conditional styling. */}
              {daysInMonth.map((day, dayId) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayId === 0 && firstDayStartingCol[getDay(day)], // use date-fns getDay() as an index to start the first day of the month styling.
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)} // when user clicks on a day, set that day as the selected day
                    className={ classNames(
                      // current day selected?
                      isEqual(day, selectedDay) && 'text-white',
                      // if day is selected + is today's date = make the background red
                      isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-500',
                      // if day is selected + is NOT today's date = make the background gray
                      isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                      // if the day is selected OR the day is today's date = make the font semi bold
                      (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',

                      // if current day is not selected = make the current day text red
                      !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-500',
                       // if day is not selected + also not today's date + is in the current month = make the text gray
                      !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDaySelectedMonth) && 'text-gray-900',
                      // if day is not selected + also not today's date + is NOT in the current month = make the text lighter gray
                      !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDaySelectedMonth) && 'text-gray-400',
                      // if day is NOT selected + user is hovering over it = make the background gray
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                     
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    ) }
                  >
                    {/* // display the day as a number */}
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                </div>
              ))}
            </div>
          </div>
          <section>
            <button type="button" onClick={ () => getYearRange(1986, 2022) }>Get Years</button>
            <h2 className="text-emerald-500 font-medium">Quick Jump</h2>
            <ol>
              <li><button type="button" onClick={ () => setCurrentMonth(format(today, 'MMM-yyyy')) }>Today</button></li>
              <li><button type="button" onClick={ () => jumpToDate(3) }>+3 months</button></li>
              <li><button type="button" onClick={ () => jumpToDate(6) }>+6 months</button></li>
              <li><button type="button" onClick={ () => jumpToDate(12) }>+1 year</button></li>
              <li><button type="button" onClick={ () => jumpToDate(24) }>+2 years</button></li>
            </ol>
            <select name="yearSelect" id="yearSelect" onChange={(e) => setNewYear(e.target.value) } >
              <option value="2015">2015</option>
              <option value="2020">2020</option>
              <option value="2025">2025</option>
            </select>
        
            <br/>
            <Select.Root defaultValue="2005" onValueChange={setNewYear} >
              <Select.Trigger className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
                <Select.Value placeholder="choose a YEAR" />
                <Select.Icon />
              </Select.Trigger>
        
              <Select.Portal>
                <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white py-1 px-2">
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    <Select.Item className="outline-none cursor-pointer hover:bg-sky-300 px-2" value="2000">
                      <Select.ItemText>2000</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                    <Select.Item className="outline-none cursor-pointer hover:bg-sky-300 px-2" value="2005">
                      <Select.ItemText>2005</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                    <Select.Item className="outline-none cursor-pointer hover:bg-sky-300 px-2" value="2010">
                     <Select.ItemText>2010</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </section>
        </div>
      </div>
    </div>
    </>
  )
}

  // Calendar is set up for a 7 day week so use a grid with 7 columns.
  // The first day of the month is always on a different column depending on the day of the week
  // Use date-fns's getDay() function to get the day of the week for the first day of the month as an index
  // This index  which column to start the first day of the month on
let firstDayStartingCol = [
  '', // if the first day of the month is a Sunday, don't need to do anything
  'col-start-2', // if first day is a monday then start the first day on the second column
  'col-start-3', // etc...
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]

export default DatePick


// Calendar based on this tutorial
  // https://www.youtube.com/watch?v=9ySmMd5Cjc0 