"use client"

import { FC } from "react"
import classNames from "classnames"

export type DividerProps = {
  padding?: DividerPadding
  variant?: "horizontal" | "vertical"
  color?: DividerColor
  stroke?: DividerStroke
  width?: DividerWidth
  height?: DividerHeight
  className?: string
}

type DividerPadding = "standard" | "medium" | "large" | "xl" | "xxl" | "none"
const dividerPaddingMap: { [key in DividerPadding]: string } = {
  standard: "my-px", // prop specific css styles go here
  medium: "my-2",
  large: "my-4",
  xl: "my-6",
  xxl: "my-8",
  none: "my-0",
}
const dividerVerticalPaddingMap: { [key in DividerPadding]: string } = {
  standard: "px-px", // prop specific css styles go here
  medium: "px-2",
  large: "px-4",
  xl: "px-6",
  xxl: "px-8",
  none: "px-0",
}

type DividerColor = "standard" | "darkmode" | "white" | "black" | "highlight"
const dividerColorMap: { [key in DividerColor]: string } = {
  standard: "bg-neutral-200",
  darkmode: "bg-neutral-100",
  highlight: "bg-lime-500",
  white: "bg-white",
  black: "bg-black",
}

type DividerStroke = "standard" | "medium" | "large" | "xl"
const dividerStrokeMap: { [key in DividerStroke]: string } = {
  standard: "h-px",
  medium: "h-0.5",
  large: "h-1",
  xl: "h-2",
}
const dividerVerticalStrokeMap: { [key in DividerStroke]: string } = {
  standard: "w-px",
  medium: "w-0.5",
  large: "w-1",
  xl: "w-2",
}

type DividerWidth =
  | "none"
  | "full"
  | "standard"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
const dividerWidthMap: { [key in DividerWidth]: string } = {
  none: "",
  full: "w-full",
  standard: "w-96",
  xsmall: "w-10",
  small: "w-24",
  medium: "w-64",
  large: "w-[500px]",
  xlarge: "w-[900px]",
}
type DividerHeight =
  | "none"
  | "full"
  | "standard"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
const dividerHeightMap: { [key in DividerHeight]: string } = {
  none: "",
  full: "h-full",
  standard: "h-96",
  xsmall: "h-10",
  small: "h-24",
  medium: "h-64",
  large: "h-[500px]",
  xlarge: "h-[900px]",
}

// MAIN FUNCTION
const Divider: FC<DividerProps> = ({
  variant = "horizontal",
  color = "standard",
  width = "standard",
  height = "standard",
  stroke = "standard",
  padding = "standard",
  ...props
}) => {
  return (
    <>
      {variant === "horizontal" ? (
        <div
          className={classNames([
            "rounded-full max-h-full max-w-full",
            dividerWidthMap[width],
            dividerColorMap[color],
            dividerStrokeMap[stroke],
            dividerPaddingMap[padding],
            props.className, // custom styling passed as prop
          ])}
        ></div>
      ) : (
        <div
          className={classNames([
            "max-h-full max-w-full rounded-full",
            dividerColorMap[color],
            dividerHeightMap[height],
            dividerVerticalStrokeMap[stroke],
            dividerVerticalPaddingMap[padding],
            props.className, // custom styling passed as prop
          ])}
        ></div>
      )}
    </>
  )
}

export default Divider

// Notes:
// Divider takes up the width of its parent container.
// If it's not appearing or sizing is off customize the width/height of parent div or wrap in a div
