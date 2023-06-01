"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"

export type RadioGroupProps = {
  options: Array<{ value: string; label: string }>
  type?: RadioGroupType
  name?: string
  value?: string
  defaultValue?: string
  className?: string
  hasError?: boolean
  onChange?: (value: string) => void
}
type RadioGroupType = "standard" | "horizontal" | "button"

// DYNAMIC STYLING
const radioGroupRootMap: { [key in RadioGroupType]: string } = {
  standard: "",
  horizontal: "grid-flow-col justify-start gap-20",
  button: "",
}
const radioGroupItemMap: { [key in RadioGroupType]: string } = {
  standard: [
    "flex items-center relative w-6 h-6 border-2 border-slate-300 rounded-full data-[state=checked]:border-sky-400 ",
    "data-[state=unchecked]:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring ",
    "focus-visible:ring-sky-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 ",
    "text-slate-500 data-[state=checked]:text-sky-500 data-[state=checked]:font-semibold",
  ].join(" "),
  horizontal: [
    "flex items-center relative w-6 h-6 border-2 border-slate-300 rounded-full data-[state=checked]:border-sky-400 ",
    "data-[state=unchecked]:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring ",
    "focus-visible:ring-sky-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 ",
    "text-slate-500 data-[state=checked]:text-sky-500 data-[state=checked]:font-semibold",
  ].join(" "),
  button: "",
}
const radioGroupIndicatorMap: { [key in RadioGroupType]: string } = {
  standard:
    "absolute inset-0 flex items-center justify-center leading-0 bg-neutral-100 data-[state=checked]:bg-transparent rounded-full",
  horizontal:
    "absolute inset-0 flex items-center justify-center leading-0 bg-neutral-100 data-[state=checked]:bg-transparent rounded-full",
  button: "",
}
const radioGroupLabelMap: { [key in RadioGroupType]: string } = {
  standard: "ml-8 block text-md",
  horizontal: "ml-8 block text-md",
  button: "",
}

// MAIN COMPONENT
const RadioGroup: FC<RadioGroupProps> = forwardRef<
  HTMLButtonElement,
  RadioGroupProps
>(function setRadioRef(
  {
    type = "standard",
    // name,
    options,
    //  defaultValue,
    // value, // WARNING: DON'T USE THIS PROP. It causes defaulValue to be ignored
    onChange,
    className,
    hasError, // need to destructure to avoid React dom error
    ...props
  },
  ref
) {
  return (
    <RadixRadioGroup.Root
      {...(props as Omit<RadioGroupProps, "onChange">)} // Needed to stop TS error on Root
      onValueChange={onChange}
      // name={name}
      // defaultValue={defaultValue}
      className={classNames([
        "grid gap-2 my-2.5", // standard css styles go here.
        radioGroupRootMap[type], // dynamic styles
        className, // one-off prop styles
      ])}
    >
      {options.map(
        (option: { value: string; label: string }, index: number) => {
          return (
            // <div key={option.value} className="flex">
            <RadixRadioGroup.Item
              id={option.value}
              value={option.value}
              key={option.value}
              className={classNames([
                "flex data-[state=checked]:cursor-default",
                radioGroupItemMap[type],
                className,
              ])}
            >
              {/* <div className="block"> */}
              <RadixRadioGroup.Indicator
                className={classNames([
                  "",
                  radioGroupIndicatorMap[type],
                  className,
                ])}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400"></div>
              </RadixRadioGroup.Indicator>
              <label
                htmlFor={option.value}
                className={classNames([
                  "cursor-pointer",
                  radioGroupLabelMap[type],
                  className,
                ])}
              >
                {option.label}
              </label>
              {/* </div> */}
            </RadixRadioGroup.Item>
            // </div>
          )
        }
      )}
    </RadixRadioGroup.Root>
  )
})

export default RadioGroup
