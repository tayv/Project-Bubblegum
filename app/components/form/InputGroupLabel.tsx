"use client"

import { FC, ReactNode } from "react"
import * as Label from "@radix-ui/react-label"
import classNames from "classnames"

export type InputGroupLabelProps = {
  htmlFor: string
  type?: InputGroupLabelType
  children?: ReactNode
  className?: string
}

export type InputGroupLabelType = "standard" | "secondary"

const inputGroupLabelTypeMap: { [key in InputGroupLabelType]: string } = {
  standard: "block text-md font-bold text-gray-900",
  secondary: "block text-sm font-light text-gray-500 mb-2",
}

const InputGroupLabel: FC<InputGroupLabelProps> = ({
  type = "standard",
  htmlFor,
  children,
  ...props
}) => {
  return (
    <Label.Root
      htmlFor={htmlFor}
      className={classNames([
        "", // standard css styles go here.
        inputGroupLabelTypeMap[type], // dynamically set styling
        props.className, // custom styling passed from parent
      ])}
      {...props}
    >
      {children}
    </Label.Root>
  )
}

export default InputGroupLabel
