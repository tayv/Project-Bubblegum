"use client"

import { FC, forwardRef, HTMLAttributes } from "react"
import classNames from "classnames"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

type CheckboxType = "standard" | "toggle"
type CheckboxProps = {
  name?: string // Optional as handled by Field
  id?: string // used for multi checkboxes and htmlFor label
  children: string
  value?: any // HTMLInputElement type doesn't like use of boolean so switched to any
  type?: CheckboxType
  className?: string
  onChange?: any
  defaultChecked?: boolean
  hasError?: boolean
}

const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLButtonElement,
  CheckboxProps
>(function setRefCheckbox(
  {
    children,
    name,
    type = "standard",
    onChange,
    value,
    id = name,
    hasError = false,
    ...props
  },
  ref
) {
  return (
    <div className="group flex items-center py-1">
      <RadixCheckbox.Root
        {...props}
        ref={ref}
        onCheckedChange={onChange}
        checked={value}
        id={id}
        // name={name}
        className="peer flex items-center justify-center text-md font-bold text-gray-900 bg-white border-2 border-slate-600 rounded w-6 h-6 shadow-md"
      >
        <RadixCheckbox.Indicator className="cursor-pointer p-px text-white rounded data-[state=checked]:bg-cta-500  ">
          <CheckIcon className="stroke-[4px] " />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        className="cursor-pointer pl-2 leading-none text-slate-800 text-md peer-[[data-state=checked]]:text-cta-500"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  )
})

export { Checkbox }
export type { CheckboxType, CheckboxProps }
