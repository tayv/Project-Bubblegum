"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

export type ParagraphProps = {
  children: ReactNode
  size?: ParagraphSize
  color?: ParagraphColor
  weight?: ParagraphWeight
  width?: string
  variant?: ParagraphVariant
  space?: ParagraphSpace
  textAlign?: ParagraphTextAlign
  padding?: ParagraphPadding
  className?: string
}

// Consider refactoring variant out in future. Likely not necessary since have color prop now
type ParagraphVariant = "primary" | "secondary" | "override"
const paragraphVariantMap: { [key in ParagraphVariant]: string } = {
  primary: "text-gray-900", // prop specific css styles go here
  secondary: "text-gray-300",
  override: "",
}

type ParagraphColor = "none" | "standard" | "secondary"
const paragraphColorMap: { [key in ParagraphColor]: string } = {
  none: "",
  standard: "text-slate-900",
  secondary: "text-slate-500",
}

type ParagraphWeight =
  | "none"
  | "standard"
  | "light"
  | "medium"
  | "semibold"
  | "bold"
const paragraphWeightMap: { [key in ParagraphWeight]: string } = {
  none: "",
  standard: "font-normal",
  light: "font-light",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
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
  xsmall: "text-xs lg:text-sm", // prop specific css styles go here
  small: "text-sm lg:text-base",
  standard: "text-md lg:text-lg",
  large: "text-lg lg:text-xl",
  xlarge: "text-xl lg:text-2xl",
  xxlarge: "text-2xl lg:text-3xl",
  xxxlarge: "text-3xl lg:text-4xl",
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
  color = "standard",
  weight = "standard",
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
        paragraphColorMap[color],
        paragraphSizeMap[size],
        paragraphSpaceMap[space],
        paragraphWeightMap[weight],
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
