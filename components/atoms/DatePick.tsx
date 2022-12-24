import React, { FC, Fragment, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Control, Controller, useForm } from 'react-hook-form'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, MinusIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'
import Input, { InputProps } from '@atoms/Input'
import InputLabel from '@atoms/InputLabelRadix'
import * as Select from '@radix-ui/react-select'
import * as Accordion from '@radix-ui/react-accordion'
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
  let [showCalendar, setShowCalendar] = useState(false) // used to show/hide the calendar

  // store the days of the month in an array. This will be mapped through in order to create the calendar
  let daysInMonth = eachDayOfInterval({
    start: firstDaySelectedMonth,
    end: endOfMonth(firstDaySelectedMonth),
  })

  // Used by stepper buttons to go back one month
  const prevMonth = () => {
    let firstDayNextMonth = add(firstDaySelectedMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  // Used by stepper buttons to add one month
  const nextMonth = () => {
    let firstDayNextMonth = add(firstDaySelectedMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  // Used to jump multiple months/years at a time
  const jumpToDate = (monthsToJump) => { 
    let jumpDate = add(firstDaySelectedMonth, { months: monthsToJump })
    setCurrentMonth(format(jumpDate, 'MMM-yyyy'))
  }

  // Updates the calendar to a new year but keeps the same month
  const setNewYear = (e) => {
    let yearResult = setYear(firstDaySelectedMonth, e)
    setCurrentMonth(format(yearResult, 'MMM-yyyy'))
  }

  const setYearRange = (startYearRange, endYearRange) => {
    // takes a year as start/end date and returns an array of years in between in a full date format
    let yearRangeUnformatted = eachYearOfInterval( 
      { 
        start: new Date(startYearRange, 1, 1), // add the 1, 1 to it fits the date-fns format
        end: new Date(endYearRange, 1, 1)
      } 
    )
     // Next, format the year then return a select item for each year in range array
     return yearRangeUnformatted.map((year, yearID) => {
      // Need to first format the year so that it can be used as the value for each select item
      let yearFormatted = format(year, 'yyyy')
      return (
        // Use Radix UI's Select Component for accessibility. Hardcoded since it's unique to this component
        <Select.Item key={yearFormatted.toString()} className="outline-none cursor-pointer hover:bg-indigo-200 px-2 rounded-md" value={yearFormatted}>
          <Select.ItemText>{yearFormatted}</Select.ItemText>
          <Select.ItemIndicator />
        </Select.Item>
      )
     }) 
  }

  return (
    <> 

    {/* Calendar icon aligned to the left */}
    <InputLabel type="standard" label="Pick a date: (option 1)" htmlFor="date-option1" />
    <Accordion.Root type="single" collapsible className="flex shrink" > {/* Flex shrink used since can't change Root styles like width using Data Attributes */}
      <Accordion.Item value="item-1" className="mt-1 ">
        <Accordion.Header className="flex rounded-md shadow data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 ">
          <Accordion.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left ">
            <div className="inline-flex align-left">
              <CalendarIcon className="h-6 w-6 mr-2 text-black" />  
              { format(selectedDay, 'MMM-dd-yyyy') } 
            </div>
            <ChevronRightIcon className="h-4 w-4 text-neutral-500 " />  
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full">
         <div className="py-2 border-solid border-2 w-full">
          <div className="max-w-md mx-auto sm:px-7 md:max-w-4xl md:px-2 ">
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
                        dayId === 0 && firstDayStartingCol[getDay(day)], // First day equals index 0. So use date-fns getDay() as an index to start the first day of the month styling.
                        'py-1.5'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day)
                          setShowCalendar(false) // Remove if don't want calendar to close after selecting a day
                        }} // when user clicks on a day, set that day as the selected day
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
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>

                    </div>
                  ))}
                </div>
              </div>
              <section className="pl-2">
                <h2 className="pb-1 text-gray-500 font-medium">Quick Jump</h2>
                <ol>
                  <li className="text-emerald-500 pl-3 py-px"><button type="button" onClick={ () => setCurrentMonth(format(today, 'MMM-yyyy')) }>Today</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(6) }>+ 6 months</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(12) }>+ 1 year</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(24) }>+ 2 years</button></li>
                </ol>
                <br/>
                
                {/* The Select.Root value syncs with state so it updates if user changes calendar to a new year. No name attribute since this field isn't submitted to server */}
                <Select.Root  value={format(firstDaySelectedMonth,"yyyy")} defaultValue={format(firstDaySelectedMonth,"yyyy")} onValueChange={setNewYear} >
                  <Select.Trigger className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
                    <Select.Value placeholder="Year" />
                    <Select.Icon />
                  </Select.Trigger>
            
                  <Select.Portal>
                    <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white py-1 px-2">
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        { setYearRange(1999, 2025) }
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </section>
            </div>
          </div>
         </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>  
    
    <br/>
    {/* Calendar minus icon only shows when calendar is open */}
    <InputLabel type="standard" label="Pick a date: (option 2)" htmlFor={name} />
    <Accordion.Root type="single" collapsible className="flex shrink" > {/* Flex shrink used since can't change Root styles like width using Data Attributes */}
      <Accordion.Item value="item-1" className="mt-1 ">
        <Accordion.Header className="group flex shadow data-[state=closed]:w-48 data-[state=open]:w-full bg-neutral-200 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
          <Accordion.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left ">
            <div className="inline-flex align-left">
              <CalendarIcon className="h-7 w-7 mr-2 text-black" />  
              <input 
                name={name} 
                readOnly 
                type="text" 
                className="shrink w-full p-0 m-0 bg-transparent border-none focus:ring-0 text-black cursor-pointer"
                value={ format(selectedDay, 'MMM-dd-yyyy') }  
              />
            </div>
            <MinusIcon className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500 " /> {/* Hiding minus icon when calendar is closed via tailwind's group to avoid cluttering the starting state with icons */}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full">
         <div className="bg-neutral-50 rounded-bl-lg rounded-br-lg border-solid border-2 shadow w-full p-3 py-6 md:p-0">
          <div className="max-w-md mx-auto sm:px-7 md:max-w-4xl md:px-2">
            <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200 ">
              <div className="md:pt-4 md:pr-8 md:pb-2 md:pl-6">
                <div className="flex items-center">
                  <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDaySelectedMonth, "MMMM")}
                     {/* The Select.Root value syncs with state so it updates if user changes calendar to a new year. No name attribute since this field isn't submitted to server */}
                    <Select.Root value={format(firstDaySelectedMonth,"yyyy")} defaultValue={format(firstDaySelectedMonth,"yyyy")} onValueChange={setNewYear} >
                      <Select.Trigger className="inline-flex items-center outline-none rounded-md text-md pl-2 pr-1 hover:bg-indigo-100">
                        <Select.Value placeholder="Year" />
                        <Select.Icon>
                          <ChevronUpDownIcon className="h-4 w-4 text-indigo-500" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="outline-none border-solid border border-slate-200 rounded-md bg-white py-1 px-2">
                          <Select.ScrollUpButton className="flex justify-center">
                            <ChevronUpIcon className="h-4 w-4 text-neutral-800" />
                          </Select.ScrollUpButton>
                          <Select.Viewport>
                            { setYearRange(1999, 2025) }
                          </Select.Viewport>
                          <Select.ScrollDownButton className="flex justify-center"> 
                            <ChevronDownIcon className="h-4 w-4 mr-2 text-neutral-800" />  
                          </Select.ScrollDownButton>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </h2>
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Previous month</span>
                    <ArrowLeftIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
                  </button>
                  <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Next month</span>
                    <ArrowRightIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
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
                        dayId === 0 && firstDayStartingCol[getDay(day)], // First day equals index 0. So use date-fns getDay() as an index to start the first day of the month styling.
                        'py-1.5'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day)
                          setShowCalendar(false) // Remove if don't want calendar to close after selecting a day
                        }} // when user clicks on a day, set that day as the selected day
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
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>

                    </div>
                  ))}
                </div>
              </div>
              <section className="border-t border-neutral-200 md:border-t-0 mt-4 md:mt-0 md:pl-8 md:pt-4 sm:pt-2 sm:pl-0  ">
                <h2 className="pb-1 pt-4 md:pt-0 text-gray-500 font-medium">Quick Jump</h2>
                <ol className="grid grid-cols-2 mt md:grid-cols-none">
                  <li className="text-indigo-500 pl-3 py-px "><button type="button" onClick={ () => setCurrentMonth(format(today, 'MMM-yyyy')) }>Today</button></li>
                  <li className="text-indigo-500 py-px"><button type="button" onClick={ () => jumpToDate(6) }>+ 6 months</button></li>
                  <li className="text-indigo-500 py-px"><button type="button" onClick={ () => jumpToDate(12) }>+ 1 year</button></li>
                  <li className="text-indigo-500 py-px"><button type="button" onClick={ () => jumpToDate(24) }>+ 2 years</button></li>
                </ol>
                
               
              </section>
            </div>
          </div>
         </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>  

    <br/>
    {/* Calendar icon aligned on the right */}
    <InputLabel type="standard" label="Pick a date: (option 3)" htmlFor="date-option3" />
    <Accordion.Root type="single" className="flex shrink" > {/* Flex shrink used since can't change Root styles like width using Data Attributes */}
      <Accordion.Item value="item-1" className="mt-1 ">
        <Accordion.Header className="flex rounded-md shadow data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 ">
          <Accordion.Trigger className="inline-flex justify-between px-3 py-2 w-full text-left "> 
            { format(selectedDay, 'MMM-dd-yyyy') } 
            <CalendarIcon className="h-6 w-6 text-black" /> 
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full">
         <div className="py-2 border-solid border-2 w-full">
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
                        dayId === 0 && firstDayStartingCol[getDay(day)], // First day equals index 0. So use date-fns getDay() as an index to start the first day of the month styling.
                        'py-1.5'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDay(day)
                          setShowCalendar(false) // Remove if don't want calendar to close after selecting a day
                        }} // when user clicks on a day, set that day as the selected day
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
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>

                    </div>
                  ))}
                </div>
              </div>
              <section className="pl-2">
                <h2 className="pb-1 text-gray-500 font-medium">Quick Jump</h2>
                <ol>
                  <li className="text-emerald-500 pl-3 py-px"><button type="button" onClick={ () => setCurrentMonth(format(today, 'MMM-yyyy')) }>Today</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(6) }>+ 6 months</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(12) }>+ 1 year</button></li>
                  <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(24) }>+ 2 years</button></li>
                </ol>
                <br/>
                
                {/* The Select.Root value syncs with state so it updates if user changes calendar to a new year. No name attribute since this field isn't submitted to server */}
                <Select.Root  value={format(firstDaySelectedMonth,"yyyy")} defaultValue={format(firstDaySelectedMonth,"yyyy")} onValueChange={setNewYear} >
                  <Select.Trigger className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
                    <Select.Value placeholder="Year" />
                    <Select.Icon />
                  </Select.Trigger>
            
                  <Select.Portal>
                    <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white py-1 px-2">
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        { setYearRange(1999, 2025) }
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </section>
            </div>
          </div>
         </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>    

    <br/>
    <Input 
      name={name} 
      label={label} 
      value={format(selectedDay, 'MMM-dd-yyyy')} 
      onClick={() => setShowCalendar(!showCalendar)} 
      readOnly // Intentionally forcing user to use the calendar to select a date
    />
    { showCalendar && // Only show the calendar if the user has clicked on the input field
    
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
                    dayId === 0 && firstDayStartingCol[getDay(day)], // First day equals index 0. So use date-fns getDay() as an index to start the first day of the month styling.
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDay(day)
                      setShowCalendar(false) // Remove if don't want calendar to close after selecting a day
                    }} // when user clicks on a day, set that day as the selected day
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
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                </div>
              ))}
            </div>
          </div>
          <section className="pl-2">
            <h2 className="pb-1 text-gray-500 font-medium">Quick Jump</h2>
            <ol>
              <li className="text-emerald-500 pl-3 py-px"><button type="button" onClick={ () => setCurrentMonth(format(today, 'MMM-yyyy')) }>Today</button></li>
              <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(6) }>+ 6 months</button></li>
              <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(12) }>+ 1 year</button></li>
              <li className="text-emerald-500 py-px"><button type="button" onClick={ () => jumpToDate(24) }>+ 2 years</button></li>
            </ol>
            <br/>
            
            {/* The Select.Root value syncs with state so it updates if user changes calendar to a new year. No name attribute since this field isn't submitted to server */}
            <Select.Root value={format(firstDaySelectedMonth,"yyyy")} defaultValue={format(firstDaySelectedMonth,"yyyy")} onValueChange={setNewYear} >
              <Select.Trigger className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
                <Select.Value placeholder="Year" />
                <Select.Icon />
              </Select.Trigger>
        
              <Select.Portal>
                <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white py-1 px-2">
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    { setYearRange(1999, 2025) }
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </section>
        </div>
      </div>
      </div>

    }
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