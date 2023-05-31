"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

export type ParagraphProps = {
  children: ReactNode
  size?: ParagraphSize
  variant?: ParagraphVariant
  space?: ParagraphSpace
  className?: string
}

type ParagraphSize =
  | "xsmall"
  | "small"
  | "standard"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "xxxlarge"
  | "override"

const paragraphSizeMap: { [key in ParagraphSize]: string } = {
  xsmall: "text-xs", // prop specific css styles go here
  small: "text-sm",
  standard: "text-base",
  large: "text-lg",
  xlarge: "text-xl",
  xxlarge: "text-2xl",
  xxxlarge: "text-3xl",
  override: "",
}

type ParagraphVariant = "primary" | "secondary" | "override"
const paragraphVariantMap: { [key in ParagraphVariant]: string } = {
  primary: "text-gray-900", // prop specific css styles go here
  secondary: "text-gray-300",
  override: "",
}

type ParagraphSpace =
  | "tight"
  | "snug"
  | "standard"
  | "relaxed"
  | "loose"
  | "none"
  | "override"
const paragraphSpaceMap: { [key in ParagraphSpace]: string } = {
  tight: "leading-tight",
  snug: "leading-snug",
  standard: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
  none: "leading-none",
  override: "",
}

const Paragraph: FC<ParagraphProps> = ({
  size = "standard",
  space = "standard",
  variant = "primary",
  className = "",
  children,
}) => {
  
  return (
    <div
      className={classNames([
        "whitespace-pre-wrap", // standard css Variants (pre-wrap allows for line breaks in template literals)
        paragraphSizeMap[size], // dynamically set styling based on padding prop
        paragraphSpaceMap[space],
        paragraphVariantMap[variant],
        className, // custom styling passed as prop
      ])}
    >
      {children}
    </div>
  )
}

export default Paragraph
