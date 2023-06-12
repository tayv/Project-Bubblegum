"use client"

import React, { FC, forwardRef, ReactElement } from "react"
import classNames from "classnames"
import * as RadixRadioGroup from "@radix-ui/react-radio-group"
import { Check } from "lucide-react"

export type RadioGroupProps = {
  options: Array<{ value: string; label: string; icon?: ReactElement }>
  variant?: RadioGroupVariant
  name?: string
  value?: string
  defaultValue?: string
  className?: string
  hasError?: boolean
  onChange?: (value: string) => void
}
type RadioGroupVariant = "standard" | "horizontal" | "button" | "buttonLarge"

// DYNAMIC STYLING
const radioGroupRootMap: { [key in RadioGroupVariant]: string } = {
  standard: "grid gap-2",
  horizontal: "flex justify-start gap-14",
  button: "grid gap-2",
  buttonLarge: "flex flex-wrap gap-2 max-w-lg",
}
const radioGroupItemMap: { [key in RadioGroupVariant]: string } = {
  standard:
    "flex items-center relative w-6 h-6 rounded-full data-[state=checked]:text-sky-500",
  horizontal:
    "flex w-6 h-6 items-center relative rounded-full data-[state=checked]:text-sky-500",
  button: [
    "px-2 py-2 w-full max-w-xs ",
    "text-left text-slate-500 data-[state=checked]:text-white ",
    "border-1 border-slate-500 data-[state=checked]:border-sky-400 rounded-xl ",
    "shadow data-[state=checked]:shadow-sm data-[state=checked]:shadow-sky-500/50 shadow-slate-400 ",
    "data-[state=checked]:bg-sky-500 data-[state=unchecked]:hover:bg-slate-200 ",
  ].join(" "),
  buttonLarge: [
    "justify-center items-center flex-col gap-2 w-28 h-28 ",
    "text-slate-500 data-[state=checked]:text-white ",
    "border border-slate-300 data-[state=checked]:border-sky-400 rounded-3xl bg-white ",
    "shadow-md data-[state=checked]:shadow-lg data-[state=checked]:shadow-sky-500/50 shadow-slate-400 ",
    "data-[state=checked]:bg-sky-500 data-[state=unchecked]:hover:bg-slate-200 ",
  ].join(" "),
}
const radioGroupIndicatorMap: { [key in RadioGroupVariant]: string } = {
  standard: "",
  horizontal: "",
  button: "hidden",
  buttonLarge: "hidden",
}
const radioGroupLabelMap: { [key in RadioGroupVariant]: string } = {
  standard: "ml-8 block text-md",
  horizontal: "ml-8 block text-md ",
  button: "pl-2",
  buttonLarge: "",
}

const radioGroupIconMap: { [key in RadioGroupVariant]: string } = {
  standard: "hidden",
  horizontal: "hidden",
  button: "",
  buttonLarge: "w-10 h-10",
}

// MAIN COMPONENT
const RadioGroup: FC<RadioGroupProps> = forwardRef<
  HTMLButtonElement,
  RadioGroupProps
>(function setRadioRef(
  {
    variant = "standard",
    options,
    onChange,
    // value, // WARNING: DON'T USE THIS PROP. It causes defaulValue to be ignored
    className,
    hasError, // need to destructure to avoid React dom error
    ...props
  },
  ref
) {
  return (
    <RadixRadioGroup.Root
      {...(props as Omit<RadioGroupProps, "onChange">)} // Need to omit to stop TS error on Root
      onValueChange={onChange}
      className={classNames([
        "my-2.5 ", // standard css styles go here.
        radioGroupRootMap[variant], // dynamic styles
        className, // one-off prop styles
      ])}
    >
      {options.map(
        (
          option: { value: string; label: string; icon?: ReactElement },
          index: number
        ) => {
          return (
            <RadixRadioGroup.Item
              id={option.value}
              value={option.value}
              key={option.value}
              className={classNames([
                [
                  "flex cursor-pointer data-[state=checked]:cursor-default",
                  "text-slate-500 data-[state=checked]:font-medium ",
                  "data-[state=unchecked]:bg-slate-100",
                  "focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring ",
                  "focus-visible:ring-sky-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 ",
                ].join(" "),
                radioGroupItemMap[variant],
                className,
              ])}
            >
              <RadixRadioGroup.Indicator
                className={classNames([
                  [
                    "absolute inset-0 flex items-center justify-center leading-0 ",
                    "bg-slate-200 data-[state=checked]:border-sky-500 border-[3px] border-slate-300 ",
                    "data-[state=checked]:bg-transparent rounded-full ",
                  ].join(" "),
                  radioGroupIndicatorMap[variant],
                  className,
                ])}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
              </RadixRadioGroup.Indicator>
              {!!option.icon // check since not all radio variants have icons
                ? option.icon
                : // only show check for selected item
                  props.value === option.value && (
                    <Check
                      className={classNames([
                        "ml-2",
                        radioGroupIconMap[variant],
                        className,
                      ])}
                    />
                  )}
              <label
                htmlFor={option.value}
                className={classNames([
                  "min-w-fit cursor-pointer ",
                  radioGroupLabelMap[variant],
                  className,
                ])}
              >
                {option.label}
              </label>
            </RadixRadioGroup.Item>
          )
        }
      )}
    </RadixRadioGroup.Root>
  )
})

export default RadioGroup
