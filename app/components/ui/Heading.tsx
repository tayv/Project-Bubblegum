"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

export type HeadingProps = {
  children: ReactNode
  size: HeadingSize
  color?: HeadingColor
  textAlign?: HeadingTextAlign
  weight?: HeadingWeight
  padding?: HeadingPadding
  id?: string // Optionally used for anchor links
  className?: string // For custom styling
}

type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "override"
const headingSizeMap: { [key in HeadingSize]: string } = {
  h1: "text-5xl lg:text-6xl",
  h2: "text-4xl lg:text-5xl",
  h3: "text-3xl lg:text-4xl",
  h4: "text-xl lg:text-2xl",
  h5: "text-lg lg:text-xl",
  h6: "text-md lg:text-lg",
  override: "",
}

type HeadingColor =
  | "none"
  | "standard"
  | "secondary"
  | "white"
  | "gradient1"
  | "gradient2"
const headingColorMap: { [key in HeadingColor]: string } = {
  none: "",
  standard: "text-gray-900",
  secondary: "text-gray-500",
  white: "text-white",
  gradient1:
    "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent",
  gradient2:
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 bg-clip-text text-transparent",
}

type HeadingTextAlign = "left" | "center" | "right"
const headingTextAlignMap: { [key in HeadingTextAlign]: string } = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}

type HeadingWeight =
  | "xlight"
  | "light"
  | "normal"
  | "semibold"
  | "bold"
  | "black"
  | "override"
const headingWeightMap: { [key in HeadingWeight]: string } = {
  xlight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
  black: "font-black",
  override: "",
}

type HeadingPadding = "none" | "small" | "standard" | "large" | "override"
const headingPaddingMap: { [key in HeadingPadding]: string } = {
  none: "pb-0",
  small: "pb-1",
  standard: "pb-2",
  large: "pb-4",
  override: "",
}

const Heading: FC<HeadingProps> = ({
  size,
  color = "standard",
  weight = "semibold",
  padding = "standard",
  textAlign = "left",
  className = "",
  children,
  ...props
}) => {
  // Dynamically set the heading tag based on the size prop. Use TS casting for type checking. See: https://stackoverflow.com/questions/33471880/dynamic-tag-name-in-react-jsx
  const CustomHTag = `${size}` as keyof JSX.IntrinsicElements

  return (
    <CustomHTag
      id={props.id}
      className={classNames([
        "", // standard css styles (pre-wrap allows for line breaks in template literals)
        headingSizeMap[size],
        headingColorMap[color],
        headingWeightMap[weight],
        headingTextAlignMap[textAlign],
        headingPaddingMap[padding],
        className, // custom styling passed as prop
      ])}
    >
      {children}
    </CustomHTag>
  )
}

export default Heading
