"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

export type ParagraphProps = {
  children: ReactNode
  width?: string
  size?: ParagraphSize
  variant?: ParagraphVariant
  space?: ParagraphSpace
  textAlign?: ParagraphTextAlign
  padding?: ParagraphPadding
  className?: string
}

type ParagraphTextAlign = "none" | "left" | "center" | "right"
const paragraphTextAlignMap: { [key in ParagraphTextAlign]: string } = {
  none: "",
  left: "text-left",
  center: "text-center",
  right: "text-right",
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

type ParagraphPadding =
  | "none"
  | "xsmall"
  | "small"
  | "standard"
  | "medium"
  | "large"
  | "xl"
  | "xxl"
const paragraphPaddingMap: { [key in ParagraphPadding]: string } = {
  none: "py-0",
  standard: "py-2",
  xsmall: "py-px",
  small: "py-1",
  medium: "py-4",
  large: "py-6",
  xl: "py-8",
  xxl: "py-10",
}

// MAIN FUNCTION ---
const Paragraph: FC<ParagraphProps> = ({
  size = "standard",
  width = "max-w-prose",
  space = "standard",
  variant = "primary",
  textAlign = "none",
  padding = "standard",
  className = "",
  children,
}) => {
  return (
    <p
      className={classNames([
        "whitespace-pre-wrap",
        width,
        paragraphSizeMap[size],
        paragraphSpaceMap[space],
        paragraphVariantMap[variant],
        paragraphTextAlignMap[textAlign],
        paragraphPaddingMap[padding],
        className, // custom styling passed as prop
      ])}
    >
      {children}
    </p>
  )
}

export default Paragraph
